let view = [];

view.config = {
    contentPlaceholder: '<!--INSERT_CONTENT_HERE-->',
    headerIDPlaceholder: 'myHeaderID'
};

view.drag = function(e, id) {
    if (!view.drag.active) { return }
    const transX = e.clientX - view.drag.initialX
    const transY = e.clientY - view.drag.initialY
    console.log(`(${transX}, ${transY})`)
    view.drag.move(id, transX, transY)
}

view.drag.start = function(e, id) {
    view.drag.initialX = e.clientX;
    view.drag.initialY = e.clientY;
    console.log(view.drag.initialX)
    view.drag.active = true;
    view.drag.item = document.querySelector(`div#${id}`)
    console.log(view.drag.item)
}

view.drag.stop = function(e, id) {
    view.drag.initialX = view.drag.currentX;
    view.drag.initialY = view.drag.currentY;
    view.drag.active = false;
}

view.drag.move = function(id, x, y) {
    const el = document.querySelector(`div#${id}`).style
    marginX = (el.marginLeft.split(''))
    console.log(marginX)
    const transX = `${marginX + x}px`
    const transY = `${el.marginTop + y}px`
    console.log(`${id}: (${transX}, ${transX})`)
    /*
    el.marginLeft = transX;
    el.marginTop = transY
    */
}

view.drag.active = false;
view.drag.offsetX = 0;
view.drag.offsetY = 0;

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
        const headerID = `${id}-header`
        const content = kondaska.files.html.window.replace(view.config.contentPlaceholder, this.content).replace(view.config.headerIDPlaceholder, headerID)
        const newWindow = document.createElement('div');
        newWindow.setAttribute('id', id);
        newWindow.setAttribute('class', classList);
        newWindow.innerHTML = content;
        document.querySelector('#desktop').appendChild(newWindow);
        this.info.id = id;
        this.info.class = classList;
        this.created = true;
        /*
        document.querySelector(`div#${headerID}`).addEventListener('mousedown', view.drag.start)
        document.querySelector(`div#${headerID}`).addEventListener('mousemove', view.drag)
        document.querySelector(`div#${headerID}`).addEventListener('mouseup', view.drag.stop)
        */
        document.querySelector(`div#${headerID}`).addEventListener('mousedown', evt => { view.drag.start(evt, this.info.id) })
        document.querySelector(`div#${headerID}`).addEventListener('mouseup', evt => { view.drag.stop(evt, this.info.id) })
        document.querySelector(`div#${headerID}`).addEventListener('mousemove', evt => { view.drag(evt, this.info.id) })
        document.querySelector(`div#${id} button.window.buttons.close`).addEventListener('click', _ => { this.close() })
        if (this.errorCount > 0) { console.warn('While constructing this view, there were ' + this.errorCount + ' non critical errors') };
    };

    close() {
        const element = document.querySelector('div#' + this.info.id);
        element.remove();
        this.created = false;
        kondaska.console.log(`Succesfully closed ${this.name} - ${this.title}`)
    };
}