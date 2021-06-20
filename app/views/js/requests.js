let input = document.querySelector('#taskInput')
let list = document.querySelector('.todo-list')
let filters = document.querySelector('.filters')
let clearButton = document.querySelector('.clear-completed')
let taskCount = document.querySelector('.todo-count')

function checkCompleted() {
    axios.get('/task/check').then((res) => {
        const resData = res.data
        clearButton.style.display = 'none'

        if (resData.check) {
            clearButton.style.display = 'block'
        }

    }).catch(err => {
        console.log('Error checking completed tasks' + err)
    })

    return
}

function loadActiveTasks() {
    axios.get('/task/active').then((res) => {
        list.innerHTML = ' <ul class="todo-list"></ul>'
        const resData = res.data.rows

        for (task of resData) {
            list.innerHTML += `<li id="${task.id}" class="" ondblclick="updateName(${task.id})">
            <div class="view">
            <input class="toggle" onclick="updateTask(${task.id})" type="checkbox">
            <label>${task.name}</label>
            <button class="destroy" onclick="delTask(${task.id})">
            </button></div>
            </li>`
        }
    }).catch(err => {
        console.log('Error when loading active tasks' + err)
    })
    return
}

function loadCompletedTasks() {
    axios.get('/task/completed').then((res) => {
        list.innerHTML = ' <ul class="todo-list"></ul>'
        const resData = res.data

        for (task of resData) {
            list.innerHTML += `<li id="${task.id}" class="completed" ondblclick="updateName(${task.id})">
            <div class="view">
            <input class="toggle" onclick="updateTask(${task.id})" type="checkbox" checked>
            <label>${task.name}</label>
            <button class="destroy" onclick="delTask(${task.id})">
            </button></div>
            </li>`
        }
    }).catch(err => {
        console.log('Error when loading completed tasks' + err)
    })
    return
}

function loadTasks() {
    axios.get('/task').then((res) => {
        list.innerHTML = ' <ul class="todo-list"></ul>'
        const resData = res.data

        getCount()

        for (task of resData) {

            if (!task.isActive) {
                list.innerHTML += `<li id="${task.id}" class="completed" ondblclick="updateName(${task.id})">
                    <div class="view">
                    <input class="toggle" onclick="updateTask(${task.id})" type="checkbox" checked>
                    <label>${task.name}</label>
                    <button class="destroy" onclick="delTask(${task.id})">
                    </button></div>
                    </li>`
                continue
            }

            list.innerHTML += `<li id="${task.id}" class="" ondblclick="updateName(${task.id})">
                    <div class="view">
                    <input class="toggle" onclick="updateTask(${task.id})" type="checkbox">
                    <label>${task.name}</label>
                    <button class="destroy" onclick="delTask(${task.id})">
                    </button></div>
                    </li>`
        }
    }).catch(err => {
        console.log('Error when loading tasks' + err)
    })
    return
}

function updateName(id, name) {
    let listEle = document.getElementById(`${id}`)
    listEle.classList.add('editing')
    listEle.innerHTML += '<input class="edit" autofocus>'
    listEle.ondblclick = ' '

    let nameInput = document.querySelector('.edit')

    var clickHandler = (event) => {
        let clickedInside = listEle.contains(event.target);

        if (!clickedInside) {
            // nameInput.remove()
            // listEle.classList.remove('editing')

            if (window.location.pathname == '/active/') {
                getCount()
                loadActiveTasks()
                checkCompleted()
            }
            else if (window.location.pathname == '/completed/') {
                getCount()
                loadCompletedTasks()
                checkCompleted()
            } else {
                loadTasks()
                checkCompleted()
            }

            document.removeEventListener('click', clickHandler)
        }
    }

    document.addEventListener('click', clickHandler)

    nameInput.addEventListener('keyup', (event) => {
        if (event.keyCode == 13) {
            const taskName = event.target.value

            axios.put('/task/name/' + id, {
                name: taskName
            }).then(() => {
                if (window.location.pathname == '/active/') {
                    getCount()
                    loadActiveTasks()
                    checkCompleted()
                }
                else if (window.location.pathname == '/completed/') {
                    getCount()
                    loadCompletedTasks()
                    checkCompleted()
                } else {
                    loadTasks()
                    checkCompleted()
                }

            }).catch(err => {
                console.log('Error when updating task name!' + err)
            })
        }
    })

    return
}

function clearCompletedTasks() {
    axios.delete('/task').then((res) => {

        if (window.location.pathname == '/active/') {
            getCount()
            loadActiveTasks()
            checkCompleted()
        }
        else if (window.location.pathname == '/completed/') {
            getCount()
            loadCompletedTasks()
            checkCompleted()
        } else {
            loadTasks()
            checkCompleted()
        }

        return res.status(200)
    }).catch(err => {
        console.log('Error when clearing completed tasks' + err)
    })
    return
}

function updateTask(id) {
    axios.put('/task/' + id).then(() => {
        if (window.location.pathname == '/active/') {
            getCount()
            loadActiveTasks()
            checkCompleted()
        }
        else if (window.location.pathname == '/completed/') {
            getCount()
            loadCompletedTasks()
            checkCompleted()
        } else {
            loadTasks()
            checkCompleted()
        }
    }).catch(err => {
        console.log('Error when updating the task status' + err)
    })
    return
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
                checkCompleted()
            }
            else if (window.location.pathname == '/completed/') {
                getCount()
                loadCompletedTasks()
                checkCompleted()
            } else {
                loadTasks()
                checkCompleted()
            }

            input.value = ''
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
    return
}

function delTask(id) {
    axios.delete('/task/' + id).then((res) => {

        if (window.location.pathname == '/active/') {
            getCount()
            loadActiveTasks()
            checkCompleted()
        }
        else if (window.location.pathname == '/completed/') {
            getCount()
            loadCompletedTasks()
            checkCompleted()
        } else {
            loadTasks()
            checkCompleted()
        }

        return res.status(200)
    }).catch(err => {
        console.log('Error when deleting task' + err)
    })
    return
}

function updateAll() {
    axios.put('/task').then(() => {
        if (window.location.pathname == '/active/') {
            getCount()
            loadActiveTasks()
            checkCompleted()
        }
        else if (window.location.pathname == '/completed/') {
            getCount()
            loadCompletedTasks()
            checkCompleted()
        } else {
            loadTasks()
            checkCompleted()
        }
    }).catch(err => {
        console.log('Error when updating all tasks status' + err)
    })
    return
}

if (window.location.pathname == '/active/') {
    filters.children[1].children[0].classList.add('selected')
    filters.children[0].children[0].classList.remove('selected')
    filters.children[2].children[0].classList.remove('selected')

    getCount()
    loadActiveTasks()
    checkCompleted()
}
else if (window.location.pathname == '/completed/') {
    filters.children[1].children[0].classList.remove('selected')
    filters.children[0].children[0].classList.remove('selected')
    filters.children[2].children[0].classList.add('selected')

    getCount()
    loadCompletedTasks()
    checkCompleted()
} else {
    filters.children[1].children[0].classList.remove('selected')
    filters.children[0].children[0].classList.add('selected')
    filters.children[2].children[0].classList.remove('selected')

    loadTasks()
    checkCompleted()
}
