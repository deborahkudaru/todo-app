import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/context/ThemeContext";
import Header from "@/components/header";
import TodoInput from "@/components/todo-input";
import TodoList from "@/components/todo-list";
import TodoFooter from "@/components/todo-footer";
import { Text, View } from "react-native";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

export default function HomeScreen() {
  const { theme } = useTheme();
  const [text, setText] = useState<string>("");
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  // Convex queries
  const allTodos = useQuery(api.todos.getTodos);
  const activeTodos = useQuery(api.todos.getActiveTodos);
  const completedTodos = useQuery(api.todos.getCompletedTodos);

  // Convex mutations
  const createTodo = useMutation(api.todos.createTodo);
  const toggleTodo = useMutation(api.todos.toggleTodo);
  const deleteTodo = useMutation(api.todos.deleteTodo);
  const clearCompletedMutation = useMutation(api.todos.clearCompleted);

  // Get filtered todos based on current filter
  const todos = 
    filter === 'all' ? allTodos :
    filter === 'active' ? activeTodos :
    completedTodos;

  const addTodo = async (): Promise<void> => {
    if (!text.trim()) return;
    await createTodo({ text: text.trim() });
    setText("");
  };

  const toggleComplete = async (id: Id<"todos">): Promise<void> => {
    await toggleTodo({ id });
  };

  const handleDeleteTodo = async (id: Id<"todos">): Promise<void> => {
    await deleteTodo({ id });
  };

  const clearCompleted = async (): Promise<void> => {
    await clearCompletedMutation();
  };

  const itemsLeft = activeTodos?.length ?? 0;
  const isDark = theme === "dark";

  return (
    <SafeAreaView
      className={`flex-1 ${isDark ? "bg-[#1E1E1E]" : "bg-[#FAFAFA]"} px-6 pt-12`}
    >
      <Header />
      
      <View className="mt-8">
        <TodoInput 
          value={text}
          onChangeText={setText}
          onSubmit={addTodo}
        />
        
        <TodoList
          todos={todos || []}
          onToggleComplete={toggleComplete}
          onDelete={handleDeleteTodo}
        />
        
        <TodoFooter
          itemsLeft={itemsLeft}
          onClearCompleted={clearCompleted}
          filter={filter}
          onFilterChange={setFilter}
        />
      </View>

      <Text className={`text-center mt-8 text-sm ${isDark ? 'text-[#5B5E7E]' : 'text-[#9495A5]'}`}>
        Drag and drop to reorder list
      </Text>
    </SafeAreaView>
  );
}