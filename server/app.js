/** Imports */
import express from "express";
import env from "custom-env";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { connectDB, setupSession } from "./config/db";
import logger from "morgan";
import session from "express-session";
import path from "path";
import flash from "express-flash";
import routes from "./routes/index.route";
import AuthMocks from "./mocks/auth-mocks";
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
app.use("/uploads", express.static("uploads"));
app.use(flash());
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
 * Route serving API Routes
 * @name /
 * @function
 * @param {string} path - Express path
 */
app.use("/", routes);

/** Error Handling */
const handleError = (err, res) => {
  const { statusCode, message } = err;
  return res.render("server/message-window", {
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
    const check = AuthMocks.setupAdmin();
    const message = check ? "Mocks Are Set" : "Mocks Are Not Set";
    console.debug("INFO:", message);
    app.listen(port, () =>
      console.debug("INFO:", `RwandaTradesIn is now running on Port: ${port}`)
    );
  } catch (error) {
    console.log("Could Not Connect To Server");
  }
};

runServer();

export default app;
