import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "../routes/Home"
import PageNotFound from "../routes/PageNotFound"
import SignIn from "../routes/SignIn"
import SignUp from "../routes/SignUp"
import AddCategory from "../routes/AddCategory"
import CategoryID from "../routes/CategoryID"
import AddTodo from "../routes/AddTodo"
import TodoID from "../routes/TodoID"

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
		errorElement: <PageNotFound />,
		children: [
			{
				path: "add-category",
				element: <AddCategory />,
			},
		],
	},
	{
		path: "sign-in",
		element: <SignIn />,
	},
	{
		path: "sign-up",
		element: <SignUp />,
	},
	{
		path:'category/:id',
		element: <CategoryID />,
		children: [
			{
				path: "add-todo",
				element: <AddTodo />
			}, {
				path:"todo/:todoID",
				element: <TodoID />,
			}
		]
	}
])

const Router = () => {
	return <RouterProvider router={router} />
}

export default Router
