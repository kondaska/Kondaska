// Returns Date object for current time
export function now() { return new Date() };

// Returns local timezone
export function timeZone() { return Intl.DateTimeFormat().resolvedOptions().timeZone };

// Returns formatted date/time in desired format
export function formattedDate(mode) {

    switch (mode) {
        case 'time':
            return now().toLocaleString('en-GB', { timeZone: timeZone() }).split(' ')[1];
        
        case 'date':
            return now().toLocaleString('en-GB', { timeZone: timeZone() }).split(' ')[0].slice(0,-1);

        case 'full':
            return now().toLocaleString('en-GB', { timeZone: timeZone() });

        default:
            return now().toLocaleString('en-GB', { timeZone: timeZone() });
    };
    
};

// Returns true or false for dark mode from system
export function darkMode() { return window.matchMedia('(prefers-color-scheme: dark)').matches };

// Get a unique ID for anything
export function getUniqueID() { return system.lastID++ };

// Installs an app
export function installApp(appLoader) {
    const script = document.createElement('script');
    script.type = 'module';
    script.src = appLoader;
    document.head.appendChild(script);

    script.remove();
};