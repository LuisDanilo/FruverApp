export const getAuthHeaders = () => {
    return {
        'Fruver-Session-Id': localStorage.getItem('sessionId') || ""
    }
}