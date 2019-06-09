export const RecognizerContext = MyScript =>
    MyScript.RecognizerContext.createEmptyRecognizerContext({
        configuration: {
            recognitionParams: {
                ...MyScript.DefaultConfiguration.recognitionParams,
                protocol: "REST",
                v4: {
                    ...MyScript.DefaultConfiguration.recognitionParams.v4,
                    text: {
                        ...MyScript.DefaultConfiguration.recognitionParams.v4
                            .text,
                        mimeTypes: ["text/plain", "image/png"]
                    }
                },
                server: {
                    ...MyScript.DefaultConfiguration.recognitionParams.server,
                    scheme: "https",
                    host: "webdemoapi.myscript.com",
                    applicationKey: "8bb3b361-d81d-4aef-8a32-56fc3e0cd1dc",
                    hmacKey: "4a86f94d-ad5a-4e24-88d8-623922fa890a"
                }
            }
        },
        theme: {
            // Assigning a theme to the document
            ...MyScript.DefaultTheme
        }
    });
