// global variables
const form = document.querySelector("form");

const generalValidator = (str, type) => {
  if (type === "name") {
    return validator.matches(str, /^[a-zA-Z ]+$/);
  }
  if (type === "text") {
    return validator.matches(str, /^[a-zA-Z0-9 ]+$/);
  }
  if (type === "date") {
    return validator.isDate(str);
  }
  if (type === "date-after") {
    return validator.isAfter(str);
  }
};

// function to export data from input fields
const getInputValues = (inputField) => {
  const input = {};
  input.content = inputField.value.toString();
  input.id = inputField.id;
  input.valid = generalValidator(input.content, inputField.dataset.type);
  return input;
};

// check the validity of all input fields
// returns false as soon as one is invalid
const checkValidity = (inputList) => {
  let valid = true;
  let i = 0;
  while (valid && i < inputList.length) {
    if (inputList[i].valid) {
      valid = true;
      i++;
    } else {
      valid = false;
      return valid;
    }
  }
  return true;
};

// displays an error message below the input fields
const displayErrorMessage = (inputList) => {
  inputList.forEach((input) => {
    const { id } = input;
    const inputFieldGroup = document.querySelector(
      `#popup-form div[data-id=${id}]`
    );
    const div = document.createElement("div");
    if (!input.valid) {
      document.querySelector(`#popup-form div[data-id=${id}] div`)?.remove();
      div.className = "invalid-feedback";
      div.innerText = "This looks suspicious...";
    } else {
      document.querySelector(`#popup-form div[data-id=${id}] div`)?.remove();
      div.className = "valid-feedback";
      div.innerText = "Looks OK!";
    }
    div.style.display = "block";
    inputFieldGroup.appendChild(div);
  });
};

// create a task manager object
const taskManager = new TaskManager();
taskManager.load();
taskManager.render();

form.addEventListener("submit", (event) => {
  event.preventDefault();

  // console.log('hello');

  const inputList = [];
  document
    .querySelectorAll("#popup-form .form-control")
    .forEach((inputField) => {
      const input = getInputValues(inputField);
      inputList.push(input);
    });

  console.log(inputList);
  console.log(checkValidity(inputList));

  if (!checkValidity(inputList)) {
    displayErrorMessage(inputList);
  } else {
    document
      .querySelectorAll("#popup-form .form-group div")
      .forEach((element) => {
        element.remove();
      });
    document
      .querySelectorAll("#popup-form .form-control")
      .forEach((inputField) => {
        inputField.value = "";
      });

    const name = inputList[0].content;
    const assignedTo = inputList[1].content;
    const dueDate = inputList[2].content;
    const description = inputList[3].content;

    console.log(name);
    console.log(assignedTo);
    console.log(dueDate);
    console.log(description);

    taskManager.addTask(name, description, assignedTo, dueDate);
    taskManager.render();
    taskManager.save();
  }
});

// const statusButtons = document.querySelectorAll('#dropdown-status-button');

const tasksList = document.querySelector("#task-cards-section");

// refactorize this part
tasksList.addEventListener("click", (event) => {
  event.target.classList.forEach((cls) => {
    // DONE button
    if (cls === "done-button") {
      const taskId = parseInt(event.target.parentElement.dataset.taskId);
      const task = taskManager.getTaskById(taskId);
      task.status = DONE;
      taskManager.render();
      taskManager.save();
    }
    // REVIEW button
    if (cls === "review-button") {
      const taskId = parseInt(event.target.parentElement.dataset.taskId);
      const task = taskManager.getTaskById(taskId);
      task.status = REVIEW;
      taskManager.render();
      taskManager.save();
    }
    // IN PROGRESS button
    if (cls === "in-progress-button") {
      const taskId = parseInt(event.target.parentElement.dataset.taskId);
      const task = taskManager.getTaskById(taskId);
      task.status = IN_PROGRESS;
      taskManager.render();
      taskManager.save();
    }
    // TO DO button
    if (cls === "to-do-button") {
      const taskId = parseInt(event.target.parentElement.dataset.taskId);
      const task = taskManager.getTaskById(taskId);
      task.status = TO_DO;
      taskManager.render();
      taskManager.save();
    }
    // delete button
    if (cls === "delete-button") {
      const taskId = parseInt(event.target.parentElement.dataset.taskId);
      taskManager.deleteTask(taskId);
      taskManager.save();
      taskManager.render();
    }
  });
});
