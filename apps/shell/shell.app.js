import { defaults } from "../../core/config.js";
import { memory } from "../../core/shell.js";
import { View } from "../../core/View.js";

// App object
const shellApp = [];

shellApp.newLine = evt => {
    const line = document.createElement('p');
    line.classList.add('shell-line');
    const type = document.createElement('span');
    type.classList.add('shell-type');
    type.dataset.type = evt.type;
    type.innerText = evt.type.toUpperCase();
    const spacer = document.createElement('span');
    spacer.innerText = ' ';
    const message = document.createElement('span');
    message.classList.add('shell-message');
    message.innerText = evt.data;
    line.appendChild(type);
    line.appendChild(spacer);
    line.appendChild(message);
    return line
}

shellApp.create = _ => {
    const lines = []
    memory.forEach(line => {
        lines.push(shellApp.newLine(line))
    })
    const content = document.createElement('div');
    content.classList.add('shell-content');
    lines.forEach(line => { content.appendChild(line) });
    return content
}


// Start function
shellApp.start = _ => {

    const properties = {
        resizable: true,
        width: defaults.viewWidth,
        height: defaults.viewHeight,
        positionX: defaults.viewX,
        positionY: defaults.viewY,
    }

    const content = shellApp.create();

    const view = new View('output', 'Shell', content, properties);
    view.show();

};

window.shellApp = shellApp;