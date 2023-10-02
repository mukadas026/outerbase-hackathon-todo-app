import { createContext, useState } from "react"
import { ICategory, IPropsWithChildren } from "../types/types"


export const AppContext = createContext<any>(null)

const AppContextProvider = ({ children }: IPropsWithChildren) => {
	const [username, setUsername] = useState("")
	const [isSignedIn, setIsSignedIn] = useState(false)
	const [userID, setUserID] = useState("")
	const [categories, setCategories] = useState<ICategory[]>([])

	const value = {
		isSignedIn,
		setIsSignedIn,
		username,
		setUsername,
		userID,
		setUserID,
		categories,
		setCategories,
	}

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export default AppContextProvider
