import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Feather } from "@expo/vector-icons";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

interface HomeScreenProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

export default function HomeScreen({ theme, toggleTheme }: HomeScreenProps) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState<string>("");

  const addTodo = (): void => {
    if (!text.trim()) return;
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
    };
    setTodos((prev) => [newTodo, ...prev]);
    setText("");
  };

  const toggleComplete = (id: string): void => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTodo = (id: string): void => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const isDark = theme === "dark";

  return (
    <SafeAreaView
      className={`flex-1 ${isDark ? "bg-[#1E1E1E]" : "bg-[#FAFAFA]"} px-5`}
    >
      {/* Header */}
      <View className="flex-row justify-between items-center mt-12">
        <Text
          className={`text-3xl font-bold tracking-widest ${
            isDark ? "text-white" : "text-black"
          }`}
        >
          TODO
        </Text>

        <TouchableOpacity onPress={toggleTheme}>
          {isDark ? (
            <Feather name="sun" size={24} color="#fff" />
          ) : (
            <Feather name="moon" size={24} color="#000" />
          )}
        </TouchableOpacity>
      </View>

      {/* Input */}
      <View
        className={`rounded-xl mt-6 px-4 py-3 ${
          isDark ? "bg-[#2C2C2C]" : "bg-white"
        }`}
      >
        <TextInput
          placeholder="Create a new todo..."
          placeholderTextColor={isDark ? "#999" : "#888"}
          value={text}
          onChangeText={setText}
          onSubmitEditing={addTodo}
          className={`text-base ${isDark ? "text-white" : "text-black"}`}
        />
      </View>

      {/* Todo List */}
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        className="mt-4"
        renderItem={({ item }) => (
          <View
            className={`flex-row items-center justify-between rounded-xl px-4 py-3 mb-2 ${
              isDark ? "bg-[#2C2C2C]" : "bg-white"
            }`}
          >
            <TouchableOpacity onPress={() => toggleComplete(item.id)}>
              <View
                className={`w-5 h-5 rounded-full border border-gray-400 items-center justify-center ${
                  item.completed ? "bg-blue-500" : ""
                }`}
              >
                {item.completed && (
                  <Feather name="check" size={14} color="#fff" />
                )}
              </View>
            </TouchableOpacity>

            <Text
              className={`flex-1 ml-3 text-base ${
                item.completed
                  ? "text-gray-400 line-through"
                  : isDark
                  ? "text-white"
                  : "text-black"
              }`}
            >
              {item.text}
            </Text>

            <TouchableOpacity onPress={() => deleteTodo(item.id)}>
              <Feather name="x" size={20} color="#999" />
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text className="text-center text-gray-400 mt-10">
            No todos yet 📝
          </Text>
        }
      />
    </SafeAreaView>
  );
}
