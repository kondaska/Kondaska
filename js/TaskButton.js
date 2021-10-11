/* Taskbar */
const TaskButton = class {

    constructor(app) {
        
        this.app = app;

    };

    create() {
        const btn = document.createElement('button');
        btn.classList = 'taskbar button';
        btn.addEventListener('click', this.app.start)
        document.getElementsByTagName('footer')[0].appendChild(btn);
        return btn;
    };

};