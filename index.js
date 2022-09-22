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
createTask("Learn Vuejs", "DONE");

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
