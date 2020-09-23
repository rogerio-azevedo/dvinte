import { takeLatest, put, all } from 'redux-saga/effects'
import { toast } from 'react-toastify'

import { showMenuSuccess, showMenuFailure } from './actions'

export function* showMenu({ payload }) {
  try {
    yield put(showMenuSuccess(payload))
  } catch (err) {
    toast.console.error('Houve um erro ao alterar o menu')
    yield put(showMenuFailure())
  }
}

export default all([takeLatest('@menu/SHOW_MENU_REQUEST', showMenu)])
