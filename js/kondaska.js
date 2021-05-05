/* Generic */
const system = [];
system.version = {
    'state': 'Alpha',
    'version': '1.0.0'
}
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
        // Creating the viewwindow itself

        // Container window
        this.container = document.createElement('div');
        const container = this.container;
        container.classList = 'view container';

        // View header
        const header = document.createElement('div');
        header.classList = 'view header';

        const headerText = document.createElement('p');
        headerText.style.margin = 0;
        headerText.width = '90%';

            // Title
        const name = document.createElement('span');
        name.classList = 'view header';
        name.innerText = this.name;
        headerText.appendChild(name);

        headerText.innerHTML += ' - ';

            // App name
        const app = document.createElement('span');
        name.classList = 'view header';
        app.innerText = this.app;
        headerText.appendChild(app);

        header.appendChild(headerText);

            // Buttons
        const buttons = document.createElement('p');
        buttons.classList = 'view button-container';

            // Close button
        const close = document.createElement('button');
        close.classList = 'view buttons close';
        close.addEventListener('click', _ => { this.close () })
        buttons.appendChild(close);

        header.appendChild(buttons);

        header.addEventListener('mousedown', evt => {
            evt.preventDefault()
            this.touch = true;
        });

        document.addEventListener('mouseup', _ => {
            this.touch = false;
        });

        document.addEventListener('mousemove', evt => {
            if (!this.touch) { return };

            evt.preventDefault()

            const style = this.container.style;

            // Horizontal movement
            let left = style.left.slice(0, -2);
            if (style.left === '') { left = 0 };
            left = parseInt(left);
            style.left = left + evt.movementX + 'px';

            // Vertical movement
            let top = style.top.slice(0, -2);
            if (style.top === '') { top = 0 };
            top = parseInt(top);
            style.top = top + evt.movementY + 'px';
        })

        container.appendChild(header);

        // View content
        const content = document.createElement('div');
        content.classList = 'view content';
        content.style.width = this.width;
        content.style.height = this.height;
        if (!this.resizable) { content.style.resize = 'none' };

        container.appendChild(content);

        document.getElementsByTagName('main')[0].appendChild(container);
    };

    open() {
        this.container.style.display = 'block';
        this.container.style.position = 'absolute';
    };

    minimize() {
        this.container.style.display = 'none';
    };

    close() {
        this.container.remove();
    };
};

/* Boot */

const init = function() {
    document.title += ` | ${system.version.state} ${system.version.version}`;
};

window.onload = init;