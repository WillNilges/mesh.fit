use std::env;

use axum::{
    extract::{self, Path},
    http::StatusCode,
    Json,
};
use common::Adaptor;
use slack_morphism::prelude::*;

use crate::{
    errors::ApiError,
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
            if event.member_response {
                return Err(ApiError::BadRequest)
            } else {

            }

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
