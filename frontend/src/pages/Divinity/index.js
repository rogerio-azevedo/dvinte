import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import api from '~/services/api'

import Button from '~/components/Button'
import { Container, FormContainer, ListItens } from './styles'

export default function Divinity() {
  const { register, handleSubmit, errors } = useForm()
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    api.get('divinities').then(response => {
      setList(response.data)
    })
  }, [])

  useEffect(() => {
    api.get('divinities').then(response => {
      setList(response.data)
    })
  }, [])

  const onSubmit = (data, e) => {
    async function saveData() {
      await api.post('divinities', data)
      setLoading(false)
      e.target.reset()
    }
    saveData()
  }

  return (
    <Container>
      <h2>Cadastro de Divindades</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormContainer>
          <input
            name="name"
            ref={register({ required: true })}
            placeholder="Informe a Divindade"
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
