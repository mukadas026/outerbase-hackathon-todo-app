import { useContext } from "react"
import { AppContext } from "../context/AppContextProvider"
import { ICategory } from "../types/types"
import { useNavigate } from "react-router"

const Sidebar = () => {
	const { categories }: { categories: ICategory[] } = useContext(AppContext)

    const navigate = useNavigate()

	return (
		<div className='w-1/5 relative h-screen sidebar'>
			<div className='shadow-md w-1/5 h-full fixed inset-0 bg-blue-500/0 left-0 flex flex-col items-center gap-y-4 py-4 overflow-auto'>
				<div className='py-12'>
					<h2 className='text-3xl font-medium underline decoration-[4px]'>Categories</h2>
				</div>
				{categories.map((category) => (
					<div
						key={category.id}
						className='category-card w-4/5 min-h-[150px] rounded-lg cursor-pointer hover:bg-dark-sec transition-colors hover:text-white bg-sec text-pri flex items-center justify-center'
						onClick={() => {navigate(`/category/${category.id}`)}}
					>
                        <h3 className="text-lg font-medium">
						{category.name}
                        </h3>
					</div>
				))}
			</div>
		</div>
	)
}

export default Sidebar
