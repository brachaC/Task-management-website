# Task Management Dashboard

![Angular](https://img.shields.io/badge/Angular-19-red)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![License](https://img.shields.io/badge/license-MIT-green)

![Dashboard Screenshot](docs/dashboard.png)

A modern Angular-based task management application designed to demonstrate professional UI architecture, modular design, and clean frontend workflows.

## Overview

This repository presents a scalable task management dashboard built with Angular. The application emphasizes reusable components, feature-focused organization, and strong TypeScript typing to support task tracking, filtering, and role-aware interactions.

## Tech Stack

- Angular 19
- TypeScript
- RxJS
- Angular Router
- Reactive Forms
- SCSS
- Angular CLI

## Architecture

The application follows a feature-based architecture designed for maintainability and extensibility.

- Feature modules isolate business domains.
- Shared components are reusable across the application.
- Services encapsulate business logic and data flow.
- Models provide strong typing and code clarity.
- Pipes and directives improve UI consistency.

## Project Structure

src/
├── app/
│   ├── features/
│   ├── components/
│   ├── services/
│   ├── models/
│   ├── pipes/
│   ├── directives/
│   └── shared/

## Features

- Task management dashboard with task detail views
- Role-aware UI behavior and access patterns
- Task filtering by status, priority, and owner
- Reusable dialogs, navigation, and form components
- Structured models for tasks, users, roles, and settings
- Mock data support for rapid prototyping

## Screenshots

### Dashboard

![Dashboard](docs/dashboard.png)

### Task Details

![Task Details](docs/task-details.png)

### Task Table

![Task Table](docs/task-table.png)

> Add screenshot files in the `docs/` folder to display these previews in GitHub.

## Installation

Clone the repository:

```bash
git clone <repository-url>
cd task-management-dashboard
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
ng serve
```

Open the app in your browser:

```text
http://localhost:4200/
```

## Build

Compile the production build:

```bash
ng build --configuration production
```

The compiled output is generated in the `dist/` directory.

## Testing

Run unit tests:

```bash
ng test
```

## Design Decisions

- Feature-based folder organization
- Reusable component design
- Strong TypeScript typing for maintainability
- Separation of presentation and business logic
- Service-driven data flow

## Challenges Solved

- Designing reusable task filtering mechanisms
- Managing role-aware UI behavior
- Maintaining a clean and modular component structure
- Building scalable communication patterns between components

## Future Enhancements

- Backend API integration
- JWT-based authentication
- State management with NgRx
- Real-time task updates
- Drag-and-drop task organization

## License

MIT License

