// src/components/AuthForm.jsx
import React from "react";
import { User, Moon, Sun } from "lucide-react";

function AuthForm({
                      isLogin,
                      setIsLogin,
                      username,
                      setUsername,
                      password,
                      setPassword,
                      loading,
                      error,
                      setError,
                      handleAuth,
                      darkMode,
                      setDarkMode,
                  }) {
    return (
        <div className={`rounded-2xl shadow-xl p-8 w-full max-w-md ${darkMode ? "bg-gray-900" : "bg-white"}`}>
            <div className="text-center mb-8">
                <div className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-4 ${darkMode ? "bg-indigo-700" : "bg-indigo-100"}`}>
                    <User className={`w-6 h-6 ${darkMode ? "text-indigo-300" : "text-indigo-600"}`} />
                </div>
                <h1 className={`${darkMode ? "text-gray-100" : "text-gray-900"} text-2xl font-bold`}>
                    {isLogin ? "Вход в систему" : "Регистрация"}
                </h1>
            </div>
            <div className="space-y-4">
                <div>
                    <input
                        type="text"
                        placeholder="Имя пользователя"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent ${
                            darkMode ? "bg-gray-800 border-gray-700 text-gray-200 focus:ring-indigo-500" : "border-gray-200 focus:ring-indigo-500"
                        }`}
                        disabled={loading}
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent ${
                            darkMode ? "bg-gray-800 border-gray-700 text-gray-200 focus:ring-indigo-500" : "border-gray-200 focus:ring-indigo-500"
                        }`}
                        disabled={loading}
                    />
                </div>
                {error && (
                    <div className={`p-3 rounded-lg text-sm ${
                        darkMode ? "bg-red-700 border-red-600 text-red-200" : "bg-red-50 border-red-200 text-red-700"
                    } border`}>
                        {error}
                    </div>
                )}
                <button
                    type="button"
                    onClick={handleAuth}
                    disabled={loading}
                    className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 disabled:opacity-50 font-medium transition-colors"
                >
                    {loading ? "Загрузка..." : isLogin ? "Войти" : "Зарегистрироваться"}
                </button>
            </div>
            <div className="mt-6 text-center">
                <button
                    onClick={() => {
                        setIsLogin(!isLogin);
                        setError("");
                    }}
                    className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                >
                    {isLogin ? "Нет аккаунта? Зарегистрируйтесь" : "Уже есть аккаунт? Войти"}
                </button>
            </div>
            <div className="mt-6 text-center">
                <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="flex items-center justify-center gap-2 mx-auto px-4 py-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                    {darkMode ? (
                        <>
                            <Sun className="w-5 h-5" />
                            Светлая тема
                        </>
                    ) : (
                        <>
                            <Moon className="w-5 h-5" />
                            Тёмная тема
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}

export default AuthForm;