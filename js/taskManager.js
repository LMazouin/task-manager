import React from('react');
import ReactDOM from('react-dom');
/**
 * represents a task manager
 */
class TaskManager {
	/**
   * initializes a table containing the tasks and the current id
   * @param{number} currentId - id that keeps track of the tasks
   */
	constructor(currentId = 0) {
		this._tasks = [];
		this._currentId = currentId;
	}
	/**
   * returns a table containing the tasks
   * @return{array}
   */
	get tasks() {
		return this._tasks;
	}
	/**
   * returns the id of the last task added
   * @return{number}
   */
	get currentId() {
		return this._currentId;
	}
	/**
   * adds a task to the table containing the tasks
   * @param{object} task
   */
	addTask(name, description, assignedTo, dueDate, status = 'TODO') {
		this._currentId++;
		const task = {
			id: this._currentId,
			name, 
			description, 
			assignedTo, 
			dueDate, 
			status
		};
		this._tasks.push(task);
	}
	/**
   * returns the HTML code of a task card
   * @param{string} name 
   * @param{string} description 
   * @param{string} assignedTo 
   * @param{string} dueDate
   * @param{string} status
   * @param{number} id
   * @return{string} html
   */
	addTaskHTML(name, description, assignedTo, dueDate, status, id) {
		const html = `<article class="card shadow mb-3">
                    <header class="card-header d-flex justify-content-between">
                      <figure class="status-symbol"></figure>
                      <div>
                        <h3 class="card-title">${name}</h3>
                        <h4 class="card-subtitle text-muted h5">Assigned to ${assignedTo}</h4>      
                      </div>
                      <div id="card-buttons">
                        <div class="dropdown">
                          <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownStatusButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-task-id="${id}">
                            Status
                          </button>
                          <div id="dropdown-status-button" class="dropdown-menu" aria-labelledby="dropdownStatusButton" data-task-id="${id}">
                            <a class="dropdown-item">TODO</a>
                            <a class="dropdown-item">IN_PROGRESS</a>
                            <a class="dropdown-item">REVIEW</a>
                            <a class="dropdown-item done-button">DONE</a>
                          </div>
                          <a href="#" class="pencil-icon ml-3"></a>
                          <a href="#" class="trash-icon ml-3"></a>
                        </div>
                      </div>
                    </header>
                    <main class="card-body pb-0">
                      <p class="card-text">${description}</p>
                      <div class="d-flex justify-content-between">
                        <p class="card-text">Due Date: ${dueDate}</p>
                        <p class="card-text">Status: <strong class="text-danger">${status}</strong></p>
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
		this._tasks.forEach((task) => {
			const {name, description, assignedTo, dueDate, status, id} = task; 
			const date = new Date(dueDate);
			const formattedDate = date.toDateString();
			const taskHTML = this.addTaskHTML(name, description, assignedTo, formattedDate, status, id);
			tasksListHTML.push(taskHTML);
		});
		const tasksHTML = tasksListHTML.join('\n');
		document.getElementById('task-cards-section').innerHTML = tasksHTML;
	}
	/**
   * returns a task by its id
   * @param{number} taskId
   * @returns{object}
   */
	getTaskById(taskId) {
		let foundTask;
		this._tasks.forEach((task) => {
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
		localStorage.setItem('tasks', tasksJSON);
		const currentId = this._currentId.toString();
		localStorage.setItem('currentId', currentId);
	}
	/**
   * loads the tasks in the local storage to the page upon refreshing
   */
	load() {
		if (localStorage.getItem('tasks') !== null) {
			const tasksJSON = localStorage.getItem('tasks');
			this._tasks = JSON.parse(tasksJSON);
		}
		if (localStorage.getItem('currentId') !== null) {
			const currentId = localStorage.getItem('currentId');
			this._currentId = parseInt(currentId);
		}
	}
}
