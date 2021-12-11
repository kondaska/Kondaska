const startmenu = [];

startmenu.items = [];

startmenu.getItems = _ => {
    const elements = [];

    startmenu.items.forEach(item => {
        const el = document.createElement('div');

        el.addEventListener('click', _ => { startmenu.close(); item.start() });

        el.classList.add('startmenu-item');

        const icon = document.createElement('img');
        icon.src = './assets/default-icon.png';
        if (!item.icon) {};

        el.appendChild(icon);

        const name = document.createElement('p');
        name.innerText = item.name;

        el.appendChild(name);

        elements.push(el);

    });

    return elements;

}

startmenu.create = _ => {
    let container = document.getElementById('startmenu');
    if (!container) { container = document.createElement('div') };
    container.id = 'startmenu';
    container.style.display = 'none';

    const items = document.createElement('div');
    items.id = 'startmenu-items';
    items.style.display = 'flex';

    container.innerHTML = '';
    startmenu.getItems().forEach(item => {
        items.appendChild(item);
    });
    
    container.appendChild(items);

    document.body.appendChild(container);

};

startmenu.open = _ => {
    startmenu.create();
    const container = document.getElementById('startmenu');
    container.style.display = 'block';
    container.style.animation = 'startmenu-open 0.5s';
    container.style.animationFillMode = 'forwards';
    container.style.animationTimingFunction = 'ease-in-out';
};

startmenu.close = _ => {
    const startmenu = document.getElementById('startmenu');
    startmenu.style.animation = 'startmenu-close 0.5s';
    startmenu.style.animationFillMode = 'forwards';
    startmenu.style.animationTimingFunction = 'ease-in-out';
    setTimeout(_ => {
        startmenu.style.display = 'none';
    }, 500);
};

// Starmenu item class
export class StartmenuItem {
    constructor(app) {
        this.name = app.properties.name;
        this.icon = app.sources.icon;
        this.app = app;
        this.start = app.start;

        startmenu.items.push(this);
    }
}

window.startmenu = startmenu;