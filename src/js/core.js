let kondaska = [];
let system = [];

system.desktop = [];
system.desktop.window = {
    'index': 0,
    'views': []
}


// Importing prototype files
kondaska.protoFiles = [];
kondaska.protoFiles.html = [
    'assets/prototypes/window.html'
]

kondaska.files = {
    '': '',
}

kondaska.load = {};
kondaska.load.protoFiles = function() {
    for (object in kondaska.protoFiles) {
        const array = kondaska.protoFiles[object]
        kondaska.files[object] = {}
        const target = kondaska.files[object]
        for (let i = 0; i < array.length; i++) {
            const file = array[i]
            const fileName = file.replace('.','/').split('/')
            const fetchFile = fileName[fileName.length - 2]
            fetch(file)
                .then(response => response.text())
                .then(data => target[fetchFile] = data)
        }
    }
}

kondaska.load.protoFiles()