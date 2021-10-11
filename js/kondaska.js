/* Generic */
const system = [];
system.version = {
    'state': 'Alpha',
    'version': '1.0.0'
};
system.views = [];
system.lastZIndex = 0;

/* Build page */
system.build = function() {

    // Build header
    const header = document.createElement('header');
    header.id = 'header';

    const headerInfo = document.createElement('div');
    headerInfo.id = 'header-info';
    header.appendChild(headerInfo);

    const headerHome = document.createElement('p');
    headerHome.id = 'header-home';
    headerHome.innerText = 'Home';
    headerInfo.appendChild(headerHome);

    const headerTime = document.createElement('p');
    headerTime.id = 'header-time';
    headerInfo.appendChild(headerTime);

    const headerUser = document.createElement('p');
    headerUser.id = 'header-user';
    headerInfo.appendChild(headerUser);

    // Desktop
    const desktop = document.createElement('main');
    desktop.id = 'desktop';

    // Taskbar
    const taskbar = document.createElement('footer');

    // Append to body
    document.body.appendChild(header);
    document.body.appendChild(desktop);
    document.body.appendChild(taskbar);

};

/* Header */
system.header = [];
system.header.display = [];

system.header.display.views = _ => { return document.getElementById('header-view-count') };
system.header.display.time = _ => { return document.getElementById('header-time') };

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

/* Boot / Initiation */

const init = function() {
    system.build();
    document.title += ` | ${system.version.state} ${system.version.version}`;
    system.header.time(true);
};

window.onload = init;