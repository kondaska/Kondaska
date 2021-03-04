let kondaska = [];
let system = [];

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
        kondaska.files[object] = ''
        const target = kondaska.files[object]
        console.log(target)
        for (let i = 0; i < array.length; i++) {
            const file = array[i]
            console.log(file)
            const fileName = file.replace('.','/').split('/')
            const fetchFile = fileName[fileName.length - 2]
            console.log(fetchFile)
            fetch(file)
                .then(response => response.text())
                .then(data => target[fetchFile] = data)
        }
    }
}

kondaska.load.protoFiles()