# Build Roadmap

Build and test one vertical slice at a time.

## Phase 1 - Foundation

- [x] Monorepo, web app, API, PostgreSQL, Prisma, local configuration, and documentation.
- [ ] Add linting and formatting.
- [ ] Add an initial database migration.

## Phase 2 - Identity and access

- [x] Role-specific login, logout, and session-check endpoints for seeded demo users.
- [x] Salted scrypt password hashes and eight-hour signed cookie sessions.
- [x] Role-gated dashboards, overview API, and live socket connections.
- [ ] Self-service registration, password reset, and production identity hardening.

## Phase 3 - Operations data

- [ ] Admin CRUD for ambulances and capability tags.
- [ ] Admin CRUD for hospitals, specialties, and bed capacity.
- [ ] Seed fictional development data.

## Phase 4 - Emergency flow

- [ ] User SOS form.
- [ ] Emergency priority classification.
- [ ] Smart ambulance and hospital selection.
- [ ] Driver accept/reject workflow.

## Phase 5 - Real-time coordination

- [ ] Driver mobile-location updates.
- [ ] Live case timeline.
- [ ] Hospital acceptance/rejection notifications.
- [ ] Admin manual reassignment.

## Phase 6 - Green-corridor workflow

- [ ] Critical-case eligibility rule.
- [ ] Request creation.
- [ ] Traffic-controller approval page.
- [ ] Audit trail and user notifications.

## Phase 7 - Quality and deployment

- [ ] Unit tests for matching rules.
- [ ] API integration tests.
- [ ] E2E tests for SOS to dispatch flow.
- [ ] Logging, error tracking, backup policy, and deployment.
