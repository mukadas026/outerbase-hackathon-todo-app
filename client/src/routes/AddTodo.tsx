import { Fragment, useContext, useState } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { useNavigate, useParams } from "react-router"
import { client } from "../util/axios"
import { AppContext } from "../context/AppContextProvider"
import { notify } from "./SignIn"
import { TailSpin } from "react-loader-spinner"

const AddTodo = () => {
	let [isOpen, setIsOpen] = useState(true)
	const navigate = useNavigate()

	const [todoName, setTodoName] = useState("")
    const [todoDetails, setTodoDetails] = useState("")
	const [todoDue, setTodoDue] = useState("")
	const [isLoading, setIsLoading] = useState(false)

	const { userID } = useContext(AppContext)

    const params = useParams()
    const {id} = params

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		setIsLoading(true)
		try {
			const res = await client.post("/add-todo", { title: todoName,details: todoDetails, due: todoDue, categoryID: id,userID })
			if (res.status >= 200 && res.status < 300) {
				notify("Todo created successfully", "success")
			}
			setIsOpen(false)
			navigate(-1)
			console.log(res)
		} catch (error) {
			notify("Something went wrong, try again", "error")
			console.log(error)
		}
		setIsLoading(false)
	}
	const closeModal = () => {
		setIsOpen(false)
		navigate(-1)
	}

	

	return (
		<>
			<Transition
				appear
				show={isOpen}
				as={Fragment}
			>
				<Dialog
					as='div'
					className='relative z-10'
					onClose={closeModal}
				>
					<Transition.Child
						as={Fragment}
						enter='ease-out duration-300'
						enterFrom='opacity-0'
						enterTo='opacity-100'
						leave='ease-in duration-200'
						leaveFrom='opacity-100'
						leaveTo='opacity-0'
					>
						<div className='fixed inset-0 bg-black bg-opacity-25' />
					</Transition.Child>

					<div className='fixed inset-0 overflow-y-auto'>
						<div className='flex min-h-full items-center justify-center p-4 text-center'>
							<Transition.Child
								as={Fragment}
								enter='ease-out duration-300'
								enterFrom='opacity-0 scale-95'
								enterTo='opacity-100 scale-100'
								leave='ease-in duration-200'
								leaveFrom='opacity-100 scale-100'
								leaveTo='opacity-0 scale-95'
							>
								<Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
									<Dialog.Title
										as='h3'
										className='text-lg font-medium leading-6 text-gray-900'
									>
										Add new Todo
									</Dialog.Title>
									<form
										className='mt-2 space-y-4'
										onSubmit={handleSubmit}
									>
										<div className='space-y-2'>
											<label
												htmlFor='todo-name'
												className='block text-sm font-medium leading-6 text-gray-900'
											>
												Name
											</label>
											<input
												required
												value={todoName}
												onChange={(e) => setTodoName(e.target.value)}
												type='text'
												id='todo-name'
												className='indent-2 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
											/>
										</div>
                                        <div className='space-y-2'>
											<label
												htmlFor='todo-details'
												className='block text-sm font-medium leading-6 text-gray-900'
											>
												Details
											</label>
											<textarea
												required
												value={todoDetails}
												onChange={(e) => setTodoDetails(e.target.value)}
												id='todo-details'
												className='indent-2 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
											></textarea>
										</div>
										<div className='space-y-2'>
											<label
												htmlFor='todo-due'
												className='block text-sm font-medium leading-6 text-gray-900'
											>
												Due Date
											</label>
											<input
												value={todoDue}
												onChange={(e) => setTodoDue(e.target.value)}
												type='datetime-local'
												id='todo-due'
												className='indent-2 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
											/>
										</div>

										<div className='mt-4 relative'>
											<TailSpin
												height={20}
												wrapperClass='w-10 h-2 absolute left-1/3'
												visible={isLoading}
											/>
											<button
												// type='button'
												disabled={isLoading}
												className='inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
												// onClick={closeModal}
											>
												Create Todo
											</button>
										</div>
									</form>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	)
}

export default AddTodo
