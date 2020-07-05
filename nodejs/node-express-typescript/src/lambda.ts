import { proxy, createServer} from "aws-serverless-express";
import {APIGatewayProxyEvent, Context } from "aws-lambda";
import app from "./app";

// NOTE: If you get ERR_CONTENT_DECODING_FAILED in your browser, this is likely
// due to a compressed response (e.g. gzip) which has not been handled correctly
// by aws-serverless-express and/or API Gateway. Add the necessary MIME types to
// binaryMimeTypes below
const binaryMimeTypes = [
  "application/javascript",
  "application/json",
  "text/javascript",
];
const server = createServer(app, null, binaryMimeTypes);

//    event: lambda.APIGatewayProxyEvent,
//     context: lambda.Context,
exports.handler = (event: APIGatewayProxyEvent, context: Context) => proxy(server, event, context);
