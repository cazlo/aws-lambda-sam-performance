const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
const bodyParser = require("body-parser");
const compression = require("compression");
const cors = require("cors");
const express = require("express");

const { get, getAll, post, put } = require("./controller/bookController");

const app = express();
const router = express.Router();

router.use(compression());
router.use(cors());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(awsServerlessExpressMiddleware.eventContext());

router.get("/book/:id", get);

router.get("/book", getAll);

router.post("/book", post);

router.put("/book/:id", put);

// The aws-serverless-express library creates a server and listens on a Unix
// Domain Socket for you, so you can remove the usual call to app.listen.
// app.listen(3000)
app.use("/", router);

// Export your express server so you can import it in the lambda function.
module.exports = app;
