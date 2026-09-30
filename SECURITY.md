# Security Notes

This application may eventually handle sensitive health and location information. Treat security as a feature from the first database model.

- Use fictional data while learning and testing.
- Enforce role-based access on the API, not only in the UI.
- Store passwords only as salted scrypt hashes.
- Sign-in uses an HttpOnly, SameSite=Lax cookie. API requests and live sockets verify the session; selecting another workspace in the browser does not grant that role.
- Replace the seeded demo password and set a unique `JWT_SECRET` before any non-local use. The current accounts and dashboard data are fictional learning fixtures.
- Demo mode is intended only for presentations with fictional data. Anyone who knows the documented demo password can access those mock accounts; do not enter real patient details or deploy it as an emergency service.
- Keep secrets in `.env`, never in Git.
- Record assignment, capacity, and approval changes in an audit log.
- Limit users to their own emergency requests and driver missions.
- Request mobile location only while a driver is on an active mission and has consented.
- Use HTTPS, encrypted backups, retention rules, and a privacy review before any real deployment.
- Never connect this learning project to emergency services, hospitals, or traffic lights without written authorization.
