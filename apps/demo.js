// Temp demo button
function demoButton() {
    const btn = new TaskButton().create();
    btn.addEventListener('click', _ => {
        newViewDemo()
    })
}

const demoViewContent = document.createElement('div')
const demoHello = document.createElement('h1')
demoHello.innerText = 'Hello'
const demoWorld = document.createElement('p')
demoWorld.innerText = 'world'
demoViewContent.appendChild(demoHello)
demoViewContent.appendChild(demoWorld)

function newViewDemo() {
    thisdemo = new View('myWindowTitle', 'myApp', demoViewContent,{
        resizable: true,
        width: 500,
        height: 500,
    })
    thisdemo.create()
    thisdemo.open()
}