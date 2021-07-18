/* Generic */
const system = [];
system.version = {
    'state': 'Alpha',
    'version': '1.0.0'
};
system.views = [];
system.lastZIndex = 0;


/* Kondaska Shell */
const shell = [];

// Shell log
shell.log = function(msg) {
    console.log(msg);
};

// Shell warn
shell.warn = function(msg) {
    console.error(msg);
};

// Shell error
shell.error = function(msg) {
    console.error(msg);
};


/* Header */
system.header = [];
system.header.display = [];

system.header.display.views = _ => { return document.getElementById('view-count') };
system.header.display.time = _ => { return document.getElementById('time') };

system.header.time = mode => {
    switch (mode) {
        case true:
            system.header.time.interval = setInterval(_ => {
                system.header.display.time().innerText = api.formattedDate('time');
            }, 100);
            break;

        case false:
            clearInterval(system.header.time.interval);
            break;

        default:
            system.header.time(true);
            break;
    };
};


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
        this.positionX = properties.positionX;
        this.positionY = properties.positionY;
        this.data = properties.data;
        this.id = Date.now()
        this.maximized = false

        if (typeof this.resizable !== "boolean") { this.resizable = defaults.viewResize; shell.warn(`Property "resizeable" was not defined or was not a boolean`, 'viewhandler') };
        if (typeof this.width !== "number") { this.width = defaults.viewWidth; shell.warn(`Property "width" was not defined or was not an interger`, 'viewhandler') };
        if (typeof this.height !== "number") { this.height = defaults.viewHeight; shell.warn(`Property "height" was not defined or was not an interger`, 'viewhandler') };
        if (typeof this.positionX !== "number") { this.positionX = defaults.viewX; shell.warn(`Property "positionX" was not defined or was not an interger`, 'viewhandler') };
        if (typeof this.positionY !== "number") { this.positionY = defaults.viewY; shell.warn(`Property "positionX" was not defined or was not an interger`, 'viewhandler') };
        
        system.views.push(this);

        this.memory = {};

    };

    create() {

        // Creating the viewwindow itself

        // Container window
        this.container = document.createElement('div');
        const container = this.container;
        container.classList = 'view container';
        container.style.left = `${this.positionX}px`;
        container.style.top = `${this.positionY}px`;

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
        close.addEventListener('click', _ => { this.close() });
        buttons.appendChild(close);

            // Close button
        const maximize = document.createElement('button');
        maximize.classList = 'view buttons maximize';
        maximize.addEventListener('click', _ => { this.maximize() });
        buttons.appendChild(maximize);

        header.appendChild(buttons);

        let pos = {};

        header.addEventListener('mousedown', evt => {
            evt.preventDefault();
            pos.x = evt.clientX;
            pos.y = evt.clientY;
            this.touch = true;
        });

        document.addEventListener('mouseup', _ => {
            this.touch = false;
        });

        document.addEventListener('mousemove', evt => {
            // Don't move when the mouse isn't down
            if (!this.touch) { return };

            // Don't move when view is maximized
            if (this.maximized) { return };

            evt.preventDefault();

            const style = this.container.style;

            // Horizontal movement
            let left = style.left.slice(0, -2);
            if (style.left === '') { left = 0 };
            left = parseInt(left);
            if (!(left <= 0 && evt.movementX < 0)) {
                style.left = left + (evt.clientX - pos.x) + 'px';
            };

            // Vertical movement
            let top = style.top.slice(0, -2);
            if (style.top === '') { top = 0 };
            top = parseInt(top);
            if (!(top <= window.innerHeight/100 && evt.movementY < 0 || evt.clientY <= window.innerHeight/100)) {
                style.top = top + (evt.clientY - pos.y) + 'px';
            };

            // Resetting position
            pos.x = evt.clientX;
            pos.y = evt.clientY;
        })

        container.appendChild(header);

        // View content
        this.contentContainer = document.createElement('div');
        this.contentContainer.classList = 'view content';
        this.contentContainer.style.width = `${this.width}px`;
        this.contentContainer.style.height = `${this.height}px`;
        this.contentContainer.appendChild(this.content);
        if (!this.resizable) { this.contentContainer.style.resize = 'none' };

        container.appendChild(this.contentContainer);

        container.addEventListener('mousedown', evt => {
            if (this.maximized) { return };
            if (evt.target.tagName === 'BUTTON' && evt.target.className === 'view buttons close') { return };
            this.container.style.zIndex = system.lastZIndex + 1;
            system.lastZIndex++;
        })

        document.getElementsByTagName('main')[0].appendChild(container);

        system.header.display.views().innerText = system.views.length;

    };

    open() { this.container.style.display = 'block'; };

    maximize() {

        switch (this.maximized) {
            
            case false: // Now maximizing

                // Remember the current settings
                this.memory.width = this.contentContainer.style.width;
                this.memory.height = this.contentContainer.style.height;
                this.memory.left = this.container.style.left;
                this.memory.top = this.container.style.top;
                this.memory.resize = this.contentContainer.style.resize;

                // Set to maximized settings
                this.container.style.left = `0`; // Move to the most left
                this.container.style.top = `0`; // Move to most top
                this.container.style.zIndex = 10000001; // Set in front of everything else
                this.container.style.borderRadius = '0'; // Remove rounded corners of outside
                this.container.style.borderWidth = '0'; // Remove outside border

                this.contentContainer.style.resize = 'none'; // Remove ability to resize
                this.contentContainer.style.width = `${window.innerWidth}px`; // Make it as wide as screen
                this.contentContainer.style.height = `${window.innerHeight - 30}px`; // Make it as tall as screen
                this.contentContainer.style.borderRadius = '0'; // Remove the rounded corners of content

                break;

            case true:

                // Return to settings before maximizing
                
                this.container.style.left = this.memory.left; // Set the X position back to previous
                this.container.style.top = this.memory.top; // Set the Y position back to previous
                this.container.style.borderRadius = '16px'; // Add the rounded corners back
                this.container.style.borderWidth = '10px'

                this.contentContainer.style.resize = this.memory.resize; // Set the resize option back to previous
                this.contentContainer.style.width = this.memory.width; // Set width back to previous
                this.contentContainer.style.height = this.memory.height; // Set height back to previous
                this.contentContainer.style.borderRadius = '16px'

                break;

        };

        this.maximized = !this.maximized;

    };

    minimize() { this.container.style.display = 'none'; };

    close() {

        this.container.remove();
        const index = system.views.findIndex( ({ id }) => id === this.id );
        system.views.splice(index, 1);
        system.header.display.views().innerText = system.views.length;
        if (system.views.length === 0) { system.lastZIndex = 0 };

    };
};


/* Taskbar */
const TaskButton = class {
    constructor() {};

    create() {
        const btn = document.createElement('button');
        btn.classList = 'taskbar button';
        document.getElementsByTagName('footer')[0].appendChild(btn);
        return btn;
    };
};

/* Boot / Initiation */

const init = function() {
    document.title += ` | ${system.version.state} ${system.version.version}`;
    system.header.time(true);
};

window.onload = init;