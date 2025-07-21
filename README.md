# Turborepo Monorepo based React example with a Nest.js Backend

This repository is meant to showcase my ability to pivot and work with React based SPAs

It will be updated over time with new examples. Check the bottom of this readme for a list.

# How to run

### Note for developers or individuals familiar with development
I used [Bun](https://bun.sh) during development and opted to have NPM as a default, but in theory if you know what you are doing you should be able to use PNPM and Yarn with some minor tweaking of the package.json packageManager field.

## Step one:
Clone the repository to the folder of your choice

## Step two:
⚠ If you plan to stick with NPM for simplicity, skip this step ⚠\
\
If you'd like to run Bun, rename package.json to package.json.disabled and package.json.disabled2 to package.json.

## Step three:
Use any of the following commands depending on the package manager of your choice..
><b>npm i</b>\
bun i

Once the installation was finished

## Step four:
>npm run dev\
bun run dev

The application should then be hosted on the following two adresses

http://localhost:3000 - Client\
http://localhost:3001 - API

# Roadmap

Here's the roadmap of features I expect to have in this repository (It's incomplete, and will be expanded with more ideas over time):

React/Next.js \
🟢 Basics - Project Setup \
🟢 Basics - Small Landing Page \
🟢 Basics - Basic Component \
🟢 Basics - Slotted Component \
🟢 Basics - CSS Classes and Loading \
🟢 Basics - Memos \
🟢 Basics - Conditional Rendering \
🟢 Basics - Loop Rendering \
🟢 Advanced - Use of Forms \
🟢 Advanced - Use of Contexts \
🟢 API Usage - Get \
🟢 API Usage - Post \
🟢 API Usage - Centralised API Module \
🔴 Routing - Another Page \
🔴 Testing - Basic Cypress Test \
🔴 Testing - API Cypress Test

Nest.Js \
🟢 Basics - Project Setup \
🟢 Basics - Simple GET Endpoint \
🟢 Basics - Simple POST Endpoint \
🟢 Basics - More Advanced GET Endpoint with JSON return \
🟢 Basics - Validation of incoming Data \
🟢 Basics - Validation Pipes \
🟢 Basics - Using temproary local variable as storage \
🔴 Basics - File I/O \
🔴 Basics - Database interactions - I'm figuring out how I can make this work locally without hassle for anyone pulling\
🔴 Later - API Root Splash \
🔴 Later - API Swagger (API documentation) \