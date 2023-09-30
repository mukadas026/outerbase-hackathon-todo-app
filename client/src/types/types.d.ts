import { FC, ReactNode } from "react"

export interface IPropsWithChildren {
	children: ReactNode
}

export interface ITodo {
	id: string
	title: string
	details: string
	createdAt: string
	deadline: string
	status: 0 | 1
	categoryID: string
	userID: string
}

export interface ICategory {
	createdAt: string
	due: string
	id: string
	name: string
	userID: string
}
