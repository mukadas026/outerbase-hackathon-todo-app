import Layout from "../layout/Layout"

const PageNotFound = () => {
	return (
		<Layout>
			<div className='w-full min-h-screen flex items-center justify-center font-medium text-4xl md:text-7xl'>
				<div className="flex flex-col items-center">
					<span>404</span>
					<span>Page Not Found</span>
				</div>
			</div>
		</Layout>
	)
}

export default PageNotFound
