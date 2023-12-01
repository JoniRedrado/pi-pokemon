import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../Reducer/reducer.js'

//CONFIG DEL STORE
export const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
)