import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { changePage } from '../../Redux/Actions/actions'

const Paginate = () => {

  const dispatch = useDispatch()
  const backupPokemons = useSelector(state=>state.backupPokemons)
  const itemsPerPage = useSelector(state=>state.itemsPerPage)
  
  const pages = Math.ceil(backupPokemons.length / itemsPerPage)
  console.log(pages);

  
  const modifyPage = (action)=>{
    dispatch(changePage(action))
  }

  return (
    <footer>

      <button onClick={()=>modifyPage("PREV")}>PREV</button>
      {
        
      }
      <button onClick={()=>modifyPage("NEXT")}>NEXT</button>


    </footer>
  )
}

export default Paginate