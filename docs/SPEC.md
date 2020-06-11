# Project Tracker – Specification

## Project purpose
Voodoo Park would like a cloud-based timesheet system for their employees to 
record their time spent in projects and with tasks in half-hourly increments.

## High-level product components
 - Main application responsible for tracking the time spent on  project, task or milestone
 - Admin back-office responsible for user, client, project, milestone management
 - Backend application for main and back-office applications

## Functional requirements
##### Users have the ability to:
 - Record their time using pre-populated dropdowns of Project, Action label 
 (development, analysis, code review, sickness, holiday -> this list 
 should be extendable in BO) and Milestones and a free text field to describe the task that they are reporting time for
 - Receive reminder emails if they fail to fill in their timesheet by the end of the week
 - Access a dashboard with their own records, dashboard should display a timeline, 
 which is customizable to display the records
##### Admins have the ability to:
- Add and manage users
    - Users consist of: 
        - Name 
        - Role (user/admin)
        - Email 
        - Password
        - User cost to company per hour (£)
        - Project Assigned
            - Project ID/Name (selected from the dropdown)
            - User cost to the client on the project per hour (£)
    - Set up new Clients/Projects/Milestones within the system
        - Clients consist of:
            - Name
            - Description
        - Projects consist of:
            - Name
            - Client
            - Description
            - Budget
        - Milestones consist of:
            - Name
            - Project
            - Description
    - Get reports of time spent
        - By user
        - By project
        - Actual time recorded versus budgeted time
        - Reports must be convertible to excel or CSV (samples attached)
    - Settings by project
        - Add users to a project
        - Remove users from a project
        - Only the last 3 weeks fillable
##Non-functional requirements
- The application should be available for web
- UI interactions should take less than 3 seconds with the exception of report generation which may take up to 6 seconds
- The application should run in evergreen web browsers (Chrome, Firefox, Safari, Edge)

## Wireframe
[Link to the wireframe](https://xd.adobe.com/view/ce3f17e7-3a01-4863-6b18-e1e74f4324ca-b80e/)

PWD: VoodooPark1

## Reports

- Timesheet examples.xlsx
- The underlying calculations and report examples are attached
