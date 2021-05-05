// Temp demo button
function demoButton() {
    const btn = new TaskButton().create();
    btn.addEventListener('click', _ => {
        newViewDemo()
    })
}

function newViewDemo() {
    thisdemo = new View('myWindowTitle', 'myApp', '',{
        resizable: true,
        width: 50,
        height: 50,
    })
    thisdemo.create()
    thisdemo.open()
}