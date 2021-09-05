// element selector function using query selector
// select element and return as an element or a nodeList if bool parameter is true
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

// check current task function
const checkTask = () => {
  if (!isTask()) {
    // if task list is empty, give alert to user
    el(".task--content").insertAdjacentHTML(
      "beforebegin",
      `
      <p>
        No task to do currently, lets make some!
      </p>
    `
    );
    // if task list not empty remove the alert
  } else if (el(".tasks>p")) {
    el(".tasks>p").remove();
  }
  if (el(".tasks>p", "node")) {
    el(".tasks>p", "node").forEach((e, i) => {
      if (i > 0) e.remove();
    });
  }
};

// update remaining taks to acomplish
const remainTask = () => {
  let tasks = "";
  if (isTask()) {
    tasks = el(".task--content>*", "node").length;
  } else tasks = "No";

  el(".task--title").lastElementChild.textContent = `
    ${tasks} Tasks Remaining.
  `;
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

// add task function
const addTask = () => {
  // getting data from local storage
  let getLocalStorage = localStorage.getItem("Task List");

  // create dummmy variable
  let newTask = "";

  if (!getLocalStorage) {
    //if local storage null make blank array
    taskList = [];
  } else {
    // push data from local storage into array
    taskList = JSON.parse(getLocalStorage);
  }

  // add task element into dummy variable
  taskList.forEach((e) => {
    newTask = `
      <li class="task">
        <p class="task--name">${e}</p>
        <button class="task--delete">-</button>
      </li>
    `;
  });

  // insert task from dummy variable into document
  el(".task--content").insertAdjacentHTML("beforeend", newTask);
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

  // add new element from array that contain data from local storage
  taskList.forEach((e) => {
    el(".task--content").insertAdjacentHTML(
      "beforeend",
      `
      <li class="task">
        <p class="task--name">${e}</p>
        <button class="task--delete">-</button>
      </li>
    `
    );
  });
};

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
};

// remove all tasks
const removeAllTask = () => {
  if (confirm("Are you sure want to remove all the tasks?")) {
    // set local storage data with blank array
    localStorage.setItem("Task List", JSON.stringify([]));

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
      are you sure want to remove ${doneTask.length} completed tasks?
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

// run these function on first load
showTask();
checkTask();
remainTask();

// Task List Input Box Validation
el(".task--add-new").addEventListener("keyup", () => {
  const input = el(".task--add-new input").value;
  if (input.trim()) {
    console.log("if true do dis");
  } else {
    console.log("just work");
  }
});

// add new task to the task list
el(".task--add-new").addEventListener("submit", (e) => {
  // prevent page from reloading when submitted
  e.preventDefault();

  addLocal(el(".task--add-new>input").value);

  // add the input value into list
  addTask();

  // run check task function
  checkTask();

  // clear the input box after adding value into the list
  el(".task--add-new").reset();
  // check for remaining task
  remainTask();
});

// buttons for task list click event
document.addEventListener("click", ({ target }) => {
  // remove all task button
  if (target === el(".task--remove-all")) {
    // remove all task when there is a task
    isTask() ? removeAllTask() : false;

    // run check task function
    checkTask();

    // check for remain task to do
    remainTask();
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

  el(".task--delete", "node").forEach((e, i) => {
    if (target === e) {
      // delete task
      confirm(`
        are you sure want to delete 
        The ${e.previousElementSibling.textContent} Task?
      `)
        ? deleteTask(i) // delete task function
        : false;

      // run check task function
      checkTask();

      // check for remain task to do
      remainTask();
    }
  });
});
