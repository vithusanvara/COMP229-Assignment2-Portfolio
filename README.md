# COMP229 Assignment 2 Portfolio Backend
Vithusan Varatharajan · Student 301561437

This project keeps the Assignment 1 React portfolio in `client` and adds an Express/Mongoose backend in `server`. Contact submissions now save to MongoDB. Projects and education remain displayed using the original frontend data; their CRUD APIs are implemented separately as required by Assignment 2.

## Run in VS Code on Windows
1. Extract this ZIP. Open the `MyPortfolio` folder in VS Code.
2. Install Node.js 22.12+ (or a compatible newer LTS version).
3. Open Terminal > New Terminal at the project root. Run `npm install`.
4. Run `npm install --prefix client`.
5. Copy `.env.example` to `.env` in the root. On PowerShell: `Copy-Item .env.example .env`.
6. For local MongoDB, start MongoDB Community Server and keep the example URI. Alternatively create a MongoDB Atlas cluster, database user and network access entry; paste its driver URI into MONGODB_URI. URL-encode special characters in the database password. The app explicitly selects database `Portfolio`.
7. Set JWT_SECRET to a unique random string with at least 32 characters. Do not upload `.env` to GitHub or submit real credentials in screenshots.
8. Run `node server.js` first. Look for `Connected to MongoDB database: Portfolio`. Open http://localhost:5000 for the welcome response. Stop it with Ctrl+C.
9. Run `npm run dev` from the root (or `cd client` then `npm run dev`). This starts Vite and nodemon together. Open http://localhost:5173.
10. If you change the backend port, also change the proxy target in `client/vite.config.js`.

## Database and API design
Collections: contacts, projects, qualifications, users. Each collection has its own `*.model.js` in `server/models`. `qualifications` is the permitted alternative to educations. Contact phone and message are optional extra fields to preserve your original form. User `created` and `updated` are maintained by Mongoose. Passwords are hashed with bcrypt and never returned.

For each resource below, these six routes exist:
- GET /api/RESOURCE — list all
- GET /api/RESOURCE/:id — get one
- POST /api/RESOURCE — create
- PUT /api/RESOURCE/:id — update
- DELETE /api/RESOURCE/:id — delete one
- DELETE /api/RESOURCE — delete all

RESOURCE is contacts, projects, qualifications or users.

POST /api/users (registration) and POST /api/contacts are public. All other CRUD routes require `Authorization: Bearer YOUR_TOKEN`. This is a classroom demo: registered users can manage all records. There is no administrator/owner authorization layer. Do not deploy it publicly with real personal information.

Authentication: POST /api/auth/signin, POST /api/auth/signout and GET /api/auth/me. Sign-in returns a one-hour JWT. Sign-out revokes that token in server memory until expiry. Restarting the server clears the revocation list; a production app needs persistent revocation storage.

## Postman testing and screenshots
Import `Portfolio.postman_collection.json`. Its baseUrl variable defaults to http://localhost:5000. Run requests in numbered order. Registration uses dummy data. The sign-in test automatically stores the token; create requests store each record ID for later requests. Every response checks its expected status. The four resource folders cover all 24 CRUD routes, including DELETE all.

Run the collection ONLY against an isolated assignment database. The DELETE all requests remove all records in each collection, including all users at the end. The authentication demonstration runs before those deletions.

If registration returns 409 after an earlier run, use a fresh dummy email consistently in registration/sign-in, or remove the old test user in Compass. Restart with a fresh test database for a repeatable complete run.

Submit the separate screenshot evidence Word document. After installing this adapted version, capture its startup console again so that the code shown matches the submitted files.

## Automated verification
`npm test` uses a temporary real MongoDB instance through mongodb-memory-server. The first run downloads a MongoDB binary and needs internet access. Tests cover CRUD operations, validation, password changes, protected routes and sign-out revocation. This temporary database does not create your Atlas submission database or replace your required screenshots.

## GitHub and submission
1. Create a GitHub repository, for example `COMP229-Assignment2`.
2. In the VS Code root terminal: `git init`, then `git add .`, then `git commit -m "Add portfolio backend with MongoDB and JWT"`.
3. Follow GitHub's commands to add the remote and push. Check that `.env` and node_modules are absent.
4. Submit the project ZIP, your GitHub repository URL, and your completed screenshot Word document. Exclude node_modules and `.env` from your ZIP. Keep package-lock files.

## Explain it to your professor
React is the user interface. Express matches HTTP methods and URLs to controllers. Controllers validate and manipulate records using Mongoose models. Mongoose stores documents in MongoDB. A JWT proves that a request signed in successfully. Middleware verifies the token before allowing protected controllers to run. `concurrently` starts frontend and backend together; nodemon restarts the backend when files change.

## Adaptation of the provided class starter
This version starts from the supplied MyPortfolioBNew1 project and replaces its sample client with the Assignment 1 portfolio. It retains the root server.js, config/config.js, server/express.js and separate models, controllers and routes used by that starter. Contact and user controller names follow its create, list, read, update, remove and ID lookup pattern. Projects, qualifications, delete-all operations and JWT authentication extend it to meet Assignment 2.

Starter defects were corrected: contact read/delete returned undefined, the template handler shadowed the welcome JSON route, and password hashing was disabled. Database credentials now come only from the root .env file. No class example credentials or editor history are included. The endpoints and successful JSON responses remain compatible with the earlier tested project and supplied Postman collection.
