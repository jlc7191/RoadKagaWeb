import { combineReducers } from 'redux'
import {
  POST_MSG,
  DEL_MSG,
  PUT_MSG,
  POST_CMSG,
  DEL_CMSG,
  PUT_CMSG,
} from '../action/actionType'
// 可以先寫action的格式有哪些
// action
// {type: 'ADD_TODO', payload: {id, text} }
// ADD_TODO
// DEL_TODO
// UPDATE_TODO
//

function msgs (state = [], action) {
  switch (action.type) {
    case POST_MSG:
      return [action.payload, ...state]
    case PUT_MSG:
      let newState = state.map(el => {
        if (el.id === action.payload.id) {
          el = action.payload
        }
        return el
      })
      return newState
    case DEL_MSG:
      return state.filter(item => item.id !== action.payload)
    default:
      return state
  }
}

function cmsgs (state = [], action) {
  switch (action.type) {
    case POST_CMSG:
      return [action.payload, ...state]
    case PUT_CMSG:
      let newState = state.map(el => {
        if (el.cId === action.payload.cId) {
          el = action.payload
        }
        return el
      })
      return newState
    case DEL_CMSG:
      return state.filter(item => item.cId !== action.payload)
    default:
      return state
  }
}

export default combineReducers({
  msgs,
  cmsgs,
})
