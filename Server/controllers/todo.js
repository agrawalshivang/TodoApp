import mongoose from "mongoose";
import Todo from "../models/todo.js";

export const getData = async (req, res) => {
  const user = res.locals.user;
  const todos = await Todo.find({ userId: user._id });
  var dtodo = [],
    ntodo = [];
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].done) dtodo.push(todos[i]);
    else ntodo.push(todos[i]);
  }
  res.json({ dtodos: dtodo, ntodos: ntodo, user: user });
};
export const createTodo = async (req, res) => {
  const user = res.locals.user;
  const todo = await new Todo({
    userId: user._id,
    value: req.body.add,
    done: false,
  });
  await todo.save();
  const todos = await Todo.find({ userId: user._id });
  var dtodo = [],
    ntodo = [];
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].done) dtodo.push(todos[i]);
    else ntodo.push(todos[i]);
  }
  res.json({ dtodos: dtodo, ntodos: ntodo, user: user });
};
export const updateTodo = (req, res) => {};
export const deleteTodo = async (req, res) => {
  const user = res.locals.user;

  await Todo.deleteOne({ _id: req.body.id });

  const todos = await Todo.find({ userId: user._id });
  var dtodo = [],
    ntodo = [];
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].done) dtodo.push(todos[i]);
    else ntodo.push(todos[i]);
  }
  res.json({ dtodos: dtodo, ntodos: ntodo, user: user });
};
export const doneTodo = async (req, res) => {
  const user = res.locals.user;

  const todo = await Todo.findById(req.body.id);
  todo.done = true;
  await todo.save();
  const todos = await Todo.find({ userId: user._id });
  var dtodo = [],
    ntodo = [];
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].done) dtodo.push(todos[i]);
    else ntodo.push(todos[i]);
  }
  res.json({ dtodos: dtodo, ntodos: ntodo, user: user });
};
export const undoTodo = async (req, res) => {
  const user = res.locals.user;

  const todo = await Todo.findById(req.body.id);
  todo.done = false;
  await todo.save();
  const todos = await Todo.find({ userId: user._id });
  var dtodo = [],
    ntodo = [];
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].done) dtodo.push(todos[i]);
    else ntodo.push(todos[i]);
  }
  res.json({ dtodos: dtodo, ntodos: ntodo, user: user });
};
