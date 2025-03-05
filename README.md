# MarkNote
Write notes with markdown support

**Client: https://marknote-client.onrender.com/auth/register**  
**API:  https://marknote-api.onrender.com**

## How to run this web application locally:
```
# Clone this application's repository in the current directory
git clone https://github.com/neil-justin/marknote.git

# Change directory to the application's
cd marknote

# Run the application's instance using docker
docker compose up --build

# To visit the application's client and API respectively
http://localhost:5173/auth/register
http://localhost:3000/
```

## Technologies/tools
- React for the frontend
- Node.js/Express.js for the backend
- Typescript for type safety
- MongoDB for storing notes and users' credential
- Mongoose for querying MongoDB
- Docker for consistent app behavior regardless of environment
- Firebase Auth for storing users' credential and authentication
- React Router for client-side routing
- Playwright for integration testing
- Tailwind and daisyUI for design
- React Query for data fetching
- Tiptap for rich text editor/markdown support
- RESTFul API
- Render.com for deployment

... etc
