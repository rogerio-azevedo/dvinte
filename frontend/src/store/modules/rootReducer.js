import { combineReducers } from 'redux'

import auth from './auth/reducer'
import user from './user/reducer'
import character from './character/reducer'
import menu from './menu/reducer'

export default combineReducers({
  auth,
  user,
  character,
  menu,
})
