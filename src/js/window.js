let view = []

class View {
    constructor(name, title, content, classes) {
        this.name = name;
        this.title = title;
        this.content = content;
        this.classes = classes;
    }

    create() {
        const newWindow = document.createElement('div');
        newWindow.setAttribute('class', 'window');
        newWindow.setAttribute('class', this.name)
        newWindow.innerHTML = content;
        if (this.classes !== undefined) {
            for (let i = 0; i < this.classes.length; i++) {
                newWindow.setAttribute('class', this.classes[i])
            };
        };
        document.querySelector('#desktop').appendChild(newWindow);
    }

    close() {

    }
}

/*
view.open = function(name, content) {
    const newWindow = document.createElement('div')
    newWindow.setAttribute('class', 'window')
    newWindow.setAttribute('class', name)
    newWindow.innerHTML = content;
    document.querySelector('#desktop').appendChild(newWindow)
}
*/