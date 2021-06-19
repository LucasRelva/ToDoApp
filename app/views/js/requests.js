let input = document.querySelector('#taskInput')
let list = document.querySelector('.todo-list')
let filters = document.querySelector('.filters')
let clearButton = document.querySelector('.clear-completed')
let taskCount = document.querySelector('.todo-count')

function loadActiveTasks() {
    axios.get('/task/active').then((res) => {
        list.innerHTML = ' <ul class="todo-list"></ul>'
        const resData = res.data.rows

        for (task of resData) {
            list.innerHTML += `<li data-id="1624110390239" class="">
            <div class="view">
            <input class="toggle" type="checkbox">
            <label>${task.name}</label>
            <button class="destroy">
            </button></div>
            </li>`
        }
    })
}

function loadCompletedTasks() {
    axios.get('/task/completed').then((res) => {
        list.innerHTML = ' <ul class="todo-list"></ul>'
        const resData = res.data

        for (task of resData) {
            list.innerHTML += `<li data-id="1624110390239" class="completed">
            <div class="view">
            <input class="toggle" type="checkbox" checked>
            <label>${task.name}</label>
            <button class="destroy">
            </button></div>
            </li>`
        }
    })
}


function loadTasks() {
    axios.get('/task').then((res) => {
        list.innerHTML = ' <ul class="todo-list"></ul>'
        const resData = res.data
        clearButton.style.display = 'none'

        getCount()

        for (task of resData) {

            if (!task.isActive) {
                list.innerHTML += `<li id="${task.id}" class="completed">
                    <div class="view">
                    <input class="toggle" type="checkbox" checked>
                    <label>${task.name}</label>
                    <button class="destroy">
                    </button></div>
                    </li>`

                clearButton.style.display = 'block'

                continue
            }

            list.innerHTML += `<li id="${task.id}" class="">
                    <div class="view">
                    <input class="toggle" type="checkbox">
                    <label>${task.name}</label>
                    <button class="destroy">
                    </button></div>
                    </li>`
        }
    })
}


input.addEventListener('keyup', (event) => {
    if (event.keyCode == 13) {
        const taskName = event.target.value

        axios.post('/task', {
            name: taskName
        }).then(() => {
            if (window.location.pathname == '/active/') {
                getCount()
                loadActiveTasks()
            }
            else if (window.location.pathname == '/completed/') {
                getCount()
                loadCompletedTasks()
            } else {
                loadTasks()
            }
        }).catch(err => {
            console.log('Error when posting task into the db!' + err)
        })
    }
})

function getCount() {
    axios.get('/task/active').then((res) => {
        const count = res.data.count
        taskCount.innerHTML = '<span class="todo-count"></span>'

        taskCount.innerHTML += `<strong>${count}</strong> items left`
    })
}

if (window.location.pathname == '/active/') {
    filters.children[1].children[0].classList.add('selected')
    filters.children[0].children[0].classList.remove('selected')
    filters.children[2].children[0].classList.remove('selected')

    getCount()
    loadActiveTasks()
}
else if (window.location.pathname == '/completed/') {
    filters.children[1].children[0].classList.remove('selected')
    filters.children[0].children[0].classList.remove('selected')
    filters.children[2].children[0].classList.add('selected')

    getCount()
    loadCompletedTasks()
} else {
    filters.children[1].children[0].classList.remove('selected')
    filters.children[0].children[0].classList.add('selected')
    filters.children[2].children[0].classList.remove('selected')

    loadTasks()
}
