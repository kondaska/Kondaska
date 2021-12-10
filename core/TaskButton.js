/* Taskbar */
export class TaskButton {

    constructor(app) {
        
        this.app = app;
        this.start = app.start;

    };

    create() {
        const btn = document.createElement('button');
        btn.classList = 'taskbar button';
        btn.addEventListener('click', _ => { this.start() })
        document.getElementsByTagName('footer')[0].appendChild(btn);
        return btn;
    };

};