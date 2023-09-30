import axios, { AxiosHeaders, AxiosResponse } from "axios"
import express, { Application } from "express"
import { ITodo } from "./types.js"
import {
	addCategory,
	addTodo,
	deleteTodo,
	getCategories,
	getCategory,
	getTodo,
	getTodos,
	signIn,
	signUp,
	updateTodo,
} from "./requests.js"
import { default as cors, CorsOptions } from "cors"
import { compare, generateHash } from "./util/Hash.js"
import { generateID } from "./util/ID.js"

const app: Application = express()
app.use(express.json())
app.use(cors())
const port = 7000

const corsOptions: CorsOptions = {
	origin: ["http://localhost:3000", "http://localhost:3000/sign-up"],
}

// app.get("/", cors(corsOptions), async (req, res) => {
// 	console.log("geting")
// 	const data = await getTodos()
// 	console.log(data)
// 	const response = {
// 		success: data?.success,
// 		data: data?.response.items,
// 	}
// 	res.send([...data?.response.items]).status(200)
// })

// app.post("/", cors(corsOptions), async (req, res) => {
// 	const { title, details, deadline }: ITodo = req.body
// 	let isSuccess = false
// 	const sendData = {
// 		todos: null,
// 		isSuccess: false,
// 	}
// 	const post = await addTodo(req.body)
// 	if (post !== null) {
// 		sendData.isSuccess = true
// 		sendData.todos = post
// 	}

// 	console.log(req.body)
// 	res.send(sendData).status(200)
// })

app.post("/sign-up", async (req, res) => {
	const { username, password } = req.body

	// console.log(username, password)
	const hashedPassword = await generateHash(password)
	// console.log(hashedPassword)
	const uniqueID = generateID()
	try {
		const userCred = await signUp(uniqueID, username, hashedPassword)
		console.log(userCred)
		if(userCred.success){
			// @ts-ignore
			res.send({id: uniqueID, username}).status(userCred?.status)
		}else{
			res.status(400).send("something went wrong")
		}
	} catch (err) {
		// @ts-ignore
		const status = Number(err.message)
		console.log(status)
		// res.send({ message: "sign up failed, please try again" }).status(status)
		res.status(status).json({ error: "sign up failed, please try again" })
		console.log(err)
	}
})

app.post("/sign-in", async (req, res) => {
	const { username, password } = req.body
	const hashedPassword = await generateHash(password)

	const userCred = await signIn(username)
	console.log(userCred)
	const userInfo = userCred.response.items[0]
	if (userInfo) {
		const confirmPassword = await compare(password, userInfo.password)
		// console.log(hashedPassword === userInfo.password)

		res.send({ username: userInfo.username, password: confirmPassword, id: userInfo.id }).status(200)
	} else {
		res.status(404).send({ error: "username not found" })
	}
})

app.get("/categories", async (req, res) => {
	// @ts-ignore
	const userID = req.query?.userID
	// console.log(userID, typeof(userID))
	try {
		// @ts-ignore
		const response = await getCategories(userID)
		// @ts-ignore
		// console.log(response?.status, response?.data)
		// @ts-ignore
		if (response.status >= 200 && response.status < 300) {
			// @ts-ignore
			res.send(response?.data.response.items).status(200)
		} else {
			// @ts-ignore
			res.status(400).send(response)
		}
	} catch (error) {
		console.log(error)
	}
})

app.post("/add-category", async (req, res) => {
	const { name, due, userID } = req.body
	const uniqueID = generateID()

	try {
		const response = await addCategory(name, due, userID, uniqueID)
		// if(response instanceof AxiosResponse )
		if (response.status && response.status >= 200 && response.status && response?.status < 300) {
			// @ts-ignore
			res.send(response?.data).status(200)
		} else {
			// @ts-ignore
			res.status(response?.status).send(response)
		}
		console.log(response)
	} catch (error) {
		console.log(error)
	}
})

app.get("/get-category", async (req, res) => {
	const { id } = req.query
	try {
		const response = await getCategory(id as string)
		if (response.status) {
			res.send(response.data).status(response.status)
		} else {
			res.status(400).send(response.data)
		}
	} catch (error) {
		console.log(error)
	}
})

app.get("/get-todos", async (req, res) => {
	const { categoryID } = req.query
	try {
		const response = await getTodos(categoryID as string)
		if (response.status) {
			res.send(response.data).status(response.status)
		} else {
			res.status(400).send(response.data)
		}
	} catch (error) {}
})
app.post("/add-todo", async (req, res) => {
	const { title, details, due, categoryID, userID } = req.body
	const id = generateID()
	try {
		const response = await addTodo({ id, title, details, due, categoryID, userID })
		console.log(response.data)
		if (response.status) {
			res.send(response.data).status(response.status)
		} else {
			res.status(400).send(response.data)
		}
	} catch (error) {
		console.log(error)
	}
})
app.get("/get-todo", async (req, res) => {
	const { id } = req.query
	const response = await getTodo(id as string)
	if (response.status) {
		res.send(response.data).status(response.status)
	} else {
		res.status(400).send(response.data)
	}
})
app.delete("/delete-todo", async (req, res) => {
	const { id } = req.query
	try {
		const response = await deleteTodo(id as string)
		if (response.success) {
			res.send("todo deleted").status(200)
		} else {
			res.status(400).send("couln't delete todo")
		}
	} catch (error) {
		console.log(error)
	}
})

app.put("/update-todo", async (req, res) => {
	const { title, details, due, categoryID, status, userID, id } = req.body
	const body = req.body
	const response = await updateTodo({ title, details, due, categoryID, status, userID, id })
	if (response.success) {
		res.send("todo updated successfully").status(200)
	} else {
		res.status(400).send("something went wrong")
	}
})

app.listen(port, () => {
	console.log("listening on port " + port)
})
