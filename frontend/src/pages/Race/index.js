import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import api from '~/services/api'

import Button from '~/components/Button'
import { Container, FormContainer, ListItens } from './styles'

export default function Race() {
  const { register, handleSubmit, errors } = useForm()
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    api.get('races').then(response => {
      setList(response.data)
    })
  }, [])

  // useEffect(() => {
  //   api.get('races').then(response => {
  //     setList(response.data)
  //   })
  // }, [list])

  const onSubmit = (data, e) => {
    ;(async () => {
      setLoading(true)
      await api.post('races', data)
      setLoading(false)
      e.target.reset()
    })()
  }

  return (
    <Container>
      <h2>Cadastro de Raças</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormContainer>
          <input
            name="name"
            ref={register({ required: true })}
            placeholder="Informe a Raça"
          />
          {errors.name && errors.name.type === 'required' && (
            <span>Essa informação é obrigatória</span>
          )}
          <Button loading={loading ? 1 : 0} type="submit" TextButton="Gravar" />
        </FormContainer>
      </form>

      <ListItens>
        <div>
          {list &&
            list.map(item => (
              <ul key={item.id}>
                <li>{item.name.toUpperCase()}</li>
              </ul>
            ))}
        </div>
      </ListItens>
    </Container>
  )
}
