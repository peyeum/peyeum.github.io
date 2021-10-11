/* element selector function using query selector
select element and return as an element or a nodeList if bool parameter is true */
const el = function selectElement(target, bool) {
  if (!bool) {
    // check whether the target is a nodelist
    return document.querySelectorAll(target).length !== undefined &&
      document.querySelectorAll(target).length > 1
      ? document.querySelectorAll(target)
      : document.querySelector(target);
  } else return document.querySelectorAll(target); // if function has bool parameter use querry selector all
};

// check if there is a task or no
const isTask = () => {
  return el(".task--content").children.length ? true : false;
};

// check if there is a todo or no
const isTodo = () => {
  const nodeList = el(".todo--content", "node");
  for (let i = 0; i < arr.length; i++) {
    if (nodeList[i].childElementCount) return true;
  }
  return false;
};

/* dummy task todo
for initial task and todo if there are no
task created yet */
const dummyTodo = () => {
  // if there is no task and dummyTodo not created yet then add the dummyTodo
  if (!isTask() && !el(".dummyTodo"))
    el(".todos").insertAdjacentHTML(
      "beforeend",
      `
        <div class="dummyTodo">
          <h2>Hello Boi</h2>
        </div>
      `
    );

  // remove the dummyTodo is there is a task
  if (isTask() && el(".dummyTodo")) el(".dummyTodo").remove();
};

// check current task function
const checkTask = () => {
  if (!isTask()) {
    // if task list is empty, give alert to user
    el(".task--content").insertAdjacentHTML(
      "beforebegin",
      `
      <div class="task--info grid place-items-center mx-2 my-1 rounded h-20 text-lg bg-gray-800">
        <p class="mx-6 text-center" >No task to do currently, lets make some!</p>
      </div>
    `
    );
    // if task list not empty remove the alert
  } else if (el(".tasks>.task--info")) {
    el(".tasks>.task--info").remove();
  }
  if (el(".tasks>.task--info", "node")) {
    el(".tasks>.task--info", "node").forEach((e, i) => {
      if (i > 0) e.remove();
    });
  }
};

// check current todo
const checkTodo = (position) => {
  const todoBody = el(".todo--content", "node")[position];
  if (!todoBody) return;

  const todoInfo = todoBody.parentElement.querySelector(".todo--info");
  // if (!todoInfo) return;

  if (!todoBody.childElementCount && !todoInfo) {
    el(".todo--content", "node")[position].insertAdjacentHTML(
      "beforebegin",
      /* html */
      `
        <p class="todo--info">
          Nothing todo currently, lets do something!
        </p>
      `
    );
  } else if (todoBody.childElementCount && todoInfo) {
    todoInfo.remove();
  }
};

// update remaining taks to acomplish
const remainTask = () => {
  let tasks = "";
  if (isTask()) {
    tasks = el(".task--content>*", "node").length;
  } else tasks = "No Task";

  el(".task--remain").textContent = `${tasks}`;
};

// update remaining todo
const remainTodo = (position) => {
  let todo = "";
  if (condition) {
  }
};

// add input value to local storage
const addLocal = (param) => {
  // getting data from local storage
  let getLocalStorage = localStorage.getItem("Task List");

  if (!getLocalStorage) {
    // if local storage null then make blank array
    taskList = [];
  } else {
    // push data from local storage into array
    taskList = JSON.parse(getLocalStorage);
  }

  // push data from parameter into array
  taskList.push(param);

  // and set data from array into local storage
  localStorage.setItem("Task List", JSON.stringify(taskList));
};

// render tasklist and todo body into document
const task = (param) => {
  // insert task from last taskList element into document
  el(".task--content").insertAdjacentHTML(
    "beforeend",
    `
      <li class="task mx-2 my-1 py-2 relative rounded bg-gray-800">
        <p class="task--name ml-2">${param}</p>
        <button class="task--delete absolute inset-y-0 right-4"><i class="fas fa-trash pointer-events-none p-1 rounded bg-gray-900 text-gray-500"></i></button>
      </li>
    `
  );

  // insert todo body element into document
  el(".todos").insertAdjacentHTML(
    "beforeend",
    `
      <div class="todo--task">
        <span class="todo--title">
          <p>${param}</p>
          <p class="todo--remain"></p>
        </span>

        <form class="todo--add-new" onSubmit="submitEvent(event)">
          <input type="text" placeholder="add new todo" required>
          <button><i class="fas fa-plus pointer-events-none"></i></button>
        </form>

        <div class="todo--remove">
          <button class="todo--remove-all">remove all todo</button>
          <button class="task--remove-done">remove completed todo</button>
        </div>

        <ul class="todo--content">
          <!-- todo list goes here -->
        </ul>
      </div>
    `
  );
};

