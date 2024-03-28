const Task = require("../models/taskModel");

const queryTasks = async (filterOptions, sortOptions, page, limit) => {
  const match = {};
  const sort = {};

  if (filterOptions.status) {
    match.status = filterOptions.status;
  }
  if (filterOptions.category) {
    match.category = filterOptions.category;
  }

  const parts = sortOptions.split(":");
  sort[parts[0]] = parts[1] === "desc" ? -1 : 1;

  const skip = (page - 1) * limit;

  const tasks = await Task.find(match)
    .populate("category")
    .sort(sort)
    .skip(skip)
    .limit(limit);

  return tasks;
};

module.exports = queryTasks;
