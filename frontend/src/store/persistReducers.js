import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'

export default reducers => {
  const persitedReducer = persistReducer(
    {
      key: 'dvinte',
      storage,
      whitelist: ['auth', 'user', 'character', 'menu', 'dices'],
    },
    reducers
  )
  return persitedReducer
}
