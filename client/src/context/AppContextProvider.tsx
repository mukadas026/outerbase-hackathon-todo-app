import { createContext, useState } from "react"
import { IPropsWithChildren } from "../types/types"

export const AppContext = createContext<any>(null)

const AppContextProvider = ({ children }: IPropsWithChildren) => {
	const [username, setUsername] = useState("")
	const [isSignedIn, setIsSignedIn] = useState(false)
	const [userID, setUserID] = useState("")

	const value = {
		isSignedIn,
		setIsSignedIn,
		username,
		setUsername,
		userID,
		setUserID
	}

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export default AppContextProvider
