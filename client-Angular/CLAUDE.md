# CLAUDE.md — client-Angular (Tasks Management App)

## Project Identity

- **Name:** `empty-project` / `emptyProject`
- **Description:** Angular 19 standalone tasks management app with real-time chat
- **Author:** Bracha Hasid (MIT License 2026)
- **Platform:** Angular 19.0.6, TypeScript ~5.6.2, SCSS, RTL Hebrew UI

## Commands

```bash
npm start          # ng serve (dev server, port 4200)
npm run build      # ng build (production)
npm run watch      # ng build --watch (development)
npm test           # ng test (Karma + Jasmine)
```

## Architecture Overview

**Fully standalone** — no `NgModule`, all components use `standalone: true`. Bootstrapped via `bootstrapApplication(AppComponent, appConfig)` in [src/main.ts](src/main.ts).

### Bootstrap Flow

1. [src/main.ts](src/main.ts) bootstraps `AppComponent` with `appConfig`
2. [src/app/app.config.ts](src/app/app.config.ts): `APP_INITIALIZER` calls `ConfigurationService.initConfiguration('/config')` — loads `ipConfig.json` + `settingsConfig.json` from server, then initializes WebSocket
3. `appConfig` provides: `provideZoneChangeDetection`, `provideRouter`, `provideHttpClient(withFetch())`

### Routing ([src/app/app.routes.ts](src/app/app.routes.ts))

| Path | Component | Guard | Children |
|------|-----------|-------|----------|
| `''` | redirectTo `home` | — | — |
| `home` | HomeComponent (lazy) | none | — |
| `login` | LoginComponent (lazy) | none | — |
| `main` | MainComponent (lazy) | `LoggedInGuardsService` | tasks, about, users |
| `main/tasks` | TasksComponent (lazy) | inherited | — |
| `main/about` | AboutComponent (lazy) | inherited | — |
| `main/users` | UsersComponent (lazy) | inherited | — |

All routes use `loadComponent` (lazy-loaded standalone components).

### Route Guard

`LoggedInGuardsService` (implements `CanActivate`) — checks `localStorage` for a `user` key with valid JSON containing `userName` and `password`. Redirects to `/login` if missing/invalid.

## Key Files

| File | Purpose |
|------|---------|
| [src/app/app.config.ts](src/app/app.config.ts) | App-level providers, `APP_INITIALIZER` config loader |
| [src/app/app.routes.ts](src/app/app.routes.ts) | Lazy-loaded route definitions |
| [public/config/ipConfig.json](public/config/ipConfig.json) | Backend URLs (`servicePath`, `webSocketPath`) |
| [public/config/settingsConfig.json](public/config/settingsConfig.json) | App settings (`numRows: 20`) |
| [src/styles.scss](src/styles.scss) | Global styles (Rubik font, RTL body reset) |

## Component Map

### Core Shell
- **AppComponent** (`app-root`) — root, renders `<router-outlet>`
- **MainComponent** (`app-main`) — app shell: inline navbar (About/Tasks/Users tabs), server health polling (2s), embedded ChatComponent
- **NavbarComponent** (`app-navbar`) — empty stub; actual navbar is built inline in MainComponent

### Landing & Auth
- **HomeComponent** (`app-home`) — landing page: developer name, skills, server health polling (2s), resume download, login link
- **LoginComponent** (`app-login`) — reactive form (userName + password), stores to localStorage, navigates to `/main`
- **RegisterComponent** (`app-register`) — stub only ("register works!")

### Tasks
- **TasksComponent** (`app-tasks`) — task management hub: Dashboard/Table view toggle, MatDialog for TaskForm, WebSocket subscriptions (`messageEvent`, `importantEvent`)
- **TaskComponent** (`app-task`) — single task card: name, id, description, scheduling, price (ILS), status, status icon
- **TaskFromComponent** (`app-task-from`) — dialog form for creating/editing tasks; Reactive Forms + MatDatepicker + `dateFromTodayValidator`
- **TasksTableComponent** (`app-tasks-table`) — Angular Material `mat-table` with dynamic columns from task keys; update (via dialog) and delete (via ConfirmDialog)
- **TasksDashboardComponent** (`app-tasks-dashboard`) — grid of TaskComponent cards
- **TasksToolTipComponent** (`app-task-tooltip`) — tooltip with signals/computed task counts by status; projects `<ng-content>`
- **StatusComponent** (`app-status`) — `ControlValueAccessor` for status; HTML is a placeholder ("status works!"), TS is partially implemented

### Chat
- **ChatComponent** (`app-chat`) — floating chat with FAB toggle; sends via `MessageService`, receives via WebSocket; uses `RandomColorPipe` + `ChatMessagePipe`

### Users
- **UsersComponent** (`app-users`) — Material table, add (UserForm dialog), delete (ConfirmDialog), role-based column visibility
- **UserComponent** (`app-user`) — displays current logged-in user info
- **UserFormComponent** (`app-user-form`) — dialog form for adding users; Reactive Forms (userName, phone, email, password, role)

### Other
- **AboutComponent** (`app-about`) — developer info, tech stack, live clock (RxJS interval)
- **ConfirmDialogComponent** (`app-confirm-dialog`) — generic yes/no MatDialog

## Services (all `providedIn: 'root'`)

