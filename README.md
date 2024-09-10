# Table Reservation Web App
This project provides restaurant managers a robust tool for handling table reservations, optimizing seating capacity, and improving customer satisfaction. 

This is a table reservation web application built using React for the frontend, Knex.js as the SQL query builder for database interaction, and PostgreSQL as the database. The system is designed for restaurant managers to handle table reservations efficiently. It allows users to view reservations for past, present, and future dates, search for reservations, create new reservations while considering table availability, and add new tables to expand the restaurant's seating capacity.

## 👀 Preview

View Reservations

View reservations for any given date (past, present, future).
Filter reservations by date.
Display details of reservations like time, party size, table assignment, and reservation status (e.g., pending, seated, completed).
![Image of Application](https://i.imgur.com/SwSnJZJ.png)
Create New Reservation

Create a new reservation by selecting an available table and specifying details (e.g., customer name, party size, date, time).
Ensure reservation can only be created for available tables (i.e., tables that are not reserved for the specified date and time).
Validation for table capacity based on party size.
![Image of Application](https://i.imgur.com/iyiRUAE.png)
Search Reservations

Search for reservations using various parameters such as customer name or phone number.
Display matching reservations with details like date, table, and status.
![Image of Application](https://i.imgur.com/tlyFMN8.png)
Manage Tables

Add new tables to the restaurant to increase seating capacity.

![Image of Application](https://i.imgur.com/3dWxnRD.png)


Live Demo Pending


## ✍️ Programming Languages
Javascript (React), Knex, and PostgreSQL

## 🔧Installation

- Run `npm install` to install the dependencies needed for this project.
- Run `npm start`

## 🧱 Additional Notes

N/A

## ⚒️ Contribution

Created frontend and backend system with Knex 

## 😄 License
[MIT](https://choosealicense.com/licenses/mit/)

