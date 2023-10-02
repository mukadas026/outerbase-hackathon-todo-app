import { useContext, useEffect, useState } from "react"
import { Outlet, useLocation, useNavigate } from "react-router"
import { AppContext } from "../context/AppContextProvider"
import Layout from "../layout/Layout"
import { client } from "../util/axios"
import { Oval, TailSpin } from "react-loader-spinner"
import { ICategory, ITodo } from "../types/types"
import { ArrowRightOnRectangleIcon } from "@heroicons/react/20/solid"
import { flushSync } from "react-dom"
import { useViewTransition } from "../util/useViewTransition"
import { notify } from "./SignIn"

const Home = () => {
	// @ts-ignore
	const { isSignedIn, username, userID, categories, setCategories } = useContext(AppContext)
	const navigate = useNavigate()
	// const [categories, setCategories] = useState<ICategory[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [isLoadingCategory, setIsLoadingCategory] = useState(false)
	// console.log(isSignedIn, "hello")
	// console.log("hello world")
	const location = useLocation()
	useEffect(() => {
		if (!isSignedIn) {
			navigate("/sign-up")
		}
	}, [location.pathname])

	const getCategory = async (id: string) => {
		try {
			const res = await client.get("/get-category", { params: { id } })
			// setCategory(res.data?.items[0])
			return {
				success: true,
				data: res.data?.items[0] as ICategory,
			}
			// console.log(res)
		} catch (error) {
			console.log(error)
			return {
				success: false,
				data: {
					name: "",
					createdAt: "",
					due: "",
					id: "",
					userID: "",
				},
			}
		}
	}

	const getTodos = async (id: string) => {
		try {
			const res = await client.get("/get-todos", { params: { categoryID: id } })
			// setTodos(res.data?.items)
			console.log(res.data?.items)
			return {
				success: true,
				data: res.data?.items as ITodo[],
			}
		} catch (error) {
			console.log(error)
			return {
				success: false,
				data: [],
			}
		}
	}

	const goToCategory = async (id: string) => {
		// setIsLoading(true)
		setIsLoadingCategory(true)
		// console.dir(document)
		// const doc: Document = document
		console.log("using view transition")
		//@ts-ignore
		// document.startViewTransition(() => {
		// flushSync(() => {
		// navigate(`category/${id}`)
		// })
		// })
		const category = await getCategory(id)
		if (!category.success) {
			return notify("something went wrong", "error")
		}
		// @ts-ignore
		const categoryTodos = await getTodos(category.data?.id)
		if (!categoryTodos.success) {
			return notify("something went wrong", "error")
		}
		const data = {
			category: category.data,
			todos: categoryTodos.data,
		}
		// setIsLoading(false)
		setIsLoadingCategory(false)
		useViewTransition(() => {
			flushSync(() => navigate(`/category/${id}`, { state: { data } }))
		})
	}

	useEffect(() => {
		setIsLoading(true)
		;(async () => {
			console.log("getting", userID)
			try {
				const res = await client.get("/categories", { params: { userID: userID } })
				if (res.status >= 200 && res.status < 300) {
					setCategories(res.data)
					setIsLoading(false)
				}
				console.log(res)
			} catch (err) {
				console.log(err)
				setIsLoading(false)
			}
		})()
	}, [location.pathname])

	return (
		<Layout>
			<div className='flex relative justify-around w-full '>
				{isLoadingCategory && (
					<div className='absolute w-screen h-screen bg-black/60 flex items-center justify-center top-0 left-0 z-[9999]'>
						<TailSpin />
					</div>
				)}
				<div className='sidebar-shadow '></div>

				<div className='w-full home-shadow '>
					<div className='w-full pt-48 pb-16 flex flex-col gap-y-16 items-center relative home-container'>
						<div className='absolute top-10 right-10 logout cursor-pointer'>
							<ArrowRightOnRectangleIcon width={50} />
						</div>
						<h2 className='text-3xl md:text-7xl heading'>
							Welcome, <span className='font-bold '>{`${username}`}</span>
						</h2>
						<div className='w-4/5 md:w-3/5'>
							<input
								type='text'
								className='indent-2 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
							/>
						</div>
						<div>
							<button
								className='add-button text-4xl bg-sec text-white hover:bg-dark-pri transition-colors px-8 rounded'
								onClick={() => navigate("add-category")}
							>
								+
							</button>
						</div>
					</div>
					<div className='absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-red-500'>
						<Outlet />
					</div>
					<div className='w-[90%] mx-auto  flex flex-wrap items-center justify-center gap-x-8 gap-y-8 home-categories container'>
						{isLoading ? (
							<div className='w-full flex justify-center'>
								<Oval />
							</div>
						) : (
							categories.map((category: ICategory) => (
								<div
									key={category.id}
									className='category-card w-1/5 min-w-[200px] min-h-[200px] bg-dark-pri rounded-lg text-pri p-4 grid hover:cursor-pointer hover:bg-dark-sec transition-colors'
									onClick={() => goToCategory(category.id)}
								>
									<h3 className='text-3xl font-medium'>{category.name}</h3>
									<p className='self-end justify-self-end'>
										{new Date(category.due).toLocaleDateString()}
									</p>
								</div>
							))
						)}
					</div>
				</div>
			</div>
		</Layout>
	)
}

export default Home