// add task function
const addTask = () => {
  // getting data from local storage
  let getLocalStorage = localStorage.getItem("Task List");

  if (!getLocalStorage) {
    //if local storage null make blank array
    taskList = [];
  } else {
    // push data from local storage into array
    taskList = JSON.parse(getLocalStorage);
  }

  // insert task from last taskList element into document
  task(taskList[taskList.length - 1]);
};

// show tasks from local storage
const showTask = () => {
  // getting data from local storage
  let getLocalStorage = localStorage.getItem("Task List");

  if (!getLocalStorage) {
    // if local storage null make blank array
    taskList = [];
  } else {
    // push data from local storage into array
    taskList = JSON.parse(getLocalStorage);
  }

  // reset all element inside task content element
  el(".task--content").innerHTML = null;

  // reset all element inside todos element
  el(".todos").innerHTML = null;

  // add new element from array that contain data from local storage
  taskList.forEach((e) => {
    // call task function
    task(e);
  });
};

// delete task function
const deleteTask = (index) => {
  // getting data from local storage
  let getLocalStorage = localStorage.getItem("Task List");

  // push local storage data into array
  taskList = JSON.parse(getLocalStorage);

  // delete an element inside array based on index given in parameter
  taskList.splice(index, 1);

  // update local storage data using modified array
  localStorage.setItem("Task List", JSON.stringify(taskList));

  // update task list from local storage
  showTask();

  // delete a todo content element
  todoList.splice(index, 1);
  // update local storage data using modified array
  localStorage.setItem("Todo List", JSON.stringify(todoList));
  showTodos();
};

// remove all tasks
const removeAllTask = () => {
  if (confirm("Are you sure want to remove all the tasks?")) {
    // remove local storage data
    localStorage.removeItem("Task List");

    // update task lisk from local storage
    showTask();
  }
};

// remove completed task
const removeComTask = () => {
  const doneTask = el(".task.done", "node");

  // check done task
  if (!doneTask.length) return alert("Theres no completed task yet");

  // remove element that has "done" classname
  if (
    confirm(`
    Are you sure want to remove ${doneTask.length} completed tasks?
    `)
  ) {
    // looping delete function on each done task
    doneTask.forEach((e) => {
      deleteTask(Array.from(el(".task", "node")).indexOf(e));
    });

    // update tasks
    showTask();
  }
};

// render todolist into document
const todo = (todo, index) => {
  // if theres no todo--content with given index, just return
  if (!el(".todo--content", "node")[index]) return;

  el(".todo--content", "node")[index].insertAdjacentHTML(
    "beforeend",
    `
      <li class="todo">
        <p class="todo--name">${todo}</p>
        <button class="todo--delete"><i class="fas fa-trash pointer-events-none"></i></button>
      </li>
    `
  );
};

const addlocalTodo = (param, index) => {
  const getLocalStorage = localStorage.getItem("Todo List");

  if (!getLocalStorage) {
    todoList = [];
  } else {
    todoList = JSON.parse(getLocalStorage);
  }

  // if todo list by index is null
  if (!todoList[index]) {
    const initLength = todoList.length;
    for (let i = 0; i <= Math.abs(index - initLength); i++) {
      todoList.push([]);
    }
  }
  // push data from input parameter into array
  todoList[index].push(param);

  // and set data from array into local storage
  localStorage.setItem("Todo List", JSON.stringify(todoList));
};

const addTodo = (index) => {
  // getting data from local storage
  const getLocalStorage = localStorage.getItem("Todo List");

  if (!getLocalStorage) {
    //if local storage null make blank array
    todoList = [];
  } else {
    // push data from local storage into array
    todoList = JSON.parse(getLocalStorage);
  }

  // insert todo from todoList element into document
  todo(todoList[index][todoList[index].length - 1], index);
};

const showTodos = () => {
  // getting data from local storage
  const getLocalStorage = localStorage.getItem("Todo List");

  if (!getLocalStorage) {
    //if local storage null make blank array
    todoList = [];
  } else {
    // push data from local storage into array
    todoList = JSON.parse(getLocalStorage);
  }

  // reset all element inside todo content
  el(".todo--content", "node").forEach((e) => {
    e.innerHTML = null;
  });

  todoList.forEach((e, i) => {
    e.forEach((Todo) => {
      todo(Todo, i);
    });
  });
};

// delete todo function
const deleteTodo = (position, index) => {
  const getLocalStorage = localStorage.getItem("Todo List");

  // push data from local storage into array
  todoList = JSON.parse(getLocalStorage);

  // delete element inside multi dimension array based on array position and index given in parameter
  todoList[position].splice(index, 1);

  // update local storage data using modified multi dimension array
  localStorage.setItem("Todo List", JSON.stringify(todoList));

  // update todo list from local storage
  showTodos();
};

// delete all todos function
const deleteAllTodo = (position) => {
  const getLocalStorage = localStorage.getItem("Todo List");

  // push data from local storage into array
  todoList = JSON.parse(getLocalStorage);

  // delete element inside multi dimension array based on array position and index given in parameter
  todoList[position].splice(0, todoList[position].length);

  // update local storage data using modified multi dimension array
  localStorage.setItem("Todo List", JSON.stringify(todoList));

  // update todo list from local storage
  showTodos();
};

