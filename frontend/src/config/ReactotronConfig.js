// Reactotron temporariamente desabilitado devido a incompatibilidade com React Scripts 4.x
// import Reactotron from 'reactotron-react-js'
// import { reactotronRedux } from 'reactotron-redux'
// import reactotronSaga from 'reactotron-redux-saga'

// if (process.env.NODE_ENV === 'development') {
//   const tron = Reactotron.configure()
//     .use(reactotronRedux())
//     .use(reactotronSaga())
//     .connect()

//   tron.clear()

//   console.tron = tron
// }

// Mock console.tron para evitar erros
if (process.env.NODE_ENV === 'development') {
  console.tron = {
    log: console.log,
    warn: console.warn,
    error: console.error,
    display: () => {},
    clear: () => {},
    createEnhancer: () => f => f,
    createSagaMonitor: () => null,
  }
}
