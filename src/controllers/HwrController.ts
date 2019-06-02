import { Controller, Get } from "routing-controllers";

@Controller()
export class HwrController {
    @Get("/text")
    public text = () => {
        return "Hello Express";
    };
}
