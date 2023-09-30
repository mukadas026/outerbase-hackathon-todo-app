import { useContext, useEffect, useState } from "react"
import { Outlet, useLocation, useNavigate } from "react-router"
import { AppContext } from "../context/AppContextProvider"
import Layout from "../layout/Layout"
import { client } from "../util/axios"
import { Oval } from "react-loader-spinner"
import { ICategory } from "../types/types"

const Home = () => {
	// if (!isSignedIn) {
	// 	navigate("/sign-up")
	// }
	const { isSignedIn, username, userID } = useContext(AppContext)
	const [categories, setCategories] = useState<ICategory[]>([])
	const [isLoading, setIsLoading] = useState(true)
	console.log(isSignedIn, "hello")
	console.log("hello world")
	const navigate = useNavigate()
	const location = useLocation()

  const goToCategory = (id:string) => {
    navigate(`/category/${id}`)
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
			<div className='w-full pt-48 pb-16 flex flex-col gap-y-16 items-center'>
				<h2 className='text-3xl md:text-7xl'>
					Welcome, <span className='font-bold'>{`{${username}}`}</span>
				</h2>
				<div className='w-3/5'>
					<input
						type='text'
						className='indent-2 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
					/>
				</div>
				<div>
					<button
						className='text-4xl bg-sec text-white hover:bg-dark-pri transition-colors px-8 rounded'
						onClick={() => navigate("add-category")}
					>
						+
					</button>
				</div>
			</div>
			<div className='absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-red-500'>
				<Outlet />
			</div>
			<div className='w-[90%] mx-auto  flex flex-wrap items-center justify-center gap-x-8 gap-y-8'>
				{isLoading ? (
					<div className='w-full flex justify-center'>
						<Oval />
					</div>
				) : (
					categories.map((category) => (
						<div
							key={category.id}
							className='w-1/5 min-w-[200px] min-h-[200px] bg-dark-pri rounded-lg text-pri p-4 grid hover:cursor-pointer hover:bg-dark-sec transition-colors'
              onClick={() => goToCategory(category.id)}
						>
							<h3 className="text-3xl font-medium">{category.name}</h3>
							<p className="self-end justify-self-end">{new Date(category.due).toLocaleDateString()}</p>
						</div>
					))
				)}
			</div>
		</Layout>
	)
}

export default Home
