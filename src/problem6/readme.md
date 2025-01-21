# API Service Specification for Live Scoreboard Update

## Overview

This module is designed to manage real-time updates to the user scoreboard, reflecting the top 10 user scores. The system ensures that scores are updated securely and efficiently whenever a user completes a qualifying action.

## Key Features

- **Live Update**: The scoreboard updates dynamically on the website, reflecting changes in real-time.
- **Action-Triggered Update**: A user's score increases upon completing a specific action on the platform.
- **Security**: Measures are in place to prevent unauthorized score updates.
- **Real-Time Scoreboard**: The top 10 user scores are displayed and updated instantly upon each valid score update.

## Table of Contents

1. [Flow of Execution](#flow-of-execution)
   - [User Action Flow](#user-action-flow)
   - [Server Validation](#server-validation)
   - [Update Score](#update-score)
2. [API Endpoints](#api-endpoints)
   - [POST /score/update](#1-post-scoreupdate)
   - [GET /score/leaderboard](#2-get-scoreleaderboard)
3. [Database Design](#database-design)
   - [Users Table](#users-table)
   - [Score Updates Table](#score-updates-table-optional-for-auditing-and-tracking)
4. [Security Considerations](#security-considerations)

## Flow of Execution

### User Action Flow

1. **User Completes Action**: The user performs an action that qualifies for a score increase.
2. **API Request to Backend**: The user's client application sends an HTTP request to the API server to update the user's score.

### Server Validation

1. **Authentication**: Verify that the `auth_token` provided is valid and belongs to the user making the request.
2. **Authorization**: Ensure that the request is being made by the correct user.
3. **Sanity Check**: Ensure that the `new_score` is a positive integer and greater than the current score (if applicable).
4. **Anti-Cheat Measures**: Implement checks to prevent score manipulation by unauthorized users, such as rate limiting and bot detection.

### Update Score

1. If the request is valid, the server updates the score for that user in the database.
2. The server updates the live leaderboard of the top 10 users based on their new scores.
3. **Notify Client**: The client application receives a response indicating success or failure, and the front-end dynamically updates the scoreboard in real-time.

## API Endpoints

### 1. POST /score/update

This endpoint updates the user's score when they complete a valid action.

**Request Body:**

```json
{
  "user_id": "string",  // Unique identifier of the user
  "new_score": "integer",  // The new score after the action
  "auth_token": "string"  // Token for user authentication (JWT, OAuth, etc.)
}
```

**Response:**

```json
{
  "status": "success",  // or "error"
  "message": "Score updated successfully"  // or error message
}
```

**Validations:**

- **Authentication**: Verify that the `auth_token` provided is valid and belongs to the user making the request.
- **Authorization**: Ensure that the request is being made by the correct user.
- **Sanity Check**: Ensure that the `new_score` is a positive integer and greater than the current score (if applicable).
- **Anti-Cheat Measures**: Implement checks to prevent score manipulation by unauthorized users, such as rate limiting and bot detection.

### 2. GET /score/leaderboard

This endpoint fetches the current top 10 user scores for the scoreboard.

**Response:**

```json
{
  "leaderboard": [
    { "user_id": "string", "username": "string", "score": "integer" },
    { "user_id": "string", "username": "string", "score": "integer" },
    // ... more users
  ]
}
```

**Purpose:**

Fetch and display the current top 10 user scores.

## Database Design

### Users Table

- `user_id`: Unique identifier (Primary Key)
- `username`: The display name of the user
- `score`: The current score of the user

### Score Updates Table (optional, for auditing and tracking)

- `update_id`: Unique identifier for the score update
- `user_id`: Foreign Key linking to the Users table
- `score_before`: The score before the update
- `score_after`: The score after the update
- `timestamp`: Timestamp when the update occurred
- `action`: Optional field for auditing purposes (e.g., the type of action performed)

## Security Considerations

- **Authentication**: Ensure that each API request contains a valid authentication token (e.g., JWT or OAuth token) to verify the identity of the user.
- **Authorization**: Check that the authenticated user is the one trying to update the score.
- **Rate Limiting**: Implement rate-limiting to avoid bots or malicious actors from bombarding the API with score updates.
- **Input Validation**: Ensure that the user’s score is only updated with a valid value and is consistent with the game rules (e.g., no negative scores).
- **Bot Protection**: Detect and prevent bot interactions through mechanisms like CAPTCHA or behavior analysis.