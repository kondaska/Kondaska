/* Apps */
class App {

    ID = api.getUniqueID();

    properties = {
        name: 'MyApp',
        version: '1.0.0',
        description: 'This is my App!',
    };

    sources = {
        js: [], // JS files
        css: [], // CSS files
        dependencies: [], // Install scripts for dependencies
        icon: '', // Icon file
    };

    constructor(properties, sources) {

        if (properties !== undefined) { this.properties = {...this.properties, ...properties} };
        if (sources !== undefined) { this.sources = {...this.sources, ...sources} };

        shell.log(`App ${this.properties.name} v${this.properties.version} has been created!`);

    };

    start = function () {
        shell.error(`Tried to start ${this.properties.name}, but no start function defined!`);
    };

    install() {
        const js = this.sources.js;
        const css = this.sources.css;

        // Load JS
        js.forEach(file => {
            const el = document.createElement('script');
            el.src = file;
            el.async = false;
            el.defer = false;
            document.head.appendChild(el);
        });

        // Load CSS
        css.forEach(file => {
            const el = document.createElement('link');
            el.rel = 'stylesheet';
            el.href = file;
            document.head.appendChild(el);
        });

        // Add to installed apps
        system.apps.push(this);

        shell.log(`App ${this.properties.name} v${this.properties.version} has been installed!`);
    };

    remove() {
        const js = this.sources.js;
        const css = this.sources.css;

        // Remove JS
        js.forEach(file => {
            const el = document.querySelector(`script[src="${file}"]`);
            el.remove();
        });

        // Remove CSS
        css.forEach(file => {
            const el = document.querySelector(`link[href="${file}"]`);
            el.remove();
        });

        // Remove from installed apps
        system.apps = system.apps.find( ({ ID }) => ID === this.ID );
    }

};

/* Apps */
const app = [];

// App installer
app.install = loadScript => {
    const script = document.createElement('script');
    script.src = loadScript;
    document.head.appendChild(script);

    script.remove();
};
