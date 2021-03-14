let view = [];

view.config = {
    contentPlaceholder: '<!--INSERT_CONTENT_HERE-->',
    headerIDPlaceholder: 'myHeaderID'
};
view.initial = []
view.initial.x;
view.initial.y;

view.drag = function(e) {
    
}

view.drag.start = function(e) {
    view.initial.x = e.clientX;
    view.initial.y = e.clientY;
    console.log(view.initial.x)
    console.log(e.target)
}

view.drag.end = function(e) {

}

view.conditions = function(name, title, content, classes, resizable, width, height) {
    let errorCount = 0;
    if (name === undefined) { name = 'undefined name'; kondaska.console.error('Name was undefined, set to default value'); errorCount++ };
    if (title === undefined) { title = 'undefined title'; kondaska.console.error('Title was undefined, set to default value'); errorCount++ };
    if (content === undefined) { content = ''; kondaska.console.error('Content was undefined, set to default value'); errorCount++ };
    if (classes === undefined) { classes = []; kondaska.console.error('Classes was undefined, set to default value'); errorCount++ };
    if (resizable === undefined) { resizable = true; kondaska.console.error('Resizable was undefined, set to default value'); errorCount++ };
    if (width === undefined) { width = 50; kondaska.console.error('Width was undefined, set to default value'); errorCount++ };
    if (height === undefined) { height = 50; kondaska.console.error('Height was undefined, set to default value'); errorCount++ };
    if (typeof name !== "string") { throw new Error('Name must be a string') };
    if (typeof title !== "string") { throw new Error('Title must be a string') };
    if (typeof content !== "string") { throw new Error('Content must be a string') };
    if (Array.isArray(classes) === false) { throw new Error('Classes must be an array') };
    if (typeof resizable !== "boolean") { throw new Error('Resizable must be a boolean') };
    if (isNaN(width)) { throw new Error('Width must be an interger') };
    if (isNaN(height)) { throw new Error('Height must be an interger') };
    //if (content.includes(view.config.contentPlaceholder) === false) { throw new Error('Content does not include a content placeholder')}
    return errorCount;
};

class View {
    constructor(name, title, content, classes, resizable, width, height) {
        this.errorCount = view.conditions(name, title, content, classes, resizable, width, height);
        this.name = name;
        this.title = title;
        this.content = content;
        this.classes = classes;
        this.resizable = resizable;
        this.width = width;
        this.height = height;
        this.index = system.desktop.window.index;
        this.info = [];
        this.created = false;
        system.desktop.window.index += 1;
    };

    create() {
        let classList = 'view-window ' + this.name + ' ' + this.title;
        for (let i = 0; i < this.classes; i++) {
            classList += ' ' + this.classes[i];
        };
        const id = 'windowIndex-' + this.index;
        const headerID = id + 'header'
        const content = kondaska.files.html.window.replace(view.config.contentPlaceholder, this.content).replace(view.config.headerIDPlaceholder, headerID)
        console.log(content)
        console.log(view.config.contentPlaceholder)
        console.log(this.content)
        const newWindow = document.createElement('div');
        newWindow.setAttribute('id', id);
        newWindow.setAttribute('class', classList);
        newWindow.innerHTML = content;
        document.querySelector('#desktop').appendChild(newWindow);
        this.info.id = id;
        this.info.class = classList;
        this.created = true;
        newWindow.addEventListener('mousedown', view.drag.start, false)
        newWindow.addEventListener('mouseup', view.drag.end, false)
        newWindow.addEventListener('mousemove', view.drag, false)
        if (this.errorCount > 0) { console.warn('While constructing this view, there were ' + this.errorCount + ' non critical errors') };
    };

    close() {
        const element = document.querySelector('div#' + this.info.id);
        element.remove();
        this.created = false;
    };
}