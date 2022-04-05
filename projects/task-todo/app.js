/* ---------------
  HTML element selector function
  e return a node element, 'e' for 'element'
  el return a nodeList, 'el' for 'element list'
  ee return a node element. 'ee' for 'element in element'
  @param target --> your target element
  @param e      --> target element parent
  ---------------- */
const e = (target) => document.querySelector(target);
const el = (target) => document.querySelectorAll(target);
const ee = (target, e) => (e ? e.querySelector(target) : null);

// randomly generate 6 digit of number and(or) string
const myId = () => {
  // initiating source and temporary array
  const src = [];
  const arr = [];
  // push number and alphabet into source array
  for (let d = 0; d <= 90; d++) {
    if (d <= 9) src.push(d); // 0-9
    if (d >= 65) src.push(String.fromCharCode(d).toLowerCase()); // a-z
  }
  // function that return random index from an array
  const rIdx = (arr) =>
    Math.floor(Math.random() * (arr.length - 1 - 0 + 1) + 0);
  // function that return a randomised array
  const shuffleArr = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };
  // pushing randomied array into temp array
  for (let c = 0; c < 6; c++) arr.push(shuffleArr(src)[rIdx(src)]);
  // return randomised temp array into string
  return shuffleArr(arr).join("");
};

// check if there is a task or no
const isTask = () => (e(".task--content").children.length ? true : false);

// check if there is a todo or no
const isTodo = () => {
  const nodeList = el(".todo--content");
  let boolean = false;
  nodeList.forEach((e) => {
    if (e.childElementCount) boolean = true;
  });
  return boolean;
};

/* dummy task todo
for initial task and todo if there are no
task created yet */
const dummyTodo = () => {
  // if there is no task and dummyTodo not created yet then add the dummyTodo
  if (!todoActive() && !e(".dummyTodo"))
    e(".todos").insertAdjacentHTML(
      "beforeend",
      `
        <div class="dummyTodo w-auto h-full grid place-items-center relative">
          <div class="grid justify-items-center">
            <div class="pict">
              <div class="content">
                  <div class="phone">
                      <i class="list fas fa-bars"></i>
                      <i class="check far fa-check-square"></i>
                  </div>
                  <div class="laptop">
                      <i class="listL fas fa-bars"></i>
                      <i class="checkL far fa-check-square"></i>
                  </div>
                  <div class="blob"></div>
                </div>
            </div>
            <h2>TATO aka Task Todo, a simple and more organized todo list app</h2>
            <h2>make and manage your todo list and be productive!</h2>
          </div>
        </div>
      `
    );

  // remove the dummyTodo is there is a task
  if (todoActive() && e(".dummyTodo")) e(".dummyTodo").remove();
};

// check current task function
const checkTask = () => {
  if (!isTask() && !e(".task--info")) {
    // if task list is empty, give alert to user
    e(".task--content").insertAdjacentHTML(
      "beforebegin",
      `
      <div class="task--info grid place-items-center mx-2 my-1 px-2 py-3 h-[min-content] rounded text-lg bg-gray-800">
          <p class="mx-6 text-center" >
            No task to do currently, lets make some! <br> or just take a break for a while <i class="fas fa-mug-hot"></i>
          </p>
      </div>
    `
    );
  } else if (isTask() && e(".task--info")) e(".task--info").remove();
};

// check current todo
const checkTodo = (position) => {
  const todoBody = el(".todo--content")[position];
  if (!todoBody) return;

  const todoInfo = ee(".todo--info", todoBody.parentElement);
  // if (!todoInfo) return;

  if (!todoBody.childElementCount && !todoInfo) {
    todoBody.insertAdjacentHTML(
      "beforebegin",
      `
        <p class="todo--info bg-gray-800 h-[min-content] rounded mx-2 my-1 px-3 py-2 text-lg text-center sm:bg-gray-900/50">
          Nothing todo currently, lets do something productive!📝
        </p>
      `
    );
  } else if (todoBody.childElementCount && todoInfo) todoInfo.remove();
};

