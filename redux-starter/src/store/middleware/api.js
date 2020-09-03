import axios from "axios";

const api = ({ dispatch }) => next => async action => {
    if(action.type !== "apiCallBegan") return next(action);

    next(action);

    const { url, method, data, onSuccess, onFailure } = action.payload;
    try {
        const response = await axios.request({
            baseURL: "http://localhost:9001/api",
            url,
            method,
            data
        });
        dispatch({ type: onSuccess, payload: response.data });
    } catch(error) {
        dispatch({ type: onFailure, payload: { message: error.message, stack: error.stack } })
    }
}

export default api;