import { Request, Response } from "express";

export class HwrController {
    public static text = async (req: Request, res: Response) => {
        res.send("Hello Express");
    };
}