| Service | File | Purpose |
|---------|------|---------|
| **ConfigurationService** | [services/configuration.service.ts](src/app/services/configuration.service.ts) | Loads config files at init, initializes WebSocket, emits `messageEvent` + `importantEvent` |
| **LoggedInGuardsService** | [services/logged-in-guards.service.ts](src/app/services/logged-in-guards.service.ts) | Route guard checking localStorage for user session |
| **DownloadService** | [services/download.service.ts](src/app/services/download.service.ts) | Downloads `/assets/myResume.pdf` as blob |
| **SnackService** | [services/snack.service.ts](src/app/services/snack.service.ts) | Wrapper for `MatSnackBar` (configurable position, 30s duration) |
| **HttpServiceBase** (abstract) | [services/http/http-service.base.ts](src/app/services/http/http-service.base.ts) | Generic `get$`, `post$`, `put$`, `delete$`, `request$` using `HttpRequestModel` |
| **TasksService** | [services/http/tasks.service.service.ts](src/app/services/http/tasks.service.service.ts) | Task CRUD → `{servicePath}tasks/` |
| **MessageService** | [services/http/message.service.ts](src/app/services/http/message.service.ts) | Chat messages → `{servicePath}messages/` |
| **UsersService** | [services/http/users.service.ts](src/app/services/http/users.service.ts) | User CRUD → `{servicePath}users/` |
| **WebsocketService** | [services/http/web-socket.service.ts](src/app/services/http/web-socket.service.ts) | Raw WebSocket manager; parses JSON with `topic` + `data` |
| **CheckHttpService** | [services/http/check-http.service.ts](src/app/services/http/check-http.service.ts) | Health check → `localhost:3030/checkConnection/checkconnection` |

## Pipes

| Pipe | Name | Purpose |
|------|------|---------|
| StatusPipe | `status` | `StatusMode` enum → Hebrew string |
| FilterStatusPipe | `filterStatus` | Filter `Itask[]` by `StatusMode` |
| IconsPipe | `icons` | `StatusMode` → Material icon name |
| StatusIconPipe | `statusIcon` | `StatusMode` → status icon name |
| ChatMessagePipe | `chatMessage` | Highlights `&&text&&` in chat (red bold) |
| RandomColorPipe | `randomColor` | Deterministic random color from numeric seed |
| ToColumnNamePipe | `toColumnName` | Field name → Hebrew label |
| RoleTextPipe | `roleText` | `RoleEnum` → Hebrew string |

## Directives

- **AppOverHilightDirective** (`[appAppOverHilight]`) — hover background color
- **DirectivesDirective** (`[appDirectives]`) — empty stub

## Models & Enums ([src/app/model/](src/app/model/))

- **Itask**: `taskId`, `name`, `description`, `price`, `scheduling`, `status`
- **StatusMode** (enum): `all=-1`, `pending=0`, `process=1`, `completed=2`, `cancel=3`
- **TaskViewMode** (enum): `Table='table'`, `Dashboard='dashboard'`
- **HttpRequestModel**: `url`, `action`, `params`, `body`, `isText`, `headers` + `fullUrl` getter + queryParams builder
- **IpConfig**: `servicePath?`, `webSocketPath`
- **SettingsConfig**: `numRows?`
- **IHomeDetails / IProjectDetails**: portfolio/home page data
- **IUser**: `userId?`, `firstName?`, `lastName?`, `email?`, `userName?`, `password?`, `roleId?`
- **RoleEnum**: `manager=2`, `standard=1`

## Configuration Files

- **`public/config/ipConfig.json`**: `{ "servicePath": "http://localhost:3000/api", "webSocketPath": "ws://localhost:3000" }`
- **`public/config/settingsConfig.json`**: `{ "numRows": 20 }`
- [tsconfig.json](tsconfig.json): strict mode, ES2022 target, bundler module resolution, experimental decorators

## Data Flow

1. **Startup**: `main.ts` → `appConfig` → `ConfigurationService.initConfiguration('/config')` loads configs → WebSocket connects
2. **Auth**: Login form stores credentials in `localStorage` → guard checks on `/main` routes
3. **Tasks CRUD**: `TasksComponent` → `TasksService` (HTTP) → backend `{servicePath}tasks/`; real-time updates via WebSocket
4. **Chat**: ChatComponent → `MessageService.post$` for outgoing; `WebsocketService` → `ConfigurationService.messageEvent` for incoming
5. **Server health**: Polled every 2s by HomeComponent + MainComponent via `CheckHttpService`

## Design Notes

- **Color scheme**: teal/aqua (`#155e6f`, `rgb(25, 194, 194)`) + pink/rose (`rgb(250, 12, 91)`)
- **Direction**: RTL (`direction: rtl`) in MainComponent + AboutComponent
- **Font**: Rubik (body in styles.scss), Roboto (Google Fonts in index.html)
- **Icons**: Material Icons (Google Fonts)
- **Theme**: Angular Material `azure-blue` prebuilt theme (referenced in angular.json styles)

## Known Issues

- **Angular Material missing from package.json**: `@angular/material` and `@angular/cdk` are used extensively but not declared as dependencies — they may be installed but undeclared
- **StatusComponent**: TS implements `ControlValueAccessor` but HTML is a placeholder — component is incomplete
- **LoginComponent styling**: Uses rigid `margin-left: 550px` instead of responsive layout (inconsistent with other components)
- **Server health URL mismatch**: `CheckHttpService` uses port `3030` while `ipConfig.json` uses port `3000`

## Seed Data

Static task seed data at [src/app/data/tasks.json](src/app/data/tasks.json) — used for development/testing when backend is unavailable.
## Verification

Before modifying existing code:

- Search the repository for usages of the function/class.
- Check whether the change affects other modules.
- If dependencies exist, explain them before editing.
## Preservation

Prefer extending existing code instead of replacing it.

Do not remove existing implementations until the new implementation has been verified to work.
## Planning

For any task that modifies more than one file or changes business logic:

1. Analyze the existing implementation.
2. Read all relevant files.
3. Explain the implementation plan.
4. Wait for my approval before editing any file.

Do not start coding until I explicitly approve the plan.
