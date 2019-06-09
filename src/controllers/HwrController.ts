import {
    Param,
    Controller,
    Post,
    Body,
    Res,
    Get,
    QueryParam
} from "routing-controllers";
import { HwrDto } from "../models/HwrDto";
import { Response } from "express";
import * as path from "path";
import { inkRec } from "../api/inkRec";

@Controller()
export class HwrController {
    @Get("/file/:file")
    public async file(
        @QueryParam("key") key: string,
        @Param("file") file: string,
        @Res() response: Response
    ) {
        const fileName = path.resolve(__dirname, "../assets/", file);

        try {
            await new Promise((resolve, reject) => {
                response.sendFile(fileName, (err: any) => {
                    if (err) reject(err);
                    resolve();
                });
            });
        } catch (error) {
            // eslint-disable-next-line no-console
            console.log(error);
            throw new Error(error);
        }
    }

    @Post("/image")
    public image(@Body() data: HwrDto, @Res() response: any) {
        // WIP
        const google = "";

        const base64Data = google.replace(/^data:image\/png;base64,/, "");
        var img = Buffer.from(base64Data, "base64");
        response.writeHead(200, {
            "Content-Type": "image/png",
            "Content-Length": base64Data.length
        });
        response.end(base64Data);

        return response;
        //return JSON.stringify(data);
    }

    @Post("/text")
    public async text(@Body() data: HwrDto): Promise<string> {
        const ir = await inkRec(data.strokes);
        return "Text: " + ir;
    }
}
