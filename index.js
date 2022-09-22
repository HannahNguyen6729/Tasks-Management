const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("task_management", "root", "123456", {
  host: "localhost",
  dialect: "mysql",
});

//create models
const Task = sequelize.define(
  "Tasks", //model name
  {
    name: {
      type: DataTypes.STRING, //VARCHAR(255)
      allowNull: false, //NOT NULL
    },
    status: {
      type: DataTypes.STRING(800), //VARCHAR(800)
    },
  }
);
//create tasks
const createTask = async (name, status) => {
  //method 1:
  //   const newTask = Task.build({
  //     name,
  //     status,
  //   });
  //   await newTask.save();

  //method 2:
  await Task.create({
    name,
    status,
  });
};
createTask("Learn Golang", "PENDING");

//findAll : get all tasks in the table
const getTaskList = async () => {
  const list = await Task.findAll();
  console.log("task list: ", JSON.stringify(list, null, 2));
};
//getTaskList();

//findOne: get one task in the table
const getTaskById = async (id) => {
  const task = await Task.findOne({
    where: {
      id: id,
    },
  });
  console.log("get task by id: ", JSON.stringify(task, null, 2));
};
getTaskById(4);

//update 1 task
const updateTask = async (data, id) => {
  await Task.update(data, {
    where: { id },
  });
};
updateTask({ name: "learn front-end ", status: "DONE" }, 1);

//delete a task by Id
const deleteTaskById = async (id) => {
  await Task.destroy({ where: { id } });
};
deleteTaskById(19);

// sync model with table in mysql / model synchronization
const syncModel = async () => {
  await Task.sync({
    force: true, // delete the old table and create a new table
  });
  console.log("The table for the Tasks model was just (re)created!");
};
// syncModel();
// syncModel only one at the beginning

//check connection
const checkConnect = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully");
  } catch (err) {
    console.error("Unable to connect to the database");
    console.log(err);
  }
};
checkConnect();
