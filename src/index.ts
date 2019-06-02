import * as express from "express";
import * as cors from "cors";
import * as helmet from "helmet";
import * as bodyParser from "body-parser";
import { routes } from "./routes";

try {
    // Create a new express application instance
    const app = express();

    app.use(cors());
    app.use(helmet());
    app.use(bodyParser.json());

    //Set all routes from routes folder
    app.use("/", routes);

    // Listen to requests on 3000
    app.listen(3000, () => {
        // eslint-disable-next-line no-console
        console.log("Server started on port 3000!");
    });
} catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
}
