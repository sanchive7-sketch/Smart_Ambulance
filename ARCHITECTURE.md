# Architecture

## System roles

| Role | Primary responsibility |
| --- | --- |
| User | Requests help and tracks the assigned ambulance. |
| Driver | Accepts a mission and shares consented mobile location. |
| Hospital | Manages incoming cases and declared treatment capacity. |
| Admin | Oversees cases, matching, reassignment, and auditing. |
| Traffic controller | Approves or rejects green-corridor requests. |

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
- `Assignment`
- `GreenCorridorRequest`
- `AuditLog`

## Real-time behaviour

Socket.IO will publish case, ambulance, hospital-capacity, and approval updates to the affected dashboard. The API remains the source of truth; a browser must never directly change another user's state.

## Green corridor

This app coordinates a digital request and approval process. It does not control a real traffic light. An authorized traffic-system integration would be a later, separate project requirement.
