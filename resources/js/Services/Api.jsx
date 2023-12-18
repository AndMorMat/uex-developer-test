export function Api() {
    const token = localStorage.getItem("token");
    const post = (endpoint, params) => {
        return fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
            },
            body: JSON.stringify(params),
        });
    };

    const put = (endpoint, params) => {
        return fetch(endpoint, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
            },
            body: JSON.stringify(params),
        });
    };

    const get = (endpoint) => {
        return fetch(endpoint, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
            },
        });
    };

    const remove = (endpoint) => {
        return fetch(endpoint, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
            },
        });
    };

    return {
        get,
        post,
        put,
        remove,
    };
}
