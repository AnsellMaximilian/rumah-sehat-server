# Rumah Sehat API

This application provides the API needed for [this client application](https://github.com/AnsellMaximilian/rumah-sehat-client).

## Overview

This API is built using Express.js and the Sequelize ORM. It connects to a Postgres database that stores data for a sales system. The API provides endpoints for creating, reading, updating, and deleting data related to the sales system.

## Features

Beside provides GET, POST, PUT, etc. requests for the client application, this API server also serves to:
- Automatically generate pdfs for requested invoices
- Generate weekly supplier bills
- Generate profits report paramaterized based on dates

## Data Model

Here is the ERD for the API:

![database](https://user-images.githubusercontent.com/56351143/231994213-c34543b4-c8de-4df4-bae7-95375fa94b0e.png)

