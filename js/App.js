/* Apps */
class App {

    properties = {
        name: 'MyApp',
        version: '1.0.0',
        description: 'This is my App!',
    };

    sources = {
        js: [],
        css: [],
        icon: '',
    };

    constructor(properties, sources) {

        if (properties !== undefined) { this.properties = {...this.properties, ...properties} };
        if (sources !== undefined) { this.sources = {...this.sources, ...sources} };

    };

    start = function () {
        shell.error(`Tried to start ${this.properties.name}, but no start function defined!`);
    };

    load() {
        const js = this.sources.js;
        const css = this.sources.css;

        // Load JS
        js.forEach(file => {
            const el = document.createElement('script');
            el.src = file;
            document.head.appendChild(el);
        });

        // Load CSS
        css.forEach(file => {
            const el = document.createElement('link');
            el.rel = 'stylesheet';
            el.href = file;
            document.head.appendChild(el);
        });
    };

};