import React from 'react'
//Libraries
import { useDispatch, useSelector } from 'react-redux'
import { changePage, selectPage } from '../../Redux/Actions/actions'
//CSS
import './Paginate.css'

const Paginate = () => {

  const dispatch = useDispatch()
  const backupPokemons = useSelector(state=>state.backupPokemons)
  const itemsPerPage = useSelector(state=>state.itemsPerPage)
  const currentPage = useSelector(state=>state.currentPage)
  
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
      <button onClick={()=>modifyPage("PREV")}>{'<'}</button>
      {
        pages.map(page=>{
          return <button onClick={()=>SelectPageNumber(page)} key={page} className={currentPage+1 === page ? 'current-page' : ''} >{page}</button>
        })
      }      
      <button onClick={()=>modifyPage("NEXT")}>{'>'}</button>
    </footer>
  )
}

export default Paginate