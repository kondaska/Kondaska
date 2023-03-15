import { defaults } from "../../core/config.js";
import { View } from "../../core/View.js";

const browserApp = []

browserApp.create = _ => {
    const frame = document.createElement('iframe');
    frame.src = 'https://google.com'
    return frame;
};

// Start function
browserApp.start = _ => {

    const properties = {
        resizable: true,
        width: defaults.viewWidth,
        height: defaults.viewHeight,
        positionX: defaults.viewX,
        positionY: defaults.viewY,
    }

    const content = browserApp.create();

    const view = new View('New Tab', 'Browser', content, properties);
    view.show();

};

window.browserApp = browserApp;