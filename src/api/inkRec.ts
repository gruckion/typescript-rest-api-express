import * as MyScript from "myscript";
import { Strokes } from "../models/Strokes";
import { jixxModelBuilderDto } from "../models/jixxModelBuilder";

const convertBlobToBase64 = (blob: any) =>
    new Promise((resolve, reject) => {
        const reader: any = new FileReader();
        reader.onerror = reject;
        reader.onload = () => {
            resolve(reader.result);
        };
        reader.readAsDataURL(blob);
    });

export const inkRec = async (strokes: Strokes[]) => {
    let interpretatedTextContent: string;
    let interpretatedImageContent: any;

    // Defining the behaviour on recognition result
    const recognitionCallback = (result: any) => {
        Object.entries(result.exports).forEach(([mimeType, exportValue]) => {
            if (mimeType.startsWith("image/")) {
                convertBlobToBase64(exportValue)
                    .then((b64: any) => {
                        interpretatedImageContent = b64;
                    })
                    .catch(error => {
                        // eslint-disable-next-line no-console
                        console.log("Unable to convert to base 64");
                    });
            } else {
                interpretatedTextContent = JSON.stringify(
                    result.exports[mimeType]
                );
            }
        });
    };

    const onClickRecognizeAsync = () => {
        return new Promise((resolve, reject) => {
            const iinkRecognizer = MyScript.DefaultBehaviors.recognizerList.find(
                (x: any) => {
                    const infos = x.getInfo();
                    return (
                        infos.apiVersion === "V4" && infos.protocol === "REST"
                    );
                }
            );

            // Creating a empty model
            const model = MyScript.InkModel.createModel();

            // Filling the model with the stroke groups
            model.strokeGroups = JSON.parse(
                JSON.stringify(jixxModelBuilderDto(strokes))
            );

            // Creating a recognizer context with the configuration attached
            const recognizerContext = MyScript.RecognizerContext.createEmptyRecognizerContext(
                {
                    configuration: MyScript.DefaultConfiguration
                }
            );

            //const mimeType = 'application/vnd.myscript.jiix';
            const requestedMimeType = ["text/plain", "image/png"];
            recognizerContext.editor.configuration.recognitionParams.protocol =
                "REST";
            recognizerContext.editor.configuration.recognitionParams.v4.text.mimeTypes = requestedMimeType;
            recognizerContext.editor.configuration.recognitionParams.server = {
                scheme: "https",
                host: "webdemoapi.myscript.com",
                applicationKey: "8bb3b361-d81d-4aef-8a32-56fc3e0cd1dc",
                hmacKey: "4a86f94d-ad5a-4e24-88d8-623922fa890a"
            };

            // Assigning a theme to the document
            recognizerContext.editor.theme = MyScript.DefaultTheme;

            // Triggering the recognition
            iinkRecognizer.export_(recognizerContext, model, (err, result) => {
                if (result) {
                    resolve(result);
                } else {
                    reject(err);
                }
            });
        });
    };

    try {
        var result = await onClickRecognizeAsync();
        recognitionCallback(result);
    } catch (ex) {
        // eslint-disable-next-line no-console
        console.error(ex);
    }

    return interpretatedTextContent;
};
