// src/components/DraggableTodoItem.jsx
import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import TodoItem from "./TodoItem";

const DraggableTodoItem = ({
                               todo,
                               index,
                               onMoveTodo,
                               onToggleComplete,
                               onEdit,
                               onDelete,
                               darkMode,
                               editingTodo,
                               setEditingTodo,
                               updateTodo,
                           }) => {
    const ref = useRef(null);

    const [{ isDragging }, drag] = useDrag({
        type: "TODO",
        item: { index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [, drop] = useDrop({
        accept: "TODO",
        drop: (draggedItem, monitor) => {
            if (!monitor.didDrop()) {
                const { index: dragIndex } = draggedItem;
                const hoverIndex = index;
                if (dragIndex !== hoverIndex) {
                    onMoveTodo(dragIndex, hoverIndex);
                }
            }
        },
    });

    drag(drop(ref));

    return (
        <div
            ref={ref}
            style={{ opacity: isDragging ? 0.5 : 1, cursor: "move" }}
        >
            <div
                className={`rounded-2xl shadow-sm p-6 transition-all ${
                    darkMode ? "bg-gray-800" : "bg-white"
                } ${todo.completed ? "opacity-75" : ""}`}
            >
                <TodoItem
                    todo={todo}
                    onToggleComplete={() => onToggleComplete(todo)}
                    onEdit={() => onEdit(todo)}
                    onDelete={() => onDelete(todo)}
                    darkMode={darkMode}
                    isEditing={editingTodo === todo.id}
                    onSaveEdit={updateTodo}
                    onCancelEdit={() => setEditingTodo(null)}
                />
            </div>
        </div>
    );
};

export default DraggableTodoItem;