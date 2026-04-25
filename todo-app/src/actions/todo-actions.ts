"use server"

import {createTodoSchema} from "@/validations/todo";
import connectDB from "@/lib/db";
import Todo from "@/model/todo";
import {revalidatePath} from "next/cache";

export async function createTodo(data) {
  try {
    const validatedData = createTodoSchema.parse(data);

    await connectDB();

    const todo = await Todo.create(validatedData);

    revalidatePath("/")
    return {
      success: true,
      data: JSON.parse(JSON.stringify(todo))
    }
  } catch (e) {
    console.error("Error creating todo: ", e);
    return {
      success: false,
      error: e ? e.message : "Failed to created job"
    }
  }
}

export async function getTodos() {
  try {
    await connectDB();

    const todos = await Todo.find({}).sort({createdAt: -1});

    return {
      success: true,
      data: JSON.parse(JSON.stringify(todos))
    }
  } catch (e) {
    console.error(e);
    return {
      success: false,
      error: "Failed to get todos"
    }
  }
}

export async function toggleTodo(id) {
  try {
    await connectDB();

    const todo = await Todo.findById(id)

    if (!todo) {
      return {
        success: false,
        error: "No todos found"
      }
    }

    todo.completed = !todo.completed;

    await todo.save();

    revalidatePath("/")

    return {
      success: true,
      data: JSON.parse(JSON.stringify(todo))
    }
  } catch (e) {
    console.error("Error toggling todo", e);
    return {
      success: false,
      error: "Failed toggling todo"
    }
  }
}

export async function deleteTodo(id) {
  try {
    await connectDB();

    const todo = await Todo.findByIdAndDelete(id);

    if (!todo) {
      return {
        success: false,
        error: "No todos found"
      }
    }

    revalidatePath("/")

    return {
      success: true,
      data: JSON.parse(JSON.stringify(todo))
    }
  } catch (e) {
    console.error("Error delete todo", e);
    return {
      success: false,
      error: "Failed delete todo"
    }
  }
}