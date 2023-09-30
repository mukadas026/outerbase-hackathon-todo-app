import { AxiosError } from "axios";
import { client } from "./axios.js";
export const getTodos = async (categoryID) => {
    try {
        const res = await client.get("/get-todos", { params: { categoryID } });
        return {
            data: res.data?.response,
            status: res.status,
            message: res.statusText,
            success: true,
        };
    }
    catch (error) {
        if (error instanceof AxiosError) {
            const { status, message } = error;
            return {
                status,
                message,
                success: false,
                data: {},
            };
        }
        return {
            status: 400,
            message: "Couldn't fetch todos",
            success: false,
            data: {},
        };
    }
};
export const addTodo = async (body) => {
    try {
        const res = await client.post("/add-todo", body);
        console.log(res.data);
        return {
            status: res.status,
            data: res.data?.response,
            message: res.statusText,
            success: true,
        };
    }
    catch (error) {
        console.log(error);
        if (error instanceof AxiosError) {
            return { data: {}, success: false, status: error.status, message: error.message };
        }
        return {
            data: {},
            success: false,
            status: 400,
            message: "Category not found",
        };
    }
};
export const signUp = async (uniqueID, username, password) => {
    let data = null;
    try {
        console.log("signing-signUp");
        const res = await client.post("/sign-up", { id: uniqueID, username, password });
        // const res = await client.post('sign-up', {id: "12", username: "muka", password: "this"})
        console.log(res);
        data = res;
    }
    catch (err) {
        data = {
            success: false,
            // @ts-ignore
            message: err?.message,
            // @ts-ignore
            status: err?.response.status,
        };
        // @ts-ignore
        // console.dir(err)
        // console.log(err.message, err?.status)
    }
    return data;
};
export const signIn = async (username) => {
    let data = null;
    try {
        const res = await client.get("/sign-in", { data: { username } });
        if (res.status === 200) {
            data = res.data;
        }
    }
    catch (err) {
        console.log(err);
    }
    return data;
};
export const getCategories = async (userID) => {
    // console.log("userID", userID)
    let data = null;
    try {
        const res = await client.get("/categories", { params: { userID } });
        console.log(res.data);
        // if(res.status >= 200 && res.status < 300){
        data = res;
        // }
    }
    catch (error) {
        console.log(error);
        if (error instanceof AxiosError) {
            data = {
                success: false,
                message: error.message,
                status: error.status,
            };
        }
        else {
            data = {
                success: false,
                message: "couldn't fetch categories",
                status: 400,
            };
        }
    }
    return data;
};
export const addCategory = async (name, due, userID, uniqueID) => {
    let data = null;
    try {
        const res = await client.post("/add-category", { name, due, userID, id: uniqueID });
        console.log(res);
        data = res;
    }
    catch (error) {
        console.log(error);
        if (error instanceof AxiosError) {
            data = {
                success: false,
                message: error.message,
                status: error.status,
            };
        }
        else {
            data = {
                success: false,
                message: "something went wrong",
                status: 400,
            };
        }
    }
    return data;
};
export const getCategory = async (id) => {
    try {
        const res = await client.get("/get-category", { params: { id } });
        // console.log(res.data)
        return {
            success: true,
            status: res.status,
            data: res.data?.response,
            message: res.statusText,
        };
    }
    catch (error) {
        if (error instanceof AxiosError) {
            return {
                data: {},
                success: false,
                status: error.status,
                message: error.message,
            };
        }
        return {
            data: {},
            success: false,
            status: 400,
            message: "Category not found",
        };
    }
};
export const deleteTodo = async (id) => {
    try {
        const res = await client.delete('/delete-todo', { params: { id } });
        return { success: true };
    }
    catch (err) {
        console.log(err);
        return {
            success: false
        };
    }
};
export const getTodo = async (id) => {
    try {
        const res = await client.get('/get-todo', { params: { id } });
        return {
            data: res.data?.response,
            status: res.status
        };
    }
    catch (error) {
        console.log(error);
        if (error instanceof AxiosError) {
            return {
                data: {},
                status: error.status
            };
        }
        return {
            data: {},
            status: 400
        };
    }
};
export const updateTodo = async (todo) => {
    console.log(todo);
    try {
        const res = await client.put('/update-todo', todo);
        return {
            success: true
        };
    }
    catch (error) {
        console.log(error);
        return { success: false };
    }
};
//# sourceMappingURL=requests.js.map