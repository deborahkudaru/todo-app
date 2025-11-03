// import { useQuery, useMutation } from "convex/react";
// import { api } from "@/convex/_generated/api";
// import { Id } from "@/convex/_generated/dataModel";

// // Define the Todo type based on your Convex schema
// export type Todo = {
//   _id: Id<"todos">;
//   text: string;
//   completed: boolean;
//   userId: string;
// };

// // For demo purposes
// const DEMO_USER_ID = "demo-user";

// export function useTodos() {
//   // Use the correct query from your convex API
//   const todos = useQuery(api.todos.getTodos, { userId: DEMO_USER_ID });
  
//   // Make sure these mutation names match your convex/todos.ts file
//   const addTodoMutation = useMutation(api.todos.addTodo);
//   const toggleTodoMutation = useMutation(api.todos.toggleTodo);
//   const deleteTodoMutation = useMutation(api.todos.deleteTodo);
//   const clearCompletedMutation = useMutation(api.todos.clearCompleted);

//   const addTodo = async (text: string) => {
//     await addTodoMutation({ text, userId: DEMO_USER_ID });
//   };

//   const toggleTodo = async (id: Id<"todos">, completed: boolean) => {
//     await toggleTodoMutation({ id, completed });
//   };

//   const deleteTodo = async (id: Id<"todos">) => {
//     await deleteTodoMutation({ id });
//   };

//   const clearCompleted = async () => {
//     await clearCompletedMutation({ userId: DEMO_USER_ID });
//   };

//   return {
//     todos: todos || [],
//     addTodo,
//     toggleTodo,
//     deleteTodo,
//     clearCompleted,
//   };
// }