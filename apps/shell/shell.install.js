import { App } from '../../core/App.js';

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
        css: [
            'apps/shell/shell.css',
        ],
    };

    const app = new App(properties, sources);
    app.install(_ => {
        // Initialize the app
        app.initialize(shellApp, 'start');
    });
};

install();