import { takeLatest, call, put, all } from 'redux-saga/effects'
import { toast } from 'react-toastify'
import api from '../../../services/api'
import { signInSuccess, signFailure } from './actions'
import history from '../../../services/history'

export function* signIn({ payload }) {
  try {
    const { email, password } = payload

    const response = yield call(api.post, 'sessions', {
      email,
      password,
    })

    const { token, user } = response.data

    api.defaults.headers.Authorization = `Bearer ${token}`

    yield put(signInSuccess(token, user))

    history.push('/dashboard')
  } catch (err) {
    toast.error('Falha na autenticação, verifique seus dados')
    yield put(signFailure())
  }
}

export function* signUp({ payload }) {
  try {
    const { name, email, password, phone, city, state } = payload

    yield call(api.post, 'users', {
      name,
      email,
      password,
      phone,
      city,
      state,
      is_ativo: true,
    })

    history.push('/')
  } catch (err) {
    toast.error('Falha no cadastro, verifique seus dados!')

    yield put(signFailure())
  }
}

export function setToken({ payload }) {
  if (!payload) return

  const { token } = payload.auth

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`
  }
}

export function signOut() {
  history.push('/')
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/SIGN_OUT', signOut),
])
