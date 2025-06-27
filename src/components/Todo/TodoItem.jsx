// src/components/TodoItem.jsx
import React, { useState } from "react";
import { Edit2, Trash2, Check } from "lucide-react";


function TodoItem({ todo, onToggleComplete, onEdit, onDelete, darkMode, isEditing, onSaveEdit, onCancelEdit }) {
    const [editTitle, setEditTitle] = useState(todo.title);
    const [editDescription, setEditDescription] = useState(todo.description);
    const [editCompleted, setEditCompleted] = useState(todo.completed);

    if (isEditing) {
        return (
            <div className="flex flex-col gap-3 w-full">
                <input
                    className={`px-4 py-2 rounded border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    placeholder="Название"
                />
                <textarea
                    className={`px-4 py-2 rounded border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    placeholder="Описание"
                />
                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={editCompleted}
                        onChange={(e) => setEditCompleted(e.target.checked)}
                    />
                    <span className={darkMode ? "text-white" : ""}>Выполнено</span>
                </label>
                <div className="flex gap-2 mt-2">
                    <button
                        onClick={() => onSaveEdit(todo.id, editTitle, editDescription, editCompleted)}
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                        Сохранить
                    </button>
                    <button
                        onClick={onCancelEdit}
                        className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                    >
                        Отмена
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-start gap-4">
            <button
                onClick={onToggleComplete}
                className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors ${
                    todo.completed
                        ? "bg-indigo-600 border-indigo-600 text-white"
                        : darkMode
                            ? "border-gray-500 text-gray-500 hover:bg-gray-700 hover:text-indigo-400"
                            : "border-gray-300 text-gray-300 hover:bg-indigo-100 hover:text-indigo-600"
                }`}
                aria-label="Переключить состояние задачи"
            >
                {todo.completed && <Check className="w-4 h-4" />}
            </button>
            <div className="flex-1">
                <h3 className={`font-semibold text-lg ${todo.completed ? "line-through" : ""}`}>
                    {todo.title}
                </h3>
                {todo.description && <p className="text-sm">{todo.description}</p>}
            </div>
            <div className="flex items-center gap-2">
                <button onClick={onEdit} aria-label="Редактировать">
                    <Edit2 className="w-4 h-4" />
                </button>
                <button onClick={onDelete} aria-label="Удалить">
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}

export default TodoItem;