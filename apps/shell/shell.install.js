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
    app.install();
    
    // Set start function
    app.start = shellApp.start;

};

install();