// update remaining taks to acomplish
const remainTask = () => {
  let tasks = "";
  if (isTask()) {
    tasks = el(".task--content>*").length;
  } else tasks = "No Task";

  e(".task--remain").textContent = `${tasks}`;
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

// find todo--task with task id
const todoFind = (task) => {
  const list = el(".todo--task");
  for (let todo = 0; todo < list.length; todo++)
    if (list[todo].id === task.id) return list[todo];
};

// find task with todo--task id
const taskFind = (todo) => {
  const list = el(".task");
  for (let task = 0; task < list.length; task++)
    if (list[task].id === todo.id) return list[task];
};

// return active todo element
const todoActive = () => {
  const todos = el(".todo--task");
  for (let todo = 0; todo < todos.length; todo++) {
    if (!todos[todo].classList.contains("hidden")) return todos[todo];
  }
};

// callback function for onclick event back button
const backClickHandler = ({ srcElement: element }) => {
  [e(".todos"), e(".tasks")].forEach((e) => {
    e.classList.toggle("hidden");
  });
  todoActive().classList.toggle("grid");
  todoActive().classList.toggle("hidden");
  element.classList.toggle("pointer-events-none");
  element.firstElementChild.classList.toggle("opacity-0");
};

const isMobile = () => {
  let boolean = false;
  el("main>*").forEach((e) =>
    getComputedStyle(e).display === "none" ? (boolean = true) : false
  );
  return boolean;
};

// callback function for onclick event in e('.task')
const taskClickHandler = ({ srcElement: element }) => {
  if (!element.id) return;
  if (!isMobile()) {
    if (todoActive()) {
      let todoLast = todoActive();
      todoActive().classList.toggle("grid");
      todoActive().classList.toggle("hidden");
      if (todoLast === todoFind(element)) {
        dummyTodo();
        element.classList.toggle("bg-gray-700");
        return;
      }
    }
    el(".task").forEach((e) => e.classList.remove("bg-gray-700"));
    todoFind(element).classList.toggle("hidden");
    todoFind(element).classList.toggle("grid");
    element.classList.toggle("bg-gray-700");
    dummyTodo();
    return;
  }

  e(".backButton").classList.toggle("pointer-events-none");
  e(".backButton").firstElementChild.classList.toggle("opacity-0");
  e(".tasks").classList.toggle("hidden");
  e(".todos").classList.toggle("hidden");
  todoFind(element).classList.toggle("hidden");
  todoFind(element).classList.toggle("grid");
};

// check for active or on focus input in todo--add-new form
const isTodoInputFocus = () => {
  let flag = false;
  el(".todo--add-new > input").forEach((e) => {
    if (e == document.activeElement) flag = true;
  });
  return flag;
};

// obviously named
const initialState = () => {
  if (!isMobile()) {
    if (todoActive()) {
      todoActive().classList.toggle("grid");
      todoActive().classList.toggle("hidden");
    }
    dummyTodo();
  }

  if (todoActive()) {
    if (isTodoInputFocus) return; // escape function if the input form actived
    else e(".backButton").click(); // click the back button
  }

  el(".task").forEach((e) => {
    if (e.classList.contains("bg-gray-700")) {
      e.classList.remove("bg-gray-700");
    }
  });
};

// render tasklist and todo body into document
const task = (param) => {
  // generate id
  const id = myId();
  // insert task from last taskList element into document
  e(".task--content").insertAdjacentHTML(
    "beforeend",
    `
      <li class="task mx-2 my-1 py-2 relative rounded bg-gray-800 cursor-pointer transition-all hover:bg-gray-700/70 hover:py-3" id="${id}" onclick="taskClickHandler(event)">
        <p class="task--name ml-2 mr-12 truncate pointer-events-none">${param}</p>
        <button class="task--delete absolute inset-y-0 right-4"><i class="fas fa-trash pointer-events-none p-1 rounded bg-gray-900 text-gray-500"></i></button>
      </li>
    `
  );

  // insert todo body element into document
  e(".todos").insertAdjacentHTML(
    "beforeend",
    `
      <div class="todo--task grid-rows-[max-content,1fr,max-content] h-full hidden" id="${id}">
        <span class="todo--title bg-gray-900/60 flex justify-around py-4 mb-1">
          <p>${param}</p>
          <p class="todo--remain"></p>
        </span>

        <ul class="todo--content scrollbar-thin scrollbar-track-track scrollbar-thumb-thumb">
          <!-- todo list goes here -->
        </ul>

        <div class="todo--footer">
          <form class="todo--add-new m-4 py-1 grid grid-cols-[1fr,80%,1fr] bg-gray-700 rounded-xl" onSubmit="submitEvent(event)">
            <button type="button" onclick="menuEvent(event)" class="todo--menuButton">
              <i class="fas fa-ellipsis-v pointer-events-none"></i>
            </button>
            <input class="px-2 py-1 bg-transparent" type="text" placeholder="add new todo" maxlength="27" required>
            <button><i class="fas fa-plus pointer-events-none"></i></button>
          </form>

          <div class="todo--remove absolute grid grid-cols-1 auto-rows-[2rem] gap-1 bottom-[4rem] ml-4 p-2 rounded bg-gray-700 transform origin-bottom-left transition-transform z-10 shadow-lg scale-0">
            <button class="todo--remove-all px-1 text-left">Remove all todo</button>
            <button class="task--remove-done px-1 text-left">Remove completed todo</button>
          </div>
        </div>
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
  e(".task--content").innerHTML = null;

  // reset all element inside todos element
  e(".todos").innerHTML = null;

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
    localStorage.removeItem("Todo List");

    // update task lisk and todo list from local storage
    showTask();
    showTodos();
  }
};

// remove completed task
const removeComTask = () => {
  const doneTask = el(".task.done");

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
      deleteTask(Array.from(el(".task")).indexOf(e));
    });

    // update tasks
    showTask();
  }
};

// render todolist into document
const todo = ({ todo, state }, index) => {
  // if theres no todo--content with given index, just return
  if (!el(".todo--content")[index]) return;
  const id = myId();
  const checked = state === "closed" ? "checked" : "";
  el(".todo--content")[index].insertAdjacentHTML(
    "beforeend",
    `
      <li class="todo mx-2 my-1 py-2 relative rounded bg-gray-800 sm:bg-gray-900/50 truncate">
        <input type="checkbox" ${checked} id="${id}" class="ml-2 hover:cursor-pointer"/>
        <label for="${id}" class="todo--name ml-2 mr-12 hover:cursor-pointer">${todo}</label>
        <button class="todo--delete absolute inset-y-0 right-4"><i class="fas fa-trash pointer-events-none"></i></button>
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
  todoList[index].push({ todo: param, state: "open" });

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
  el(".todo--content").forEach((e) => {
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

  todoList = JSON.parse(getLocalStorage); // push data from local storage into array

  // delete element inside multi dimension array based on array position and index given in parameter
  todoList[position].splice(index, 1);

  // update local storage data using modified multi dimension array
  localStorage.setItem("Todo List", JSON.stringify(todoList));

  showTodos(); // update todo list from local storage
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

// callback function for task and todo menu button
const menuEvent = (event) => {
  // select task--remove element
  const taskRemove = event.srcElement.parentElement.nextElementSibling;

  taskRemove.classList.toggle("scale-0");
};

// outside click event handler for task and todo button
const menuCheck = (target) => {
  // check for task menu
  if (
    target != e("button[type=button]") &&
    !e(".task--remove").classList.contains("scale-0")
  ) {
    e(".task--remove").classList.add("scale-0");
  }

  // check for todo menu
  if (!todoActive()) return;
  if (
    target != ee(".todo--menuButton", todoActive()) &&
    !ee(".todo--remove", todoActive()).classList.contains("scale-0")
  ) {
    ee(".todo--remove", todoActive()).classList.add("scale-0");
  }
};

// callback function when todo--add-new onSubmit event triggered
const submitEvent = (event) => {
  const { srcElement: element } = event; // define the element of the form

  const index = Array.from(el(".todo--add-new")).indexOf(element); // define the index of the form

  const input = element.firstElementChild.nextElementSibling; // input element

  event.preventDefault(); // prevent document reloading when submit button triggered

  if (!input.value.trim()) return element.reset(); // no empty string value

  addlocalTodo(input.value, index); // call addLocalTodo function

  addTodo(index); // call addTodo function

  element.reset(); // reset the form after all callback function executed

  el(".todo--task").forEach((e, i) => checkTodo(i)); // check todo
};

// Dynamic css custom property (css variable) for desired height
// create style element and append inside head elemet
const sheet = document.createElement("style");
document.head.appendChild(sheet);
// function for changing the css variable
const sheetStyle = (string) => (sheet.innerHTML = string);
// function that return the css variable string
const customCSSVar = () => {
  return `
  :root {
    --winHeight: ${window.innerHeight}px;
    --mainHeight: ${
      window.innerHeight -
      (e("nav").getBoundingClientRect().height +
        e("footer").getBoundingClientRect().height)
    }px;
    --tHeight: calc(var(--mainHeight) - ${
      e(".task--title").getBoundingClientRect().height +
      e(".task--foot").getBoundingClientRect().height
    }px);
  }
  `;
};

// run these function when DOM Tree Created
window.addEventListener("DOMContentLoaded", () => {
  showTask();
  checkTask();
  remainTask();
  showTodos();
  dummyTodo();
  el(".todo--task").forEach((e, i) => checkTodo(i)); // check for every todo
});

// add the css variable after page fully loaded
window.addEventListener("load", () => sheetStyle(customCSSVar()));

// run these function when browser resized
window.addEventListener("resize", () => {
  sheetStyle(customCSSVar()); // dynamically change css variable
  initialState();
});

// prevent page from reloading
window.addEventListener("beforeunload", (event) => {
  const e = event || window.event;
  e.preventDefault(); // prevent from reloading
  return e ? (e.returnValue = "") : ""; // Legacy method for cross browser support
});

/*
// Task List Input Box Validation
el(".task--add-new").addEventListener("keyup", () => {
  const input = el(".task--add-new input").value;
  if (input.trim()) {
    console.log("if true do dis");
  } else {
    console.log("just work");
  }
});
*/

// add new task to the task list
e(".task--add-new").addEventListener("submit", function (e) {
  e.preventDefault(); // prevent page from reloading when submitted

  const input = this.firstElementChild.nextElementSibling; // input element

  if (!input.value.trim()) return this.reset(); // validate empty space

  addLocal(input.value); // push data to local storages

  addTask(); // add the input value into list

  checkTask(); // run check task function

  this.reset(); // clear the input box after adding value into the list

  remainTask(); // check for remaining task

  el(".todo--task").forEach((e, i) => checkTodo(i)); // check todo

  dummyTodo(); //dummyTodo function
});

/*  -----------
  change todo state method
  @param newState => change the state, choose betwwen open or close
  @param taskIndex => the task where todo located
  @param todoIndex => the todo position
    -----------  */
const todoState = (newState, taskIndex, todoIndex) => {
  // get the todo list from local storage
  const localTodo = localStorage.getItem("Todo List");

  // if no data in local storage todoList as empty array
  if (!localTodo) todoList = [];
  else todoList = JSON.parse(localTodo); // data found and push to variable

  // modifiy desired todo state
  todoList[taskIndex][todoIndex].state = newState;

  // replace local storage data with modified todoList
  localStorage.setItem("Todo List", JSON.stringify(todoList));
};

const getTaskIndex = (task) => Array.from(el(".task")).indexOf(task);
const getTodoIndex = (todoTask, todo) => Array.from(todoTask).indexOf(todo);

// change event handler
document.addEventListener("change", ({ target }) => {
  const todoCheckbox = ".todo>input[type=checkbox]"; // checkbox selector
  // check for completed todo
  el(todoCheckbox).forEach((e) => {
    if (target == e) {
      const task = taskFind(todoActive());
      const todo = e.parentElement;
      const todoTask = todo.parentElement.children;
      const todoIndex = getTodoIndex(todoTask, todo);
      const taskIndex = getTaskIndex(task);

      if (e.checked) todoState("closed", taskIndex, todoIndex);
      if (!e.checked) todoState("open", taskIndex, todoIndex);
    }
  });
});

// click event handler
document.addEventListener("click", ({ target }) => {
  // remove all task button
  if (target === e(".task--remove-all")) {
    // // remove all todo first
    // if (isTodo()) el(".task").forEach((e, i) => deleteAllTodo(i));

    // remove all task when there is a task
    isTask() ? removeAllTask() : false;

    checkTask(); // run check task function

    remainTask(); // check for remain task to do

    dummyTodo(); //dummyTodo function
  }

  // remove done tasks button
  if (target === e(".task--remove-done")) {
    // remove all completed tasks
    isTask() ? removeComTask() : false;

    checkTask(); // run check task function

    remainTask(); // check for remain task to do
  }

  // check task and todo menu
  menuCheck(target);

  el(".task--delete").forEach((e, i) => {
    if (target === e) {
      // delete task
      confirm(`
        Are you sure want to delete "${e.previousElementSibling.textContent}" Task?
      `)
        ? deleteTask(i) // delete task function
        : false;

      checkTask(); // run check task function

      remainTask(); // check for remain task to do

      el(".todo--task").forEach((e, i) => checkTodo(i)); // check todo

      dummyTodo(); //dummyTodo function
    }
  });

  el(".todo--delete").forEach((e) => {
    if (target === e) {
      const position = Array.from(el(".todo--content")).indexOf(
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

      el(".todo--task").forEach((e, i) => checkTodo(i)); // check todo
    }
  });

  el(".todo--remove-all").forEach((e) => {
    if (target === e) {
      // define index of the target
      const index = Array.from(el(".todo--remove-all")).indexOf(target);

      // define target todo title
      const title = el(".todo--title")[index].firstElementChild.textContent;

      // if there is no todo inside, ecsape the loop
      if (!todoList[index] || !todoList[index].length) return;

      confirm(`
        Are you sure want to delete all todo in "${title}" task ?
      `)
        ? deleteAllTodo(index)
        : false;

      el(".todo--task").forEach((e, i) => checkTodo(i)); // check todo
    }
  });
});
