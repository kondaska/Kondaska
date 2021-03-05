let view = [];

view.config = {
    contentPlaceholder: '<!--INSERT_CONTENT_HERE-->'
};

view.conditions = function(name, title, content, classes, resizable, width, height) {
    let errorCount = 0;
    if (name === undefined) { name = 'undefined name'; console.error('Name was undefined, set to default value'); errorCount++ };
    if (title === undefined) { title = 'undefined title'; console.error('Title was undefined, set to default value'); errorCount++ };
    if (content === undefined) { content = ''; console.error('Content was undefined, set to default value'); errorCount++ };
    if (classes === undefined) { classes = []; console.error('Classes was undefined, set to default value'); errorCount++ };
    if (resizable === undefined) { resizable = true; console.error('Resizable was undefined, set to default value'); errorCount++ };
    if (width === undefined) { width = 50; console.error('Width was undefined, set to default value'); errorCount++ };
    if (height === undefined) { height = 50; console.error('Height was undefined, set to default value'); errorCount++ };
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
        const content = kondaska.files.html.window.replace(view.config.contentPlaceholder, this.content)
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
        if (this.errorCount > 0) { console.warn('While constructing this view, there were ' + this.errorCount + ' non critical errors') };
    };

    close() {
        const element = document.querySelector('div#' + this.info.id);
        element.remove();
        this.created = false;
    };
}