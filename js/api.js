/*
All of the APIs available within Kondaska
This is mostly vanilla JS code, but a but easier to access
*/

const api = [];

// Returns Date object for current time
api.now = _ => { return new Date() };

// Returns local timezone
api.timeZone = _ => { return Intl.DateTimeFormat().resolvedOptions().timeZone };

// Returns formatted date/time in desired format
api.formattedDate = mode => {

    switch (mode) {
        case 'time':
            return api.now().toLocaleString('en-GB', { timeZone: api.timeZone() }).split(' ')[1];
        
        case 'date':
            return api.now().toLocaleString('en-GB', { timeZone: api.timeZone() }).split(' ')[0].slice(0,-1);

        case 'full':
            return api.now().toLocaleString('en-GB', { timeZone: api.timeZone() });

        default:
            return api.now().toLocaleString('en-GB', { timeZone: api.timeZone() });
    };
    
};

// Returns true or false for dark mode from system
api.darkMode = _ => { return window.matchMedia('(prefers-color-scheme: dark)').matches };