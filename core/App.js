import * as shell from './shell.js';
import * as api from './api.js';
import { TaskButton } from './TaskButton.js';
import { StartmenuItem } from '../js/startmenu.js';


/* Apps */
export class App {

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

        if (this.sources.icon === '') { this.sources.icon = './assets/default-icon.svg' };

        shell.log(`App ${this.properties.name} v${this.properties.version} has been created!`);

    };

    start = function () {
        shell.error(`No start script defined for app`);
    };

    install(callback) {
        const js = this.sources.js;
        const css = this.sources.css;

        // Load JS
        let notLoaded = [];
        let loaded = [];
        js.forEach(file => {
            const el = document.createElement('script');
            el.src = file;
            el.type = 'module';
            el.async = false;
            el.defer = false;
            document.head.appendChild(el);
            notLoaded.push(el);
            el.onload = _ => {
                notLoaded.splice(notLoaded.indexOf(el), 1);
                loaded.push(el)
            }
        });

        // Load CSS
        css.forEach(file => {
            const el = document.createElement('link');
            el.rel = 'stylesheet';
            el.href = file;
            document.head.appendChild(el);
        });

        notLoaded.forEach(el => {
            el.addEventListener('load', _ => {
                if (loaded.length === js.length) {

                    // All scripts loaded
                    if (callback !== undefined) { callback() }
                    else { shell.error(`Callback not defined; Load script for ${this.properties.name}`) }

                    // Add to installed apps
                    
                    system.apps.push(this);

                    shell.log(`App ${this.properties.name} v${this.properties.version} has been installed!`);

                };
            });
        });       
    };

    initialize(object, startFunc) {
        this.start = object[startFunc];
        const taskbutton = new TaskButton(this);
        taskbutton.create();
        const menuItem = new StartmenuItem(this);
    };

    remove() {
        const js = this.sources.js;
        const css = this.sources.css;

        // Remove JS
        // TODO: SHOULD USE ES6 IMPORTS
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