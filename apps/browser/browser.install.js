import { App } from '../../core/App.js';

function install() {

    const properties = {
        name: 'Browser',
        description: 'Kondaska Browser',
        version: '1.0.0',
    };

    const sources = {
        js: [
            'apps/browser/browser.app.js',
        ],
    };

    const app = new App(properties, sources);
    app.install(_ => {
        // Initialize the app
        app.initialize(browserApp, 'start');
    });
};

install();