// src/components/MainApp.jsx
import React, { useState } from "react";
import TodoList from "../Todo/TodoList";


function MainApp({
                     user,
                     todos,
                     darkMode,
                     setDarkMode,
                     newTitle,
                     setNewTitle,
                     newDescription,
                     setNewDescription,
                     loading,
                     error,
                     setError,
                     createTodo,
                     editingTodo,
                     setEditingTodo,
                     updateTodo,
                     deleteTodo,
                     toggleComplete,
                     logout,
                     reorderTodos,
                 }) {
    const [filter, setFilter] = useState("all");


    return (
        <div className={darkMode ? "dark" : ""}>
            <div className={`min-h-screen ${darkMode ? "bg-gray-900 text-gray-100" : "bg-blue-50 text-gray-900"}`}>
                <div className="container mx-auto px-4 py-8 max-w-4xl">
                    <div className={`rounded-2xl shadow-sm p-6 mb-8 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className={`text-3xl font-bold ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
                                    Мои задачи
                                </h1>
                                <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
                                    Добро пожаловать, {user.username}!
                                </p>
                            </div>
                            <div className="flex items-center gap-4">
                                <button onClick={() => setDarkMode(!darkMode)}>
                                    {darkMode ? "🌞 Светлая тема" : "🌙 Тёмная тема"}
                                </button>
                                <button onClick={logout}>Выйти</button>
                            </div>
                        </div>
                    </div>

                    {/* Форма добавления задачи */}
                    <div className={`rounded-2xl shadow-sm p-6 mb-6 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Название задачи"
                                value={newTitle}
                                onChange={(e) => setNewTitle(e.target.value)}
                                className={`w-full px-4 py-3 border rounded-lg ${
                                    darkMode ? "bg-gray-700 border-gray-600" : "border-gray-200"
                                }`}
                            />
                            <textarea
                                placeholder="Описание (необязательно)"
                                value={newDescription}
                                onChange={(e) => setNewDescription(e.target.value)}
                                rows={3}
                                className={`w-full px-4 py-3 border rounded-lg resize-none ${
                                    darkMode ? "bg-gray-700 border-gray-600" : "border-gray-200"
                                }`}
                            />
                            <button
                                onClick={createTodo}
                                disabled={loading || !newTitle.trim()}
                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 h-11 rounded-md"
                            >
                                Добавить задачу
                            </button>
                        </div>
                    </div>

                    {/* Фильтры */}
                    <div className="flex justify-center mb-6 space-x-4">
                        {["all", "active", "completed"].map((id) => (
                            <button
                                key={id}
                                onClick={() => setFilter(id)}
                                className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 shadow-md ${
                                    filter === id
                                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:from-blue-700 hover:to-purple-700 hover:shadow-xl"
                                        : darkMode
                                            ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                }`}
                            >
                                {id === "all"
                                    ? "Все"
                                    : id === "active"
                                        ? "Активные"
                                        : "Завершённые"}
                            </button>

                        ))}
                    </div>

                    {/* Список задач */}
                    <TodoList
                        todos={todos}
                        filter={filter}
                        onMoveTodo={reorderTodos}
                        onToggleComplete={toggleComplete}
                        onEdit={(todo) => setEditingTodo(todo.id)}
                        onDelete={(todo) => deleteTodo(todo.id)} // ✅ Передаём id задачи
                        darkMode={darkMode}
                        editingTodo={editingTodo}
                        setEditingTodo={setEditingTodo}
                        updateTodo={updateTodo}
                    />
                </div>
            </div>
        </div>
    );
}

export default MainApp;