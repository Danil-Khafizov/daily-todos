// src/api.js
const API_BASE = "https://todo.radixs.ru/api";

export const apiCall = async (endpoint, options = {}) => {
    try {
        const { headers, ...restOptions } = options;
        const response = await fetch(`${API_BASE}${endpoint}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                ...(headers || {}),
            },
            ...restOptions,
        });
        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(errorData || `HTTP ${response.status}`);
        }
        if (response.status === 204) return null;
        return await response.json();
    } catch (err) {
        throw new Error(err.message || "Ошибка сети");
    }
};