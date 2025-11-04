import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/context/ThemeContext";
import Header from "@/components/header";
import TodoInput from "@/components/todo-input";
import TodoList from "@/components/todo-list";
import TodoFilter from "@/components/todo-filter";
import { Text, View, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

export default function HomeScreen() {
  const { currentTheme } = useTheme(); // Change this from 'theme' to 'currentTheme'
  const [text, setText] = useState<string>("");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  const allTodos = useQuery(api.todos.getTodos);
  const activeTodos = useQuery(api.todos.getActiveTodos);
  const completedTodos = useQuery(api.todos.getCompletedTodos);

  const createTodo = useMutation(api.todos.createTodo);
  const toggleTodo = useMutation(api.todos.toggleTodo);
  const deleteTodo = useMutation(api.todos.deleteTodo);
  const clearCompletedMutation = useMutation(api.todos.clearCompleted);

  const todos =
    filter === "all"
      ? allTodos
      : filter === "active"
        ? activeTodos
        : completedTodos;

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
  const isDark = currentTheme === "dark"; // Use currentTheme here

  return (
    <SafeAreaView className="flex-1">
      {/* 🌆 Top section with background image and gradient overlay */}
      <ImageBackground
        source={
          isDark
            ? require("@/assets/images/bg-image-dark.png")
            : require("@/assets/images/bg-image.png")
        }
        className="relative"
        resizeMode="cover"
      >
        <LinearGradient
          colors={["rgba(192, 88, 243, 0.8)", "rgba(85, 221, 255, 0.8)"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        />

        <View className="pb-14 px-6">
          <Header />
          <View className="mt-8">
            <TodoInput value={text} onChangeText={setText} onSubmit={addTodo} />
          </View>
        </View>
      </ImageBackground>

      <View className={`flex-1 ${isDark ? "bg-[#14151F]" : "bg-[#FAFAFA]"}`}>
        <View className="flex-1 px-6 pt-6">
          <View className="-mt-14 mb-6">
            <TodoList
              todos={todos || []}
              onToggleComplete={toggleComplete}
              onDelete={handleDeleteTodo}
              itemsLeft={itemsLeft}
              onClearCompleted={clearCompleted}
            />
          </View>

          <TodoFilter filter={filter} onFilterChange={setFilter} />

          <View className="flex-1" />
          <Text
            className={`text-center mb-8 text-sm ${
              isDark ? "text-[#5B5E7E]" : "text-[#9495A5]"
            }`}
          >
            Drag and drop to reorder list
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}