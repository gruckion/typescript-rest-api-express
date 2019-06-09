import { Strokes } from "../models/Strokes";

export const jixxModelBuilderDto = (strokes: Strokes[]) => {
    return [
        {
            penStyle: {},
            strokes: strokes.map(s => ({
                ...s,
                ...{
                    type: "stroke",
                    width: 1.8897637795275593,
                    pointerType: "mouse",
                    pointerId: 1,
                    color: "#000000",
                    "-myscript-pen-width": 1,
                    "-myscript-pen-fill-style": "none",
                    "-myscript-pen-fill-color": "#FFFFFF00"
                }
            }))
        }
    ];
};
