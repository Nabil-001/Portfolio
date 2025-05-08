import React, { useEffect, useRef, useState } from 'react'
import todo_icon from   '../assets/todo_icon.png'
import TodoItems from './TodoItems'

const Todo = () => {

  const [todoList, setTodoList] = useState(localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : [] );

  const inputRef = useRef();

  const add = ()=>{
    const inputTex = inputRef.current.value.trim();

    if (inputTex === "") {
      return null;
    }

    const newTodo = {
      id: Date.now(),
      text: inputTex,
      isComplete: false,
    }
    setTodoList((prev)=>[...prev,newTodo]);
    inputRef.current.value = "";

    
  }

  const deleteTodo=(id)=>{
    setTodoList((prvTodos)=>{
      return prvTodos.filter((todo)=>todo.id !== id)
    })
  }


  const toggle = (id)=>{
    setTodoList((prevTodos)=>{
      return prevTodos.map((todo)=>{
        if (todo.id === id){
          return {...todo, isComplete: !todo.isComplete}
        }
        return todo;k
      })
    })
  }
  useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(todoList));
    
  },[todoList])



  return (
    <div className='bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl'>

    {/* ------- title ------- */}
        
        <div className='flex items-center mt-7 gap-2'>
            <img className='w-8' src={todo_icon} alt="" />
            <h1 className='text-3xl font-semibold'>To-Do List </h1>
        </div>
    {/* ------- input box ------- */}   
    <div className='flex items-center my-7 bg-gray-200 rounded-full'>
        <input ref={inputRef} className='bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600' type="text" placeholder='Enter Your Task' />

        <button onClick={add} className='border-none rounded-full bg-orange-600 w-32 h-14 text-white text-lg font-medium cursor-pointer'>ADD TASK</button>
    </div> 

    {/* ------- todo tasks list------- */} 

    <div>

      {todoList.map((item,index)=>{
        return <TodoItems key={index} text={item.text} id={item.id} isComplete={item.isComplete} deleteTodo={deleteTodo} toggle={toggle}/>
      })}
        
        
    </div>


      {/* Footer - properly contained within the layout */}
      <footer className="w-full py-4 border-t border-gray-200 bg-white mt-auto">
        <div className="container mx-auto flex items-center justify-center text-sm text-gray-600 ">
          <p>Copyright© {new Date().getFullYear()} Todo App | Nabil Ahmed</p>
          <a href="#" className="hover:text-gray-900 ">Terms & Co</a>
        </div>
      </footer>

   
    </div>
    
  )
}

export default Todo     