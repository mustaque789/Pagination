//step 1:- call the api and show it on the page
//step 2:- count total no of pages(5) and products per page
//step 3:- create an array of totalNoOfPages [1,2,3,4,5] using array,keys,slice ....,and prev and next button
//step 4:- now create current page state to select the current page, and when user clicks any page,
// it should display the sliced products(firstIndex, LastIndex) of that page
//step 5:- apply onClick on all pageNumbers, prev and next buttons
//step 6:- create current page as visbile by adding active className

import { useState, useEffect } from "react";
import "./styles.css";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [todosPerPage, setTodosPerPage] = useState(25)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    const data = await response.json();
    setTodos(data);
  };

  const numOfTotalPages = Math.ceil(todos.length/todosPerPage)

  const pages = [...Array(numOfTotalPages + 1).keys()].slice(1);

  const indexOfLastTodo = currentPage * todosPerPage;  // 2*25 = 50th index
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage; // 50 - 25 = 25th index

  const visibleTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

  const prevPageHandler = ()=>{
    if(currentPage !==1){
      setCurrentPage(currentPage-1)
    }
  }

  const nextPageHandler = ()=>{
    if(currentPage !==numOfTotalPages){
      setCurrentPage(currentPage+1)
    }
  }

  
  return (
    <>

     <select onChange={(e)=>setTodosPerPage(e.target.value)}>
      <option value="50">50</option>
      <option value="100">100</option>
      <option value="150">150</option>
     </select>

    <div>
      {
      visibleTodos.map((todo) =>(
        <p key={todo.id}>{todo.title}</p>
        
      ))
      }

      <span className="but" onClick={prevPageHandler}>Prev</span>
      <h1>{pages.map((page)=>(
         <span
          className={`${currentPage === page ? "active" : "" }`} 
          key={page} 
          onClick={()=> setCurrentPage(page)}>{`${page} | `}</span>
        ))}</h1>
        <span className="but" onClick={nextPageHandler}>Next</span>
      </div>
      </>
  );
};
export default App;


