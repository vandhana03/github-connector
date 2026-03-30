# GitHub Connector

## Description
This project is a backend application that integrates with GitHub API.  
It allows users to fetch repositories, list issues, and create issues using REST APIs.

## Tech Stack
- Node.js
- Express.js
- Axios

## Setup Instructions

1. Install dependencies:
npm install

2. Create a .env file and add:
GITHUB_TOKEN=your_token_here
PORT=3000

3. Run the server:
node index.js

## API Endpoints

### 1. Get Repositories
GET /repos/:username

Example:
http://localhost:3000/repos/vandhana03

---

### 2. Get Issues
GET /issues/:owner/:repo

Example:
http://localhost:3000/issues/vandhana03/ToDoList

---

### 3. Create Issue
POST /create-issue

Body:
{
  "owner": "vandhana03",
  "repo": "ToDoList",
  "title": "Test Issue",
  "body": "Created via API"
}

## Features
- GitHub API integration
- Authentication using Personal Access Token (PAT)
- Clean and structured API responses
- Error handling
