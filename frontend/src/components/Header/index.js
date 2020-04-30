import React from 'react'
// import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import TopNav from '~/components/TopNav'
// import Notifications from '~/components/Notifications';

import { Container, Content, Profile } from './styles'

export default function Header() {
  // const profile = useSelector(state => state.user.profile);
  const perfil = true // profile.partner.is_porter;

  return (
    <Container perfil={perfil ? 1 : 0}>
      <Content>
        <TopNav />

        <aside>
          {/* <Notifications /> */}

          <Profile>
            <div>
              <strong>NOME</strong>
              <Link to="/profile">Meu Perfil</Link>
              {/* <strong>{empresa}</strong> */}
            </div>
            {/* <img
              src={
                profile.avatar
                  ? profile.avatar.url
                  : 'https://api.adorable.io/avatars/50/abott@adorable.png'
              }
              alt=""
            /> */}
          </Profile>
        </aside>
      </Content>
    </Container>
  )
}
