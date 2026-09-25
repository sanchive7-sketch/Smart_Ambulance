# Jury Demo Guide

This is a **fictional, clickable product demonstration**. It does not contact an ambulance, hospital, emergency service, or public traffic signal.

## Two-minute walkthrough

1. Open `http://localhost:5173`, choose **People**, click **Use demo**, and sign in. Select **Heart attack** or **Accident**, then press **Send demo SOS**.
2. Show the suggested medically equipped ambulance and the mock tracking map. Open **Why this ambulance?** to explain capability-first selection.
3. Sign out, choose **Ambulance driver**, and show the vehicle inspection profile. Sign in and accept the case; the mock route to the incident and provisional hospital appears.
4. Sign out, choose **Hospital**, and show the hospital inspection profile. Sign in and accept the staged case.
5. Sign out and return to **People**. Only now do the accepted hospital's name, location, and contact number appear.

All three roles use the password `SerpDemo2026!`; the login page displays each email and has a **Use demo** shortcut. The People demo also accepts `+91 98765 43210` as a fictional login ID. Role-specific sign-in and API access checks are real application behavior, while the emergency workflow is mock data.

## What is simulated

- Dashboard metrics, ambulances, hospitals, case IDs, and coordinates are fictional.
- Citizen SOS, driver mission status, and hospital decisions share a fictional state in this browser, so you can switch roles and see the staged case progress. The state is saved only in browser storage, not a database or a live emergency network.
- The displayed ambulance recommendation is an example illustrating the planned capability-first rule, not a live routing or clinical decision engine.
- No real location sharing or traffic-signal control occurs.

For a reliable presentation, keep the API and web dev server running and confirm `http://localhost:4000/health` reports `"mode":"demo"` before the jury arrives. Use **Reset demo** in the People dashboard to restart the staged case after rehearsal; refreshing preserves the mock state.
