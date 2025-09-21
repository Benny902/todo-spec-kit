# Tasks: Todo List App

**Input**: Design documents from `/specs/001-todo-list-app/`
**Prerequisites**: plan.md (required)

## Execution Flow (main)
1. Backend setup: .NET 9 Web API, EF Core, SQLite
2. Backend API: CRUD endpoints for tasks
3. Frontend setup: React + Vite + TypeScript
4. MCP & GitHub integration: Sync Spec-Kit tasks to GitHub issues/project
5. Testing & validation: Verify endpoints and UI

## Format: `[ID] [P?] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- Include exact file paths in descriptions

## Phase 3.1: Setup
- T001 Create backend project structure in `backend/TodoApp.Api/`
- T002 Create frontend project structure in `frontend/`

## Phase 3.2: Backend
- T003 Implement Task entity in `backend/TodoApp.Api/Models/Task.cs`
- T004 Setup EF Core DbContext in `backend/TodoApp.Api/Data/TodoContext.cs`
- T005 Configure SQLite in `backend/TodoApp.Api/Program.cs`
- T006 Implement CRUD endpoints in `backend/TodoApp.Api/Program.cs`

## Phase 3.3: Frontend
- T007 Scaffold React app in `frontend/`
- T008 Implement Todo List UI in `frontend/src/App.tsx`
- T009 Integrate API calls in `frontend/src/App.tsx`

## Phase 3.4: MCP & GitHub Integration
- T010 Configure MCP in `.mcp/config.yml`
- T011 Create GitHub issues for each task
- T012 Organize issues in GitHub Project board

## Phase 3.5: Testing & Validation
- T013 Test backend endpoints with curl/Postman
- T014 Test frontend UI and API integration
- T015 Confirm MCP sync with GitHub issues/project

---
