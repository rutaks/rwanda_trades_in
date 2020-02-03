/** Imports */
import express from "express";
import env from "custom-env";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import Response from "./helpers/response";
import { connectDB, setupSession } from "./config/db";
import logger from "morgan";
import session from "express-session";
import path from "path";
import flashMessages from "connect-flash";
import ErrorHandler from "./helpers/error-handler";

env.env();

/** Variable Definitions */
const app = express();
const port = process.env.PORT;
const secret = process.env.SESSION_SECRET;
const store = setupSession();

/** Middleware Config &&  Session Authentication Handling */
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));
app.use(flashMessages());
app.use(
  session({
    secret: secret,
    resave: false,
    saveUninitialized: false,
    store: store
  })
);
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.account = req.session.account;
  next();
});

/** Page Template Setup */
app.set("view engine", "ejs");
app.set("views", "views");

/** Routes */
/**
 * Route serving Welcome Response
 * @name /intro
 * @function
 * @param {string} path - Express path
 */
app.get("/intro", (req, res) => res.render("server/index"));

/**
 * Route serving API Routes
 * @name /api/v1
 * @function
 * @param {string} path - Express path
 */
// app.use("/api/v1", api);

/** Error Handling */
const handleError = (err, res) => {
  const { statusCode, message } = err;
  return res.render("auth/message-window", {
    title: statusCode,
    heading: `Oh No, ${statusCode}. Something Has Happened`,
    message: message
  });
};

app.use((err, req, res, next) => {
  handleError(err, res);
});

/** Server */
const runServer = async () => {
  try {
    await connectDB();
    app.listen(port, () =>
      console.debug("INFO:", `RwandaTradesIn is now running on Port: ${port}`)
    );
  } catch (error) {
    throw error;
  }
};

runServer();

export default app;
