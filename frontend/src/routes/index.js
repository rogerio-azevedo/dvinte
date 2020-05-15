import React from 'react'
import { Switch } from 'react-router-dom'
import Route from './Route'

import SignIn from '~/pages/SignIn'
import SignUp from '~/pages/SignUp'
import Profile from '~/pages/Profile'

import Dashboard from '~/pages/Dashboard'

import Alignment from '~/pages/Alignment'
import Classe from '~/pages/Classe'
import Divinity from '~/pages/Divinity'
import Race from '~/pages/Race'
import Portrait from '~/pages/Portrait'
import Character from '~/pages/Character'
import CharacterView from '~/pages/CharacterView'

import Chat from '~/pages/Chat'
import Campaign from '~/pages/Campaign'

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/register" component={SignUp} />
      <Route path="/profile" component={Profile} isPrivate />

      <Route path="/dashboard" component={Dashboard} isPrivate />

      <Route path="/alignments" component={Alignment} isPrivate />
      <Route path="/classes" component={Classe} isPrivate />
      <Route path="/divinities" component={Divinity} isPrivate />
      <Route path="/races" component={Race} isPrivate />
      <Route path="/portraits" component={Portrait} isPrivate />

      <Route path="/characters" component={Character} isPrivate />
      <Route path="/characterview" component={CharacterView} isPrivate />

      <Route path="/chat" component={Chat} isPrivate />
      <Route path="/campaigns" component={Campaign} isPrivate />
    </Switch>
  )
}
