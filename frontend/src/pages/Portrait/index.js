import React, { useState, useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { Form } from '@rocketseat/unform'

import api from '~/services/api'

// import { updateProfileRequest } from '~/store/modules/user/actions'
import AvatarInput from '~/components/PortraitInput'

import { Container, ListItens } from './styles'

export default function Portrait() {
  // const dispatch = useDispatch()
  const [list, setList] = useState([])

  // const profile = useSelector(state => state.user.profile)

  useEffect(() => {
    api.get('portraits').then(response => {
      setList(response.data)
    })
  }, [])

  // function handleSubmit(data) {
  //   dispatch(updateProfileRequest(data))
  // }

  return (
    <Container>
      <AvatarInput name="portrait_id" />

      <ListItens>
        {list &&
          list.map(item => (
            <ul key={item.id}>
              <li>
                <div>
                  <img src={item.url} alt="" />
                </div>
              </li>
            </ul>
          ))}
      </ListItens>
    </Container>
  )
}
