// src/App.jsx
import React, { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import AuthForm from "./components/AuthForm/AuthForm";
import TodoContainer from "./components/Todo/TodoContainer";
import { apiCall } from './api/api'; // из App.js

function App() {
    const [user, setUser] = useState(null);
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem("darkMode");
        return saved === "true";
    });

    useEffect(() => {
        localStorage.setItem("darkMode", darkMode);
    }, [darkMode]);

    useEffect(() => {
        const token = localStorage.getItem("todo_token");
        const savedUsername = localStorage.getItem("todo_username");
        if (token && savedUsername) {
            setUser({ username: savedUsername, token });
        }
    }, []);

    const handleAuth = async () => {
        if (!username.trim() || !password.trim()) {
            setError("Заполните все поля");
            return;
        }
        setLoading(true);
        setError("");
        try {
            if (isLogin) {
                const data = await apiCall("/auth/login", {
                    method: "POST",
                    body: JSON.stringify({ username, password }),
                });
                localStorage.setItem("todo_token", data.access_token);
                localStorage.setItem("todo_username", username);
                setUser({ username, token: data.access_token });
            } else {
                await apiCall("/auth/register", {
                    method: "POST",
                    body: JSON.stringify({ username, password }),
                });
                setError("Регистрация успешна! Теперь войдите в систему.");
                setIsLogin(true);
            }
            setUsername("");
            setPassword("");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem("todo_token");
        localStorage.removeItem("todo_username");
        setUser(null);
    };

    return (
        <DndProvider backend={HTML5Backend}>
            {!user ? (
                <div className={`min-h-screen flex items-center justify-center p-4 ${darkMode ? "bg-gray-900 text-gray-100" : "bg-blue-50 text-gray-900"}`}>
                    <AuthForm
                        isLogin={isLogin}
                        setIsLogin={setIsLogin}
                        username={username}
                        setUsername={setUsername}
                        password={password}
                        setPassword={setPassword}
                        loading={loading}
                        error={error}
                        setError={setError}
                        handleAuth={handleAuth}
                        darkMode={darkMode}
                        setDarkMode={setDarkMode}
                    />
                </div>
            ) : (
                <TodoContainer
                    user={user}
                    darkMode={darkMode}
                    setDarkMode={setDarkMode}
                    error={error}
                    setError={setError}
                    logout={logout}
                />
            )}
        </DndProvider>
    );
}

export default App;
