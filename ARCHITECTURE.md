# Architecture

## Hackathon UI roles

| Role | Primary responsibility |
| --- | --- |
| User | Requests help and tracks the assigned ambulance. |
| Driver | Accepts a mission and shares consented mobile location. |
| Hospital | Manages incoming cases and declared treatment capacity. |

## Identity and dashboard access

The hackathon UI exposes three sign-in routes: `/login/user`, `/login/driver`, and `/login/hospital`. In demo mode, fictional accounts live in API memory and no database is required. Setting `DEMO_MODE=false` switches to PostgreSQL-backed accounts. Passwords are salted scrypt hashes. The API issues an eight-hour signed session in an HttpOnly cookie, checks the account's role on requests, and accepts Socket.IO connections only with a valid session. The web app renders only the dashboard matching that session. Older backend scaffold roles remain in code but are not offered in this UI.

The three dashboards share a browser-local mock scenario. Sending SOS, accepting a mission, and accepting a hospital case update staged UI state across role switches. Hospital identity appears to the People role only after mock hospital acceptance. This state is not authoritative or shared across different browsers.

These login controls are implemented. Dashboard actions and most data are still fictional previews, so future API endpoints must apply their own ownership and role checks before returning private case data.

## Core flow

```text
SOS request -> classify emergency -> find suitable ambulances
-> score capability, availability and ETA -> recommend hospital
-> notify driver, hospital, user and admin -> track case updates
```

## Smart assignment rules

The initial score will use software-maintained data:

- 40% capability match
- 25% estimated ETA
- 15% ambulance availability
- 10% hospital suitability
- 10% route condition

No hardware telemetry is required. Driver location comes from a consented mobile device. Ambulance capability and hospital capacity are records managed through the software.

## Main data models

- `User`
- `Ambulance`
- `Hospital`
- `EmergencyRequest`
- `Assignment` (planned)
- `GreenCorridorRequest`
- `AuditLog`

## Real-time behaviour

Socket.IO currently authenticates connections and sends a connection-ready event. Later it will publish case, ambulance, hospital-capacity, and approval updates only to affected dashboards. The API remains the source of truth; a browser must never directly change another user's state.

## Green corridor

This app coordinates a digital request and approval process. It does not control a real traffic light. An authorized traffic-system integration would be a later, separate project requirement.
