use std::env;

use axum::{
    extract::{self, Path},
    http::StatusCode,
    Json,
};
use common::{Adaptor, Event};
use rand::{seq::SliceRandom, thread_rng, Rng};
use regex::Regex;
use slack_morphism::prelude::*;

use crate::{
    errors::ApiError,
    payloads::{ApiResult, EventInput, EventResponse},
    State,
};

#[utoipa::path(
    post,
    path = "/event/{event_id}/post",
    params(
        ("event_id", description = "The ID of the event"),
    ),
    responses(
        (status = 200, description = "Ok", body = EventResponse),
        (status = 404, description = "Not found"),
        (status = 429, description = "Too many requests"),
    ),
    tag = "event",
)]
/// Post about event on Slack. 
/// TODO: This should probably get its own file
pub async fn post_event<A: Adaptor>(
    extract::State(state): State<A>,
    Path(event_id): Path<String>,
) -> Result<(StatusCode, Json<String>), ApiError<A>> {
    let adaptor = &state.lock().await.adaptor;

    let event = adaptor
        .get_event(event_id)
        .await
        .map_err(ApiError::AdaptorError)?;

    match event {
        Some(event) => {
            let client = SlackClient::new(SlackClientHyperConnector::new());
            let token_value: SlackApiTokenValue = env::var("SLACK_TOKEN").unwrap().into();
            let token: SlackApiToken = SlackApiToken::new(token_value);
            let session = client.open_session(&token);

            let alert_text = format!("New Service Requested. Member Availability: <http://{}/{}>", env::var("FRONTEND_URL").unwrap(), event.id);

            // Send a simple text message
            let post_chat_req =
                SlackApiChatPostMessageRequest::new("#botspam".into(),
                       SlackMessageContent::new().with_text(alert_text.into())
                );

            // TODO: Handle this
            let _post_chat_resp = session.chat_post_message(&post_chat_req).await;

            Ok((StatusCode::CREATED, Json("".to_string())))
        },
        None => Err(ApiError::NotFound),
    }
}

#[utoipa::path(
    get,
    path = "/event/{event_id}",
    params(
        ("event_id", description = "The ID of the event"),
    ),
    responses(
        (status = 200, description = "Ok", body = EventResponse),
        (status = 404, description = "Not found"),
        (status = 429, description = "Too many requests"),
    ),
    tag = "event",
)]
/// Get details about an event
pub async fn get_event<A: Adaptor>(
    extract::State(state): State<A>,
    Path(event_id): Path<String>,
) -> ApiResult<EventResponse, A> {
    let adaptor = &state.lock().await.adaptor;

    let event = adaptor
        .get_event(event_id)
        .await
        .map_err(ApiError::AdaptorError)?;

    match event {
        Some(event) => Ok(Json(event.into())),
        None => Err(ApiError::NotFound),
    }
}

#[utoipa::path(
    post,
    path = "/event",
    request_body(content = EventInput, description = "New event details"),
    responses(
        (status = 201, description = "Created", body = EventResponse),
        (status = 415, description = "Unsupported input format"),
        (status = 422, description = "Invalid input provided"),
        (status = 429, description = "Too many requests"),
    ),
    tag = "event",
)]
/// Create a new event
pub async fn create_event<A: Adaptor>(
    extract::State(state): State<A>,
    Json(input): Json<EventInput>,
) -> Result<(StatusCode, Json<EventResponse>), ApiError<A>> {
    let adaptor = &state.lock().await.adaptor;

    // Get the current timestamp
    let now = chrono::offset::Utc::now();

    // Generate a name if none provided
    let name = match input.name {
        Some(x) if !x.is_empty() => x.trim().to_string(),
        _ => generate_name(),
    };

    // Optionally have an install number
    let install_number = match input.install_number {
        Some(x) => x,
        _ => "".to_string(),
    };

    // Generate an ID
    let mut id = generate_id(&name);

    // Check the ID doesn't already exist
    while (adaptor
        .get_event(id.clone())
        .await
        .map_err(ApiError::AdaptorError)?)
    .is_some()
    {
        id = generate_id(&name);
    }

    let event = adaptor
        .create_event(Event {
            id,
            install_number,
            member_response: false,
            name,
            created_at: now,
            visited_at: now,
            times: input.times,
            timezone: input.timezone,
        })
        .await
        .map_err(ApiError::AdaptorError)?;

    // Update stats
    adaptor
        .increment_stat_event_count()
        .await
        .map_err(ApiError::AdaptorError)?;

    Ok((StatusCode::CREATED, Json(event.into())))
}

// Generate a random name based on an adjective and a crab species
fn generate_name() -> String {
    let adjectives: Vec<String> =
        serde_json::from_slice(include_bytes!("../res/adjectives.json")).unwrap();
    let crabs: Vec<String> = serde_json::from_slice(include_bytes!("../res/crabs.json")).unwrap();

    format!(
        "{} {} Crab",
        adjectives.choose(&mut thread_rng()).unwrap(),
        crabs.choose(&mut thread_rng()).unwrap()
    )
}

// Generate a slug for the crab fit
fn generate_id(name: &str) -> String {
    let mut id = encode_name(name.to_string());
    if id.replace('-', "").is_empty() {
        id = encode_name(generate_name());
    }
    let number = thread_rng().gen_range(100000..=999999);
    format!("{}-{}", id, number)
}

// Use punycode to encode the name
fn encode_name(name: String) -> String {
    let pc = punycode::encode(&name.trim().to_lowercase())
        .unwrap_or(String::from(""))
        .trim()
        .replace(|c: char| !c.is_ascii_alphanumeric() && c != ' ', "");
    let re = Regex::new(r"\s+").unwrap();
    re.replace_all(&pc, "-").to_string()
}
