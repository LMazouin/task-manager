const assert = require("assert");
const TaskManager = require("../js/taskManager.js");

const taskManager = new TaskManager.TaskManager();

describe("TaskManager", () => {
  describe("addTask", () => {
    afterEach(() => {
      taskManager.currentId = 0;
      taskManager.tasks = [];
    });

    it("should add a task to the current task list", () => {
      const expected = {
        id: taskManager.currentId + 1,
        name: "Dog",
        description: "walk the dog",
        assignedTo: "John",
        dueDate: "10/06/2021",
        status: "TO DO",
      };
      taskManager.addTask("Dog", "walk the dog", "John", "10/06/2021");
      const actual = taskManager.tasks[taskManager.tasks.length - 1];
      assert.deepEqual(actual, expected);
    });
  });
  describe("deleteTask", () => {
    afterEach(() => {
      taskManager.currentId = 0;
      taskManager.tasks = [];
    });

    it("should delete a task from the current task list", () => {
      const expected = undefined;
      taskManager.addTask("Dog", "walk the dog", "John", "10/06/2021");
      taskManager.addTask("Cat", "feed the cat", "George", "11/06/2021");
      const taskId = taskManager.tasks[1].id;
      taskManager.deleteTask(taskId);
      const actual = taskManager.tasks.find((task) => task.id === taskId);
      assert.equal(actual, expected);
    });
  });

  describe("getTaskById", () => {
    afterEach(() => {
      taskManager.currentId = 0;
      taskManager.tasks = [];
    });

    it("should return a task by its id", () => {
      const expected = {
        id: 2,
        name: "Cat",
        description: "feed the cat",
        assignedTo: "George",
        dueDate: "11/06/2021",
        status: "TO DO",
      };
      taskManager.addTask("Dog", "walk the dog", "John", "10/06/2021");
      taskManager.addTask("Cat", "feed the cat", "George", "11/06/2021");
      const taskId = taskManager.tasks[1].id;
      const actual = taskManager.getTaskById(taskId);
      assert.deepEqual(actual, expected);
    });
  });

  describe("constructor", () => {
    it("should initialize the current id", () => {
      const taskManagerTest = new TaskManager.TaskManager();
      const expected = 0;
      const actual = taskManagerTest.currentId;
      assert.equal(actual, expected);
    });

    it("should initialize the task list", () => {
      const taskManagerTest = new TaskManager.TaskManager();
      const expected = 0;
      const actual = taskManagerTest.tasks.length;
      assert.equal(actual, expected);
    });
  });
});
