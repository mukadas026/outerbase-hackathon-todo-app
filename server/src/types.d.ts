export interface ITodo {
	id: string
	title: string
	details: string
	createdAt?: string
	due: string
	status?: 0 | 1
	categoryID: string
	userID: string
}