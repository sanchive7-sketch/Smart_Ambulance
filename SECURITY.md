# Security Notes

This application may eventually handle sensitive health and location information. Treat security as a feature from the first database model.

- Use fictional data while learning and testing.
- Enforce role-based access on the API, not only in the UI.
- Store passwords only as bcrypt hashes.
- Keep secrets in `.env`, never in Git.
- Record assignment, capacity, and approval changes in an audit log.
- Limit users to their own emergency requests and driver missions.
- Request mobile location only while a driver is on an active mission and has consented.
- Use HTTPS, encrypted backups, retention rules, and a privacy review before any real deployment.
- Never connect this learning project to emergency services, hospitals, or traffic lights without written authorization.
