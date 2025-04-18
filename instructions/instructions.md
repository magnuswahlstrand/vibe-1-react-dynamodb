# Project Name: Comments app

## Overview:
A web app with a Node.js backend, React frontend, and DynamoDB (ElectronDB) for data storage. The app provides a minimal interface for interacting with a language model, allowing users to input queries and receive responses.

## Tech Stack:
* Frontend: React (Next.js), Shadcn, Lucide icons
* Backend: Next.js
* Data Store: DynamoDB (ElectroDB)
* pnpm for package management
* Server actions for requests

## File structure:

 app
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components
│   └── ui
├── components.json
├── eslint.config.mjs
├── instructions
│   └── instructions.md
├── lib
│   └── utils.ts
├── next-env.d.ts
├── next.config.ts
├── package.json
├── pnpm-lock.yaml
├── postcss.config.mjs
├── public
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
└── tsconfig.json

# Features

## Let's start with a simple data model. PK a ULID and then attributes, a single attribute text which contains a text

## Initial phase
1. A list of all entries in dynamodb DB
2. A textarea 
3. Button
When button is clicked, it is added to the list and sent to the backend and store in the db with a new ulid