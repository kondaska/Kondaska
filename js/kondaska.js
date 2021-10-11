/* Generic */
const system = [];
system.version = {
    'state': 'Alpha',
    'version': '1.0.0'
};
system.views = [];
system.lastZIndex = 0;

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

/* Boot / Initiation */

const init = function() {
    document.title += ` | ${system.version.state} ${system.version.version}`;
    system.header.time(true);
};

window.onload = init;