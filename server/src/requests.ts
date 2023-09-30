import { Axios, AxiosError } from "axios"
import { client } from "./axios.js"
import { ITodo } from "./types.js"

export const getTodos = async (categoryID: string) => {
	try {
		const res = await client.get("/get-todos", { params: { categoryID } })
		return {
			data: res.data?.response,
			status: res.status,
			message: res.statusText,
			success: true,
		}
	} catch (error) {
		if (error instanceof AxiosError) {
			const { status, message } = error
			return {
				status,
				message,
				success: false,
				data: {},
			}
		}
		return {
			status: 400,
			message: "Couldn't fetch todos",
			success: false,
			data: {},
		}
	}
}

export const addTodo = async (body: ITodo) => {
	try {
		const res = await client.post("/add-todo", body)
		console.log(res.data)
		return {
			status: res.status,
			data: res.data?.response,
			message: res.statusText,
			success: true,
		}
	} catch (error) {
		console.log(error)
		if (error instanceof AxiosError) {
			return { data: {}, success: false, status: error.status, message: error.message }
		}
		return {
			data: {},
			success: false,
			status: 400,
			message: "Category not found",
		}
	}
}

export const signUp = async (uniqueID: string, username: string, password: string) => {
	try {
		console.log("signing-signUp")
		const res = await client.post("/sign-up", { id: uniqueID, username, password })
		// const res = await client.post('sign-up', {id: "12", username: "muka", password: "this"})
		console.log(res)
		return {
			success: true,
			message: res.statusText,
			status: res.status,
			data: res.data
		}
	} catch (err) {
		if (err instanceof AxiosError) {
			return {
				success: false,
				message: err.message,
				status: err.status,
				data: {},
			}
		}
		return {
			success: false,
			message: "something went wrong",
			status: 400,
			data: {},
		}

		// @ts-ignore
		// console.dir(err)
		// console.log(err.message, err?.status)
	}
}

export const signIn = async (username: string) => {
	let data = null
	try {
		const res = await client.get("/sign-in", { data: { username } })
		if (res.status === 200) {
			data = res.data
		}
	} catch (err) {
		console.log(err)
	}
	return data
}

export const getCategories = async (userID: string) => {
	// console.log("userID", userID)
	let data = null
	try {
		const res = await client.get("/categories", { params: { userID } })
		console.log(res.data)
		// if(res.status >= 200 && res.status < 300){
		data = res
		// }
	} catch (error) {
		console.log(error)
		if (error instanceof AxiosError) {
			data = {
				success: false,
				message: error.message,
				status: error.status,
			}
		} else {
			data = {
				success: false,
				message: "couldn't fetch categories",
				status: 400,
			}
		}
	}
	return data
}

export const addCategory = async (name: string, due: string, userID: string, uniqueID: string) => {
	let data = null
	try {
		const res = await client.post("/add-category", { name, due, userID, id: uniqueID })
		console.log(res)
		data = res
	} catch (error) {
		console.log(error)
		if (error instanceof AxiosError) {
			data = {
				success: false,
				message: error.message,
				status: error.status,
			}
		} else {
			data = {
				success: false,
				message: "something went wrong",
				status: 400,
			}
		}
	}
	return data
}

export const getCategory = async (id: string) => {
	try {
		const res = await client.get("/get-category", { params: { id } })
		// console.log(res.data)
		return {
			success: true,
			status: res.status,
			data: res.data?.response,
			message: res.statusText,
		}
	} catch (error) {
		if (error instanceof AxiosError) {
			return {
				data: {},
				success: false,
				status: error.status,
				message: error.message,
			}
		}
		return {
			data: {},
			success: false,
			status: 400,
			message: "Category not found",
		}
	}
}

export const deleteTodo = async (id: string) => {
	try {
		const res = await client.delete("/delete-todo", { params: { id } })
		return { success: true }
	} catch (err) {
		console.log(err)
		return {
			success: false,
		}
	}
}

export const getTodo = async (id: string) => {
	try {
		const res = await client.get("/get-todo", { params: { id } })
		return {
			data: res.data?.response,
			status: res.status,
		}
	} catch (error) {
		console.log(error)
		if (error instanceof AxiosError) {
			return {
				data: {},
				status: error.status,
			}
		}
		return {
			data: {},
			status: 400,
		}
	}
}

export const updateTodo = async (todo: ITodo) => {
	console.log(todo)
	try {
		const res = await client.put("/update-todo", todo)
		return {
			success: true,
		}
	} catch (error) {
		console.log(error)
		return { success: false }
	}
}
