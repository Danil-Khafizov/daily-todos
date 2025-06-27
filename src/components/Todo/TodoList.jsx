// src/components/TodoList.jsx
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import DraggableTodoItem from "./DraggableTodoItem";

function TodoList({
                      todos,
                      filter,
                      onMoveTodo,
                      onToggleComplete,
                      onEdit,
                      onDelete,
                      darkMode,
                      editingTodo,
                      setEditingTodo,
                      updateTodo,
                  }) {
    const filteredTodos = todos.filter((todo) => {
        if (filter === "active") return !todo.completed;
        if (filter === "completed") return todo.completed;
        return true;
    });

    const remainingCount = todos.filter((todo) => !todo.completed).length;

    return (
        <>
            <motion.div layout className="space-y-4">
                <AnimatePresence>
                    {filteredTodos.length === 0 ? (
                        <motion.div
                            key="empty"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className={`rounded-2xl shadow-sm p-12 text-center ${
                                darkMode
                                    ? "bg-gray-800 text-gray-400"
                                    : "bg-white text-gray-400"
                            }`}
                        >
                            <h3>Нет задач для выбранного фильтра</h3>
                        </motion.div>
                    ) : (
                        filteredTodos.map((todo, index) => (
                            <motion.div
                                key={todo.id}
                                layout // добавили layout
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                transition={{ duration: 0.25 }}
                            >
                                <DraggableTodoItem
                                    todo={todo}
                                    index={index}
                                    onMoveTodo={onMoveTodo}
                                    onToggleComplete={onToggleComplete}
                                    onEdit={onEdit}
                                    onDelete={onDelete}
                                    darkMode={darkMode}
                                    editingTodo={editingTodo}
                                    setEditingTodo={setEditingTodo}
                                    updateTodo={updateTodo}
                                />
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>
            </motion.div>

            <div
                className={`mt-6 text-center font-semibold select-none ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                }`}
            >
                Осталось выполнить задач: {remainingCount}
            </div>
        </>
    );
}

export default TodoList;
