import { Controller, Post, Get, Param, Body } from "routing-controllers";

@Controller()
export class HwrController {
    @Post("/text")
    public text(@Body() strokes: Strokes) {
        return JSON.stringify(strokes);
    }
}
