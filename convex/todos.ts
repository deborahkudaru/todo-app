import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Get all todos ordered by order field
export const getTodos = query({
  handler: async (ctx) => {
    const todos = await ctx.db.query("todos").collect();
    return todos.sort((a, b) => a.order - b.order);
  },
});

// Get active todos
export const getActiveTodos = query({
  handler: async (ctx) => {
    const todos = await ctx.db.query("todos").collect();
    const filtered = todos.filter((todo) => !todo.isCompleted);
    return filtered.sort((a, b) => a.order - b.order);
  },
});

// Get completed todos
export const getCompletedTodos = query({
  handler: async (ctx) => {
    const todos = await ctx.db.query("todos").collect();
    const filtered = todos.filter((todo) => todo.isCompleted);
    return filtered.sort((a, b) => a.order - b.order);
  },
});

// Create a new todo
export const createTodo = mutation({
  args: { text: v.string() },
  handler: async (ctx, args) => {
    // Get all todos to find the highest order
    const todos = await ctx.db.query("todos").collect();
    const maxOrder = todos.length > 0
      ? Math.max(...todos.map(t => t.order))
      : -1;

    const todoId = await ctx.db.insert("todos", {
      text: args.text,
      isCompleted: false,
      order: maxOrder + 1,
      createdAt: Date.now(),
    });
    return todoId;
  },
});

// Toggle todo completion
export const toggleTodo = mutation({
  args: { id: v.id("todos") },
  handler: async (ctx, args) => {
    const todo = await ctx.db.get(args.id);
    if (!todo) {
      console.warn(`Todo not found for toggle: ${args.id}`);
      return;
    }

    await ctx.db.patch(args.id, {
      isCompleted: !todo.isCompleted,
    });
  },
});

// Delete a todo - FIXED VERSION
export const deleteTodo = mutation({
  args: { id: v.id("todos") },
  handler: async (ctx, args) => {
    const todo = await ctx.db.get(args.id);

    // Check if todo exists before deleting
    if (!todo) {
      console.warn(`Attempted to delete nonexistent todo: ${args.id}`);
      return;
    }

    await ctx.db.delete(args.id);
  },
});

// Clear completed todos
export const clearCompleted = mutation({
  handler: async (ctx) => {
    const todos = await ctx.db.query("todos").collect();
    const completedTodos = todos.filter((todo) => todo.isCompleted);

    await Promise.all(
      completedTodos.map((todo) => ctx.db.delete(todo._id))
    );
  },
});

// Reorder todos (for drag and drop)
export const reorderTodos = mutation({
  args: {
    todoId: v.id("todos"),
    newOrder: v.number(),
  },
  handler: async (ctx, args) => {
    const allTodos = await ctx.db.query("todos").collect();
    const sortedTodos = allTodos.sort((a, b) => a.order - b.order);

    const todoToMove = sortedTodos.find((t) => t._id === args.todoId);
    if (!todoToMove) {
      console.warn(`Todo not found for reorder: ${args.todoId}`);
      return;
    }

    const oldOrder = todoToMove.order;
    const newOrder = args.newOrder;

    // Update orders for affected todos
    const updates = sortedTodos.map((todo) => {
      if (todo._id === args.todoId) {
        return { id: todo._id, order: newOrder };
      }

      // Shift other todos
      if (oldOrder < newOrder) {
        // Moving down
        if (todo.order > oldOrder && todo.order <= newOrder) {
          return { id: todo._id, order: todo.order - 1 };
        }
      } else {
        // Moving up
        if (todo.order >= newOrder && todo.order < oldOrder) {
          return { id: todo._id, order: todo.order + 1 };
        }
      }

      return null;
    }).filter((update): update is { id: any; order: number } => update !== null);

    // Apply all updates
    await Promise.all(
      updates.map((update) =>
        ctx.db.patch(update.id, { order: update.order })
      )
    );
  },
});

// Bulk update todos order (better for drag and drop)
export const updateTodosOrder = mutation({
  args: {
    todos: v.array(v.object({
      id: v.id("todos"),
      order: v.number()
    }))
  },
  handler: async (ctx, args) => {
    await Promise.all(
      args.todos.map(todo =>
        ctx.db.patch(todo.id, { order: todo.order })
      )
    );
  },
});