require("../src/db/mongoose");
const Task = require("../src/models/task");

const deleteTaskAndCount = async id => {
  const task = await Task.findByIdAndDelete(id);
  const count = await Task.countDocuments({ completed: false });

  return count;
};

deleteTaskAndCount("5d8f4e06cdf0cb08a60c5422")
  .then(result => console.log(result))
  .catch(e => console.log(e));
