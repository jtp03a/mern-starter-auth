## MERN Stack Starter with Authentication Framework
### Features:
<ul>
<li>Tech Stack: MongoDB, Express.js, React.js, Node.js
<li>Server side input validation using express-validator
<li>Client side input validation using HTML5 validation
<li>JWT stored as http-only cookie for increased security
<li>Private express routes protected with JWT
<li>Protected React Router routes
<li>Strong password requirements
<li>CSRF protection with csrf token
<li>Frontend and Backend run in same container
<li>Dockerfile
<li>Frontend is served by express as static
</ul>

### Setup:
<p>After cloning create a .env file in the root directory and add the following environmental variables:
<p>JWT_SECRET=your JWT secret
<p>MONGODB_URL=your mongoDB uri
<p>In the server.js file change the issuer and audience for own domain, do the same for the ./server/routes/utilities.js file

### API:
<p>The express api has public routes at /api and private routes at /api/private