# Volunteer Management System - Frontend

## 1. Project & Repository Description

This repository contains the **Frontend** for the Volunteer Management System project. Built with React, this application provides a dynamic and responsive user interface (UI) for both volunteers and administrators.

It connects to the Django (Backend) API to handle all data. The application features:
* **For Guests:** A full-page hero banner and the ability to browse opportunities.
* **For Volunteers:** Secure registration/login, profile management, and the ability to apply for opportunities.
* **For Admins:** A protected admin dashboard to manage all applications and users.

## 2. Tech Stack

* **React:** Used for building all UI components.
* **React Router:** For client-side routing, including protected routes for users and admins.
* **Axios:** For handling all API requests to the backend.
* **JWT Decode:** For reading user data from the JWT token.
* **CSS:** For all custom styling, and designs in the application.

## 3. Project Links

* **Back End Repository:**  https://github.com/engsahab/volunteer-backend

## 4. Installation Instructions

To run this project locally, follow these steps:

1.  Clone the repository: `git clone (https://github.com/engsahab/Volunteer-frontend)`
2.  Navigate to the directory: `cd volunteer-frontend`
3.  Install dependencies: `npm install`
4.  Run the application: `npm run dev`
5.  **Important:** Ensure the backend server is running on `http://127.0.0.1:8000` for the API requests to work.

## 5. IceBox Features (Future Plans)

Features I plan to implement in the future:

* **Withdraw Application:**
    * **Description:** Allow a registered user to "withdraw" (Delete) their own application if it is still "pending" (implements User Story #8).
    * **Status:** The backend API endpoint (`DELETE /api/applications/<id>/`) is already built and functional.

* **Advanced UI Filtering:**
    * **Description:** Add UI controls (like dropdowns or checkboxes) to the search bar to allow users to filter opportunities by `location` or `specialization`.

* **Profile View/Edit Mode:**
    * **Description:** Refactor the `ProfilePage` to have a "View Mode" (displaying text) and an "Edit Mode" (displaying the form), rather than always showing the form.
