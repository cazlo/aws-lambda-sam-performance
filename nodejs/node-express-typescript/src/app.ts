import awsServerlessExpressMiddleware from "aws-serverless-express/middleware";
import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import express from "express";

import { get, getAll, post, put } from "./controller/bookController";

const app = express();

app.use(compression());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(awsServerlessExpressMiddleware.eventContext());

app.get("/book/:id", get);

app.get("/book", getAll);

app.post("/book", post);

app.put("/book/:id", put);

// The aws-serverless-express library creates a server and listens on a Unix
// Domain Socket for you, so you can remove the usual call to app.listen.
// app.listen(3000)
// app.use("/", router);

// Export your express server so you can import it in the lambda function.
export default app;
