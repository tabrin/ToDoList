import React, { useEffect, useRef, useState } from 'react'
import {  toast } from 'react-toastify';

//to get data from LS
const getLocalData =()=>{
  let data = localStorage.getItem('Lists');
  console.log(data)

  if(data){
    return JSON.parse(localStorage.getItem('Lists'))
  }
  else{
    return [];
  }
}
function Todolist() {
  const [activity, setActivity]= useState(" ");
  let inputRef = useRef();
  const[list, setList]= useState(getLocalData());

  // to store data in local storage
useEffect(()=>{
  localStorage.setItem('Lists',JSON.stringify(list))
},[list])

  function addActivity(){   
    setList((list)=>{
      const updatedList= [...list, activity]
      console.log(updatedList)
      inputRef.current.focus()
      return updatedList
    })
    setActivity("")
  }
  function removeActivity(i){
    const removedData = list.filter((ele, id)=>{
      return i!=id
    })
    setList(removedData)
  }

  function removeAll(){
    setList([])
  }
  function submitData(){
    toast.success(" Submited  Successfully ")
  }
  return (
   <>
    <div>
      <div className="container">
        <div className="header">ToDo List</div>
        <input type="text" placeholder='Add Activity' ref={inputRef} value={activity} onChange={(e)=>{setActivity(e.target.value)}}/>
        <button onClick={addActivity}>Add</button>
        <p className='List-heading'>Here is your ListData :{")"}</p>
        {list!=[] && list.map((data, i)=>{
          return(
            <>
            <p key={i}>
             <div className="listData"> {data}</div>
             <div className="btn-position">
              <button onClick={()=>removeActivity(i)}>Remove</button>
             </div>
            </p>
            </>
          )
        })}
        {list.length>=1 && <button onClick={removeAll}>Remove All</button>}
        {list.length>=3 && <button onClick={submitData}>Sumbit</button>}
        
      </div>
      </div>
   </>
  )
}

export default Todolist
