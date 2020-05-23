import React, { useState, useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { Form } from '@rocketseat/unform'

import api from '~/services/api'

// import { updateProfileRequest } from '~/store/modules/user/actions'
import AvatarInput from '~/components/PortraitInput'

import { Container, ImageContainer, List, Item } from './styles'

export default function Portrait() {
  // const dispatch = useDispatch()
  const [list, setList] = useState([])

  // const profile = useSelector(state => state.user.profile)

  useEffect(() => {
    api.get('portraits').then(response => {
      setList(response.data)
    })
  }, [])

  useEffect(() => {
    api.get('portraits').then(response => {
      setList(response.data)
    })
  }, [list])

  // function handleSubmit(data) {
  //   dispatch(updateProfileRequest(data))
  // }

  return (
    <Container>
      <AvatarInput style={{ marginTop: '15px' }} />

      <ImageContainer>
        {list &&
          list.map(item => (
            <List key={item.id}>
              <li>
                <Item>
                  <img src={item.url} alt="" />
                </Item>
              </li>
            </List>
          ))}
      </ImageContainer>
    </Container>
  )
}
