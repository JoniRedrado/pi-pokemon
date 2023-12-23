import React from 'react'
//Libraries
import { useDispatch, useSelector } from 'react-redux'
import { changePage, selectPage } from '../../Redux/Actions/actions'

const Paginate = () => {

  const dispatch = useDispatch()
  const backupPokemons = useSelector(state=>state.backupPokemons)
  const itemsPerPage = useSelector(state=>state.itemsPerPage)
  
  const pages = [] 
  for (let index = 1; index <= Math.ceil(backupPokemons.length / itemsPerPage); index++) { 
    pages.push(index) 
  }

  const modifyPage = (action)=>{
    dispatch(changePage(action))
  }

  const SelectPageNumber = (pageNumber)=>{
    dispatch(selectPage(pageNumber))
  }

  return (
    <footer>
      <button onClick={()=>modifyPage("PREV")}>PREV</button>
      {
        pages.map(page=>{
          return <button onClick={()=>SelectPageNumber(page)} key={page}>{page}</button>
        })
      }      
      <button onClick={()=>modifyPage("NEXT")}>NEXT</button>
    </footer>
  )
}

export default Paginate