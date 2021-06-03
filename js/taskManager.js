const DONE = "DONE";
const REVIEW = "REVIEW";
const IN_PROGRESS = "IN PROGRESS";
const TO_DO = "TO DO";

const COLORS = {
  DONE: "green",
  REVIEW: "blue",
  "IN PROGRESS": "yellow",
  "TO DO": "red",
};

/**
 * represents a task manager
 */
class TaskManager {
  constructor(currentId = 0) {
    this._tasks = [];
    this._currentId = currentId;
  }

  get tasks() {
    return this._tasks;
  }

  set tasks(newTasks) {
    this._tasks = newTasks;
  }

  get currentId() {
    return this._currentId;
  }

  set currentId(newCurrentId) {
    this._currentId = newCurrentId;
  }

  /**
   * adds a task to the table containing the tasks
   * @param{object} task
   */
  addTask(name, description, assignedTo, dueDate, status = TO_DO) {
    this.currentId++;
    const task = {
      id: this.currentId,
      name,
      description,
      assignedTo,
      dueDate,
      status,
    };
    this.tasks.push(task);
  }

  deleteTask(taskId) {
    const newTasks = [];
    // const deletedTasks = [];
    this.tasks.forEach((task) => {
      if (task.id !== taskId) {
        newTasks.push(task);
      }
      //else {
      //  deletedTasks.push(task);
      //}
    });
    this.tasks = newTasks;
  }
  /**
   * returns the HTML code of a task card
   * @param{string} - name
   * @param{string} - description
   * @param{string} - assignedTo
   * @param{string} - dueDate
   * @param{string} - status
   * @param{number} - id
   * @returns{string} html
   */
  addTaskHTML(name, description, assignedTo, dueDate, status, id) {
    const color = COLORS[status];
    const html = `<article class="card shadow mb-3">
                    <header class="card-header d-flex justify-content-between">
                      <figure class="status-symbol-${color}"></figure>
                      <div>
                        <h3 class="card-title">${name}</h3>
                        <h4 class="card-subtitle text-muted h5">Assigned to ${assignedTo}</h4>      
                      </div>
                      <div id="card-buttons">
                        <div class="dropdown" data-task-id="${id}">
                          <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownStatusButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-task-id="${id}">
                            Status
                          </button>
                          <div id="dropdown-status-button" class="dropdown-menu" aria-labelledby="dropdownStatusButton" data-task-id="${id}">
                            <a class="dropdown-item to-do-button">TO DO</strong></a>
                              <a class="dropdown-item in-progress-button">IN PROGRESS</a>
                            <a class="dropdown-item review-button">REVIEW</a>
                            <a class="dropdown-item done-button">DONE</a>
                          </div>
                          <a href="#" class="pencil-icon ml-3 modify-button"></a>
                          <a href="#" class="trash-icon ml-3 delete-button"></a>
                        </div>
                      </div>
                    </header>
                    <main class="card-body pb-0">
                      <p class="card-text">${description}</p>
                      <div class="d-flex justify-content-between">
                        <p class="card-text">Due Date: <strong>${dueDate}</strong></p>
                        <p class="card-text">Status: <strong class="${color}">${status}</strong></p>
                      </div>
                    </main>
                  </article>`;
    return html;
  }
  /**
   * displays all the tasks on the page
   */
  render() {
    const tasksListHTML = [];
    this.tasks.forEach((task) => {
      const { name, description, assignedTo, dueDate, status, id } = task;
      const date = new Date(dueDate);
      const formattedDate = date.toDateString();
      const taskHTML = this.addTaskHTML(
        name,
        description,
        assignedTo,
        formattedDate,
        status,
        id
      );
      tasksListHTML.push(taskHTML);
    });
    const tasksHTML = tasksListHTML.join("\n");
    document.getElementById("task-cards-section").innerHTML = tasksHTML;
  }
  /**
   * returns a task by its id
   * @param{number} taskId
   * @returns{object}
   */
  getTaskById(taskId) {
    let foundTask;
    this.tasks.forEach((task) => {
      if (taskId === task.id) {
        foundTask = task;
      }
    });
    return foundTask;
  }
  /**
   * saves the tasks to the local storage
   */
  save() {
    const tasksJSON = JSON.stringify(this._tasks);
    localStorage.setItem("tasks", tasksJSON);
    const currentId = this.currentId.toString();
    localStorage.setItem("currentId", currentId);
  }
  /**
   * loads the tasks in the local storage to the page upon refreshing
   */
  load() {
    if (localStorage.getItem("tasks") !== null) {
      const tasksJSON = localStorage.getItem("tasks");
      this.tasks = JSON.parse(tasksJSON);
    }
    if (localStorage.getItem("currentId") !== null) {
      const currentId = localStorage.getItem("currentId");
      this.currentId = parseInt(currentId);
    }
  }
}

module.exports.TaskManager = TaskManager;
