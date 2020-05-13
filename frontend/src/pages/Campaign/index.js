import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import api from '~/services/api'

import Button from '~/components/Button'
import { Container, FormContainer, ListItens } from './styles'

export default function Campaign() {
  const profile = useSelector(state => state.user.profile)
  const { register, handleSubmit, errors } = useForm()
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    api.get('campaigns').then(response => {
      setList(response.data)
    })
  }, [])

  const onSubmit = (data, e) => {
    async function saveData() {
      await api.post('campaigns', {
        name: data.name,
        description: data.description,
        user_id: profile.id,
      })
      setLoading(false)
      e.target.reset()
    }
    saveData()
  }

  return (
    <Container>
      <h2>Cadastro de Campanhas</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormContainer>
          <input
            name="name"
            ref={register({ required: true })}
            placeholder="Informe a nome da Campanha"
          />
          {errors.name && errors.name.type === 'required' && (
            <span>Essa informação é obrigatória</span>
          )}
          <input
            name="description"
            ref={register({ required: true })}
            placeholder="Informe uma breve descrição"
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
