/* Taskbar */
export class TaskButton {

    constructor(app) {
        
        this.app = app;
        this.start = app.start;
        
    };

    create() {
        const startFunc = this.start;
        const btn = document.createElement('button');
        btn.classList = 'taskbar button';
        btn.addEventListener('click', _ => { startFunc() })
        document.getElementsByTagName('footer')[0].appendChild(btn);
        return btn;
    };

};