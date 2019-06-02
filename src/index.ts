import "reflect-metadata";
import * as cors from "cors";
import * as helmet from "helmet";
import * as bodyParser from "body-parser";
import { useExpressServer } from "routing-controllers";
import express = require("express");

try {
    // Create a new express application instance
    const app = express();

    // Call midlewares
    app.use(cors());
    app.use(helmet());
    app.use(bodyParser.json());

    // Register express app instance with routing controllers
    useExpressServer(app, {
        controllers: [__dirname + "/controllers/*.ts"],
        routePrefix: "/api",
        cors: true,
        classTransformer: true,
        defaults: {
            //with this option, null will return 404 by default
            nullResultCode: 404,

            //with this option, void or Promise<void> will return 204 by default
            undefinedResultCode: 204
        }
    });

    // Listen to requests on 3000
    app.listen(3000, () => {
        // eslint-disable-next-line no-console
        console.log("Server started on port 3000!");
    });
} catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
}
