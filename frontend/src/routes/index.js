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
import Token from '~/pages/Token'

import Character from '~/pages/Character'
import CharacterDetail from '~/pages/CharacterDetail'
import CharacterCreate from '~/pages/CharacterCreate'

import Chat from '~/pages/Chat'
import Campaign from '~/pages/Campaign'

import Notes from '~/pages/Notes'

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
      <Route path="/tokens" component={Token} isPrivate />

      <Route path="/characters" component={Character} isPrivate />
      <Route path="/characterview/:id" component={CharacterDetail} isPrivate />
      <Route path="/charactercreate" component={CharacterCreate} isPrivate />

      <Route path="/chat" component={Chat} isPrivate />
      <Route path="/campaigns" component={Campaign} isPrivate />

      <Route path="/notes" component={Notes} isPrivate />
    </Switch>
  )
}
