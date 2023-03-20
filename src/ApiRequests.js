import axios from "axios"

export const baseURL = "http://localhost:8080/api/v1"

export const basePostRequest = (url, data, token, type) => {
    if (type === "a") {
        return axios.post(url, data,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );
    } else if (type === "u") {
        return axios.post(url, data);
    }
}

export const baseGetRequest = (url, token, type) => {
    if (type === "a") {
        return axios.get(url,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        ).catch(
            err => {
                const { response } = err;
                return response;
            }
        );
    } else if (type === "u") {
        return axios.get(url);

    }
}