# Song CSV Importer

A simple React + NestJS application to upload a CSV file of songs, store them in a PostgreSQL database, and view them in a sortable table.

## Features
- Upload CSV files of songs
- Display songs in a sortable table (by band, title, year)
- Alternating row colors and hover effects
- Responsive design
- Built with React, NestJS, TypeScript, and PostgreSQL

## Getting Started

### Prerequisites
- Node.js
- Docker & Docker-Compose

### Installation
1. Clone the repo
2. `cd backend` and `npm install`
3. `cd frontend` and `npm install`
4. Run `docker-compose up` to start database
5. Start backend: `npm run start:dev`  
6. Start frontend: `npm start`

## Usage
1. Open the frontend at `http://localhost:3000`
2. Upload a CSV file of songs. You can use the provided F-S Test - T02 - 2023 - Song_list.csv
3. View and sort songs by clicking the table headers

