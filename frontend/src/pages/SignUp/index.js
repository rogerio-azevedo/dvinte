import React from 'react'
// import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Form, Input } from '@rocketseat/unform'
import * as Yup from 'yup'
// import logo from '~/assets/logo.svg'

// import { signUpRequest } from '~/store/modules/auth/actions'

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),

  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),

  password: Yup.string()
    .min(6, 'No mĩnimo 6 caracteres')
    .required('A senha é obrigatória'),
})

export default function SignUp() {
  // const dispatch = useDispatch()

  // function handleSubimit({ name, email, password }) {
  //   dispatch(signUpRequest(name, email, password))
  // }

  return (
    <>
      {/* onSubmit={handleSubimit} */}
      <Form schema={schema}>
        <Input name="name" placeholder="Nome" />
        <Input name="email" type="email" placeholder="E-mail" />
        <Input name="password" type="password" placeholder="Senha" />
        <Input name="password" type="password" placeholder="Telefone" />
        <Input name="password" type="password" placeholder="Cidade" />
        <Input name="password" type="password" placeholder="Estado" />

        <button type="submit">Criar conta</button>
        <Link to="/">Já tenho uma conta.</Link>
      </Form>
    </>
  )
}
