# Whisker Watchers Backend

Welcome to the backend repository for the **Whisker Watchers Website**, a RESTful API supporting the platform. Built with **MongoDB**, **Mongoose**, and **Express**, the backend provides secure, scalable, and robust functionality. It is deployed on **Render**.

---

## **Overview**
The backend handles data storage, authentication, and API endpoints for the platform. It supports CRUD operations, user roles, and secure authorization.

---

## **Features**
- **Authentication and Authorization**:
  - Secure signup and login with JWT tokens.
  - Role-based access for owners, sitters, and admins.
- **Database Models**:
  - **User Model**: Manages user details, roles, and passwords.
  - **Pet Model**: Stores pet information like name, breed, and care notes.
  - **Booking Model**: Handles sitter bookings and schedules.
- **Dynamic API Endpoints**:
  - CRUD operations for users, pets, and bookings.
  - Filters for personalized views.
- **Error Handling**:
  - Validation and meaningful error messages.

---

## **Frontend Integration**
This frontend connects seamlessly with a react application frontend deployed on **Netlify**.  
**Frontend Repository**: _https://github.com/Ironhack-Arcadians/whisker-watchers-frontend_

## **Installation and Usage**
1. Clone the repository.
2. Install dependencies:
npm install express
npm install mongoose
npm install mongodb