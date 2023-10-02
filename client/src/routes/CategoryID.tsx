import { Outlet, useLocation, useNavigate, useParams } from "react-router"
import Layout from "../layout/Layout"
import { useEffect, useState } from "react"
import { ICategory, ITodo } from "../types/types"
import { client } from "../util/axios"
import { ArrowRightOnRectangleIcon, CheckIcon, TrashIcon } from "@heroicons/react/20/solid"
import { notify } from "./SignIn"
import Sidebar from "../components/Sidebar"

const CategoryID = () => {
	// const [isLoading, setIsloading] = useState(true)
	// const [category, setCategory] = useState<ICategory>({
	// 	name: "",
	// 	createdAt: "",
	// 	due: "",
	// 	id: "",
	// 	userID: "",
	// })
	// const [todos, setTodos] = useState<ITodo[]>([])
	const params = useParams()
	const { id } = params
	console.log(params, id)

	const location = useLocation()

	interface IData  {
		category: ICategory
		todos: ITodo[],
	}

	const {data} : {data: IData} = location.state 

	const {category, todos} = data

	const navigate = useNavigate()
	// navigate

	const deleteTodo = async (id: string) => {
		try {
			const res = await client.delete("/delete-todo", { params: { id } })
			console.log(res.data)
			notify("Todo deleted", "success")
		} catch (error) {
			console.log(error)
			notify("couln't delete todo", "error")
		}
		// getTodos()
	}

	// const getCategory = async () => {
	// 	try {
	// 		const res = await client.get("/get-category", { params: { id } })
	// 		setCategory(res.data?.items[0])
	// 		// console.log(res)
	// 	} catch (error) {
	// 		console.log(error)
	// 	}
	// }

	// const getTodos = async () => {
	// 	try {
	// 		const res = await client.get("/get-todos", { params: { categoryID: id } })
	// 		setTodos(res.data?.items)
	// 		console.log(res.data?.items)
	// 	} catch (error) {
	// 		console.log(error)
	// 	}
	// }

	// useEffect(() => {
	// 	getCategory()
	// }, [id])

	// useEffect(() => {
	// 	getTodos()
	// }, [location.pathname])

	return (
		<Layout>
			<div className='flex justify-normal h-full w-full category-container '>
				<Sidebar />
				<div className=" flex-1 w-4/5 relative">
				<div className='absolute top-10 right-10 cursor-pointer logout'>
							<ArrowRightOnRectangleIcon width={40} />
						</div>
					<div className='w-full pt-48 pb-16 flex flex-col gap-y-16 items-center'>
						<div className="space-y-2">
							<h2 className='text-3xl md:text-7xl heading'>
								{/* Welcome, <span className='font-bold'>{`{${username}}`}</span> */}
								{category.name}
							</h2>
							<h3 className="text-center">{category.due}</h3>
						</div>
						
						<div>
							<button
								className='add-button text-4xl bg-sec text-white hover:bg-dark-pri transition-colors px-8 rounded'
								onClick={() => navigate("add-todo")}
							>
								+
							</button>
						</div>
					</div>
					<div className='absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-red-500'>
						<Outlet />
					</div>
					<div className="container">
						{todos.length > 0 ? (
							todos.map((todo) => (
								<div
									onClick={() => navigate(`todo/${todo.id}`)}
									className='w-4/5 md:w-3/5 mx-auto bg-dark-pri cursor-pointer hover:bg-dark-sec transition-colors text-dark-grad rounded-lg px-4 py-4'
								>
									<div className='border-b py-2 flex justify-between'>
										<h3 className='text-3xl font-medium uppercase'>{todo.title}</h3>
										<div
											className='w-1/5 flex items-center justify-end h-full hover:text-red-500 '
											onClick={() => deleteTodo(todo.id)}
										>
											<TrashIcon width={30} />
										</div>
									</div>
									<p className='py-2'>{todo.details}</p>
									<div className='w-full flex justify-between text-sm py-2'>
										<p>Created: {todo.createdAt}</p>
										<p>Due: {todo.deadline}</p>
									</div>
									<div>
										<p className='flex items-center gap-x-2'>
											<span
												className={`${
													todo.status
														? "text-green-500 text-xl w-4 h-4"
														: "bg-blue-500 animate-pulse w-2 h-2"
												}  rounded-full inline-block `}
											>
												{todo.status ? <CheckIcon /> : ""}
											</span>
											<span>
												Status:{" "}
												{todo.status ? (
													<span className='text-green-500'>Completed</span>
												) : (
													<span className='text-blue-500 animate-pulse'>In Progress</span>
												)}{" "}
											</span>
										</p>
									</div>
								</div>
							))
						) : (
							<div className='pt-8'>
								<h2 className='text-3xl font-medium md:text-5xl text-center'>You have no todos here</h2>
							</div>
						)}
					</div>{" "}
				</div>{" "}
			</div>
		</Layout>
	)
}

export default CategoryID
