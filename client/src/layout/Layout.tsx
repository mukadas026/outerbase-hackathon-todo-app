import { IPropsWithChildren } from "../types/types"

const Layout = ({ children }: IPropsWithChildren) => {
	return (
			<div className='w-screen max-w-[1920px] min-h-[1080px] bg-pri text-dark-pri dark:text-pri dark:bg-dark-pri'>
				<main className="w-full h-full">{children}</main>
			</div>
	)
}

export default Layout
