import { App } from '../../core/App.js';
import { TaskButton } from '../../core/TaskButton.js';

function install() {

    const properties = {
        name: 'Shell',
        description: 'Kondaska Shell',
        version: '1.0.0',
    };

    const sources = {
        js: [
            'apps/shell/shell.app.js',
        ],
    };

    const app = new App(properties, sources);
    app.install(_ => {
        // Set a start function
        app.initialize(shellApp, 'start');
        const button = new TaskButton(app);
        button.create();
    });
};

install();