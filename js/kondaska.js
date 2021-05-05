/* Generic */
const system = [];

system.views = [];

/* Kondaska Shell */
const shell = [];

// Shell log
shell.log = function(msg) {
    console.log(msg)
}

// Shell warn
shell.warn = function(msg) {
    console.error(msg)
}

// Shell error
shell.error = function(msg) {
    console.error(msg)
}

/* Views (window) */
class View {
    constructor(name, app, content, properties) {

        if (typeof properties !== 'object') { throw new Error(`Properties is not an object or not defined`) };

        this.name = name;
        this.app = app;
        this.content = content;
        this.resizable = properties.resizable;
        this.width = properties.width;
        this.height = properties.height;
        this.data = properties.data;

        if (typeof this.resizable !== "boolean") { this.resizable = defaults.viewResize; shell.warn(`Property "resizeable" was not defined or was not a boolean`, 'viewhandler') };
        if (typeof this.width !== "number") { this.width = defaults.viewWidth; shell.warn(`Property "width" was not defined or was not an interger`, 'viewhandler') };
        if (typeof this.height !== "number") { this.width = defaults.viewHeight; shell.warn(`Property "height" was not defined or was not an interger`, 'viewhandler') };;

    };

    create() {
        // Creating the window itself

        // Container window
        const container = document.createElement('div');
        container.classList = 'view container'

        // View header
        const header = document.createElement('div');
        header.classList = 'view header';

        const headerText = document.createElement('p');
        headerText.style.margin = 0;
        headerText.width = '90%'

            // Title
        const name = document.createElement('span');
        name.classList = 'view header';
        name.innerText = this.name;
        headerText.appendChild(name)

        headerText.innerHTML += ' - ';

            // App name
        const app = document.createElement('span');
        name.classList = 'view header';
        app.innerText = this.app;
        headerText.appendChild(app)

        header.appendChild(headerText)

        container.appendChild(header)

        document.getElementsByTagName('main')[0].appendChild(container)
    }
};