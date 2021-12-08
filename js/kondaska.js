/* Generic */
const system = [];
system.version = {
    'state': 'Alpha',
    'version': '1.0.0'
};
system.views = [];
system.apps = [];
system.lastZIndex = 0;
system.lastID = 0;
system.user = 'User';

/* Boot screen */
system.boot = skipLogin => {

    if (skipLogin === 'true') { skipLogin = true; } else { skipLogin = false; };

    window.onload = _ => {

        // Clear body
        document.body.innerHTML = '';

        // Build modal
        const container = document.createElement('div');

        const modal = document.createElement('div');
        modal.id = 'modal';
        container.appendChild(modal);

        const title = document.createElement('h1');
        title.innerText = 'Enter your name';


        const input = document.createElement('input');
        input.id = 'name';

        const button = document.createElement('button');
        button.innerText = 'Confirm';
        button.addEventListener('click', _ => {
            system.user = input.value || system.user;
            document.getElementById('login-css').remove();
            modal.remove();
            system.build();
            document.title += ` | ${system.version.state} ${system.version.version}`;
            system.header.time(true);
        })

        if (skipLogin) { button.click() };

        input.addEventListener('keydown', evt => {
            if (evt.key === 'Enter') {
                button.click();
            }
        })

        modal.appendChild(title);
        modal.appendChild(input);
        modal.appendChild(button);

        // Append to body
        document.body.appendChild(container);

        // Focus on input
        input.focus();

    };

}

/* Build page */
system.build = function() {

    // Clear body
    document.body.innerHTML = '';

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
    headerUser.innerText = system.user;
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

system.boot((new URL(document.location)).searchParams.get('skipLogin'));
