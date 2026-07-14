# Workforce Management System (WMS)

## Introduction

The Workforce Management System (WMS) is a full-stack enterprise web application developed to streamline workforce operations within an organization. It provides a centralized platform for managing employees, attendance, leave requests, projects, departments, clients, announcements, and audit logs.

The application follows **Clean Architecture** principles to ensure scalability, maintainability, and separation of concerns. It also implements **JWT-based authentication** and **role-based authorization** to provide secure access for different user roles, including Admin, Manager, and Employee.

### Key Features

- Employee Management
- Attendance Management (Check-In / Check-Out)
- Leave Management
- Project Management
- Department & Client Management
- Dashboard with Analytics
- Announcements
- Audit Logs
- Attendance Reports with PDF Export
- JWT Authentication & Role-Based Authorization

---

# Getting Started

## Prerequisites

Ensure the following software is installed:

- .NET 8 SDK
- Node.js (v18 or later)
- Angular CLI
- SQL Server
- Visual Studio 2022 / VS Code
- Git

---

## Installation

### Clone the Repository

```bash
git clone https://github.com/yourusername/WMS.git
cd WMS
```

### Backend Setup

1. Open the solution in Visual Studio.
2. Update the SQL Server connection string in **appsettings.json**.
3. Apply database migrations:

```bash
Update-Database
```

or

```bash
dotnet ef database update
```

4. Run the API:

```bash
dotnet run
```

The backend will start on:

```
https://localhost:7152
```

---

### Frontend Setup

Navigate to the Angular project.

```bash
cd WMS-UI
```

Install dependencies:

```bash
npm install
```

Run the Angular application:

```bash
ng serve
```

The application will be available at:

```
http://localhost:4200
```

---

# Software Dependencies

## Backend

- ASP.NET Core 8
- Entity Framework Core
- SQL Server
- AutoMapper
- JWT Authentication
- Swagger

## Frontend

- Angular
- Angular Material
- Chart.js
- TypeScript
- RxJS

## Tools

- Git & GitHub
- Azure App Service
- Azure DevOps

---

# Project Structure

```
WMS.API
│
├── Controllers
├── Middleware
├── Program.cs
└── appsettings.json

WMS.Application
│
├── DTOs
├── Interfaces
├── Mapping
└── Services

WMS.Domain
│
└── Entities

WMS.Infrastructure
│
├── Data
├── Repositories
└── Services

Angular Client
│
├── Features
├── Core
├── Shared
└── Environments
```

---

# Build and Test

## Backend

Build the solution:

```bash
dotnet build
```

Run the API:

```bash
dotnet run
```

Run Unit Tests:

```bash
dotnet test
```

---

## Frontend

Build Angular application:

```bash
ng build
```

Run the application:

```bash
ng serve
```

Execute Angular tests:

```bash
ng test
```

---

# API Documentation

After running the backend, Swagger documentation is available at:

```
https://localhost:7152/swagger
```

The API provides endpoints for:

- Authentication
- Employee Management
- Attendance Management
- Leave Management
- Project Management
- Department Management
- Client Management
- Announcements
- Dashboard
- Audit Logs

---

# Deployment

The application is deployed using:

- Microsoft Azure App Service
- Azure DevOps CI/CD Pipeline

---

# Contributing

Contributions are welcome.

To contribute:

1. Fork the repository.
2. Create a new feature branch.

```bash
git checkout -b feature/feature-name
```

3. Commit your changes.

```bash
git commit -m "Add new feature"
```

4. Push the branch.

```bash
git push origin feature/feature-name
```

5. Create a Pull Request.

---

# Future Enhancements

- Email Notifications
- Payroll Management
- Performance Management
- Real-Time Notifications
- Mobile Application
- Server-Side Pagination
- Advanced Dashboard Analytics

---

# License

This project is developed for educational and learning purposes as part of a Capgemini Capstone Project.
