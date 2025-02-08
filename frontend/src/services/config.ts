const API_BASE_URL = import.meta.env.VITE_API_BASE_URL


const API_ENDPOINTS = {
    AUTH: {
        LOGIN: `${API_BASE_URL}/auth/login`,
        REGISTER: `${API_BASE_URL}/auth/register`,
    },
    USER: {
        PROFILE: `${API_BASE_URL}/profile`,
        UPDATE: `${API_BASE_URL}/profile/update`,
        CHANGE_PASSWORD: `${API_BASE_URL}/profile/change-password`,
        FETCH_USER: (userId: string) => `${API_BASE_URL}/user/${userId}`,
    },
    EXPENSES: {
        BASE: `${API_BASE_URL}/expenses`,
        GROUP: (groupId: string) => `${API_BASE_URL}/expenses/${groupId}`,
        DELETE: (expenseId: string) => `${API_BASE_URL}/expenses/${expenseId}`,
    },
    GROUPS: {
        BASE: `${API_BASE_URL}/groups`,
        JOIN: `${API_BASE_URL}/groups/join`,
        SINGLE: (groupId: string) => `${API_BASE_URL}/groups/${groupId}`,
    },
    SETTLEMENTS: {
        BASE: `${API_BASE_URL}/settlements`,
        GROUP: (groupId: string) => `${API_BASE_URL}/settlements/group/${groupId}`,
        BULK: `${API_BASE_URL}/settlements/bulk`,
        SINGLE: (settlementId: string) => `${API_BASE_URL}/settlements/${settlementId}`,
    },
};

export { API_BASE_URL, API_ENDPOINTS };
