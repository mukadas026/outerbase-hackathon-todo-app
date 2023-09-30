import { useEffect, useState } from "react"
import Layout from "./layout/Layout"
import { getTodo } from "./util/requests"
import { ITodo } from "./types/types"
const App = () => {
  const [todos, setTodos] = useState<Array<ITodo>>([])

  useEffect(() => {
    (async () => {
      const todoData = await getTodo()
      setTodos(todoData.data)
    })()
    
    
  }, [])
  console.log(todos)
	return (
		<Layout>
			<div className=''>
        <h1>Welcome, User</h1>
        <div>
          <input type="text" />
        </div>
      </div>
      <div>
        <h2>Your Todos</h2>
        <div>
        {todos.map(todo => <div>
          
        </div>)}
        </div>
      </div>
		</Layout>
	)
}

export default App
