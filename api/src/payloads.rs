use axum::Json;
use common::{Event, Person, Stats};
use serde::{Deserialize, Serialize};
use utoipa::ToSchema;

use crate::errors::ApiError;

pub type ApiResult<T, A> = Result<Json<T>, ApiError<A>>;

#[derive(Deserialize, ToSchema)]
pub struct EventInput {
    pub name: Option<String>,
    pub install_number: Option<String>,
    pub times: Vec<String>,
    pub timezone: String,
}

#[derive(Serialize, ToSchema)]
pub struct EventResponse {
    pub id: String,
    pub name: String,
    pub times: Vec<String>,
    pub timezone: String,
    pub created_at: i64,
    pub install_number: String,
    pub member_response: bool,
    pub slack_ts: String,
}

impl From<Event> for EventResponse {
    fn from(value: Event) -> Self {
        Self {
            id: value.id,
            name: value.name,
            times: value.times,
            timezone: value.timezone,
            created_at: value.created_at.timestamp(),
            install_number: value.install_number,
            member_response: value.member_response,
            slack_ts: value.slack_ts,
        }
    }
}

#[derive(Serialize, ToSchema)]
pub struct StatsResponse {
    pub event_count: i64,
    pub person_count: i64,
    pub version: String,
}

impl From<Stats> for StatsResponse {
    fn from(value: Stats) -> Self {
        Self {
            event_count: value.event_count,
            person_count: value.person_count,
            version: env!("CARGO_PKG_VERSION").to_string(),
        }
    }
}

#[derive(Serialize, ToSchema)]
pub struct PersonResponse {
    pub name: String,
    pub availability: Vec<String>,
    pub created_at: i64,
}

impl From<Person> for PersonResponse {
    fn from(value: Person) -> Self {
        Self {
            name: value.name,
            availability: value.availability,
            created_at: value.created_at.timestamp(),
        }
    }
}

#[derive(Deserialize, ToSchema)]
pub struct PersonInput {
    pub availability: Vec<String>,
}
