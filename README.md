# Song CSV Importer

A simple React + NestJS application to upload a CSV file of songs, store them in a PostgreSQL database, and view them in a sortable table.

## Features
- Upload CSV files of songs
- Display songs in a sortable table (by band, title, year)
- Alternating row colors and hover effects
- Responsive design
- Built with React, NestJS, TypeScript, and PostgreSQL
- Fully Dockerized for easy setup
  
## Getting Started

### Prerequisites
- Node.js
- Docker & Docker-Compose

### Installation
1. git clone https://github.com/TamirPalay/songreader.git
      cd songreader
2. Install dependencies:
     cd backend && npm install
     cd ../frontend && npm install
3. Start the database with Docker:
      docker-compose up. Ensure Docker Desktop or an Equivalent program is running
4. Start the backend (NestJS):
    cd backend
    npm run start:dev
5. Start frontend (React):
    cd frontend
    npm start

## Usage
1. Open the frontend at `http://localhost:3000`
2. Upload a CSV file of songs. You can use the provided F-S Test - T02 - 2023 - Song_list.csv
3. View and sort songs by clicking the table headers