// callback function for menu button inside task--add-new triggered
const menuEvent = (event) => {
  // select task--remove element
  const taskRemove = event.srcElement.parentElement.nextElementSibling;

  taskRemove.classList.toggle("scale-0");
};

// callback function when todo--add-new onSubmit event triggered
const submitEvent = (event) => {
  // define the element of the form
  const { srcElement: element } = event;

  // define the index of the form
  const index = Array.from(el(".todo--add-new", "node")).indexOf(element);

  // prevent document reloading when submit button triggered
  event.preventDefault();

  // call addLocalTodo function
  addlocalTodo(element.firstElementChild.value, index);
  // call addTodo function
  addTodo(index);

  // reset the form after all callback function executed
  element.reset();

  // check todo
  checkTodo(index);
};

// run these function after dom loaded
window.addEventListener("load", () => {
  showTask();
  checkTask();
  remainTask();
  showTodos();
  dummyTodo();
  // check todo for each one of it
  for (let i = 0; i < el(".todo--task", "node").length; i++) {
    checkTodo(i);
  }

  // add css variable depens on windows inner height
  el("link").sheet.insertRule(`
    :root {
      --winHeight: ${window.innerHeight}px;
      --mainHeight: calc(var(--winHeight) - ${
        el("nav").getBoundingClientRect().height +
        el("footer").getBoundingClientRect().height
      }px);
      --tHeight: calc(var(--mainHeight) - ${
        el(".task--title").getBoundingClientRect().height +
        el(".task--foot").getBoundingClientRect().height
      }px);

    }`);
});

// // Task List Input Box Validation
// el(".task--add-new").addEventListener("keyup", () => {
//   const input = el(".task--add-new input").value;
//   if (input.trim()) {
//     console.log("if true do dis");
//   } else {
//     console.log("just work");
//   }
// });

// add new task to the task list
el(".task--add-new").addEventListener("submit", function (e) {
  // prevent page from reloading when submitted
  e.preventDefault();

  // push data to local storage
  addLocal(this.firstElementChild.nextElementSibling.value);

  // add the input value into list
  addTask();

  // run check task function
  checkTask();

  // clear the input box after adding value into the list
  this.reset();
  // check for remaining task
  remainTask();

  //checkTodo
  for (let i = 0; i < el(".todo--task", "node").length; i++) {
    checkTodo(i);
  }

  //dummyTodo function
  dummyTodo();
});

// click event handler
document.addEventListener("click", ({ target }) => {
  // remove all task button
  if (target === el(".task--remove-all")) {
    // remove all task when there is a task
    isTask() ? removeAllTask() : false;

    // run check task function
    checkTask();

    // check for remain task to do
    remainTask();

    //dummyTodo function
    dummyTodo();
  }

  // remove done tasks button
  if (target === el(".task--remove-done")) {
    // remove all completed tasks
    isTask() ? removeComTask() : false;

    // run check task function
    checkTask();

    // check for remain task to do
    remainTask();
  }

  if (
    target != el("button[type=button]") &&
    !el(".task--remove").classList.contains("scale-0")
  ) {
    el(".task--remove").classList.add("scale-0");
  }

  el(".task--delete", "node").forEach((e, i) => {
    if (target === e) {
      // delete task
      confirm(`
        Are you sure want to delete "${e.previousElementSibling.textContent}" Task?
      `)
        ? deleteTask(i) // delete task function
        : false;

      // run check task function
      checkTask();

      // check for remain task to do
      remainTask();

      // check todo
      checkTodo(i);

      //dummyTodo function
      dummyTodo();
    }
  });

  el(".todo--delete", "node").forEach((e) => {
    if (target === e) {
      const position = Array.from(el(".todo--content", "node")).indexOf(
        e.parentElement.parentElement
      );
      const index = Array.from(e.parentElement.parentElement.children).indexOf(
        e.parentElement
      );

      confirm(`
        Are you sure want to delete "${e.previousElementSibling.textContent}" Todo?
      `)
        ? deleteTodo(position, index)
        : false;

      // check todo
      checkTodo(position);
    }
  });

  el(".todo--remove-all", "node").forEach((e) => {
    if (target === e) {
      // define index of the target
      const index = Array.from(el(".todo--remove-all", "node")).indexOf(target);

      // define target todo title
      const title = el(".todo--title", "node")[index].firstElementChild
        .textContent;

      // if there is no todo inside, ecsape the loop
      if (!todoList[index] || !todoList[index].length) return;

      confirm(`
        Are you sure want to delete all "${title}" todo?
      `)
        ? deleteAllTodo(index)
        : false;

      // check todo
      checkTodo(index);
    }
  });
});
