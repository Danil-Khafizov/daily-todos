
// src/components/TodoContainer.jsx
import React, { useState, useEffect, useRef } from "react";
import MainApp from "../MainApp/MainApp";
import { apiCall } from "../../api/api";
import { fireConfetti } from "../../utils/confettiCelebrate";

function TodoContainer({ user, darkMode, setDarkMode, error, setError, logout }) {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newTitle, setNewTitle] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [editingTodo, setEditingTodo] = useState(null);

    const todosRef = useRef([]);

    useEffect(() => {
        fetchTodos(user.token);
    }, [user]);

    useEffect(() => {
        const prevTodos = todosRef.current;
        todosRef.current = todos;
        const wereAllCompleted = prevTodos.length > 0 && prevTodos.every((t) => t.completed);
        const areAllCompleted = todos.length > 0 && todos.every((t) => t.completed);
        if (areAllCompleted && !wereAllCompleted) {
            fireConfetti();
        }
    }, [todos]);

    const fetchTodos = async (token) => {
        try {
            const data = await apiCall("/todo/", {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            });
            setTodos(data || []);
        } catch (err) {
            setError("Ошибка загрузки задач: " + err.message);
        }
    };

    const createTodo = async () => {
        if (!newTitle.trim()) return;
        setLoading(true);
        try {
            const newTodo = await apiCall("/todo/", {
                method: "POST",
                headers: { Authorization: `Bearer ${user.token}` },
                body: JSON.stringify({ title: newTitle, description: newDescription }),
            });
            setTodos([...todos, newTodo]);
            setNewTitle("");
            setNewDescription("");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const updateTodo = async (id, title, description, completed) => {
        try {
            const updatedTodo = await apiCall(`/todo/${id}`, {
                method: "PUT",
                headers: { Authorization: `Bearer ${user.token}` },
                body: JSON.stringify({ title, description, completed }),
            });
            setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
            setEditingTodo(null);
        } catch (err) {
            setError(err.message);
        }
    };

    const deleteTodo = async (id) => {
        try {
            await apiCall(`/todo/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${user.token}` },
            });
            setTodos(todos.filter((todo) => todo.id !== id));
        } catch (err) {
            setError(err.message);
        }
    };

    const toggleComplete = (todo) => {
        updateTodo(todo.id, todo.title, todo.description, !todo.completed);
    };

    const reorderTodos = (dragIndex, hoverIndex) => {
        const updatedList = [...todos];
        const [movedTodo] = updatedList.splice(dragIndex, 1);
        updatedList.splice(hoverIndex, 0, movedTodo);
        setTodos(updatedList);
    };

    return (
        <MainApp
            user={user}
            todos={todos}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            newTitle={newTitle}
            setNewTitle={setNewTitle}
            newDescription={newDescription}
            setNewDescription={setNewDescription}
            loading={loading}
            error={error}
            setError={setError}
            createTodo={createTodo}
            editingTodo={editingTodo}
            setEditingTodo={setEditingTodo}
            updateTodo={updateTodo}
            deleteTodo={deleteTodo}
            toggleComplete={toggleComplete}
            logout={logout}
            reorderTodos={reorderTodos}
        />
    );
}

export default TodoContainer;
