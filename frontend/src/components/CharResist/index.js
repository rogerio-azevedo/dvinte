import React from 'react'
import PropTypes, { object } from 'prop-types'

import {
  Container,
  MainResistContainer,
  LabelContainer,
  ResistMainLabel,
  ResistLabel,
  InputResitContainer,
  InputResit,
} from './styles'

export default function CharResist({ resistences }) {
  return (
    <Container>
      <MainResistContainer>
        <LabelContainer>
          <ResistMainLabel defaultValue="FORTITUDE" />
          <ResistLabel defaultValue="(Constituição)" />
        </LabelContainer>
        <InputResitContainer>
          <div>
            <label htmlFor="inputResist">total</label>
            <InputResit defaultValue="" />
          </div>
          <div>
            <label htmlFor="inputResist">base</label>
            <InputResit defaultValue="" />
          </div>
          <div>
            <label htmlFor="inputResist">mod</label>
            <InputResit defaultValue="" />
          </div>
          <div>
            <label htmlFor="inputResist">magic</label>
            <InputResit defaultValue="" />
          </div>
          <div>
            <label htmlFor="inputResist">outros</label>
            <InputResit defaultValue="" />
          </div>
          <div>
            <label htmlFor="inputResist">temp</label>
            <InputResit defaultValue="" />
          </div>
        </InputResitContainer>
      </MainResistContainer>

      <MainResistContainer>
        <LabelContainer>
          <ResistMainLabel defaultValue="REFLEXOS" />
          <ResistLabel defaultValue="(Destreza)" />
        </LabelContainer>
        <InputResitContainer>
          <div>
            <InputResit defaultValue="" />
          </div>
          <div>
            <InputResit defaultValue="" />
          </div>
          <div>
            <InputResit defaultValue="" />
          </div>
          <div>
            <InputResit defaultValue="" />
          </div>
          <div>
            <InputResit defaultValue="" />
          </div>
          <div>
            <InputResit defaultValue="" />
          </div>
        </InputResitContainer>
      </MainResistContainer>

      <MainResistContainer>
        <LabelContainer>
          <ResistMainLabel defaultValue="VONTADE" />
          <ResistLabel defaultValue="(Sabedoria)" />
        </LabelContainer>
        <InputResitContainer>
          <div>
            <InputResit defaultValue="" />
          </div>
          <div>
            <InputResit defaultValue="" />
          </div>
          <div>
            <InputResit defaultValue="" />
          </div>
          <div>
            <InputResit defaultValue="" />
          </div>
          <div>
            <InputResit defaultValue="" />
          </div>
          <div>
            <InputResit defaultValue="" />
          </div>
        </InputResitContainer>
      </MainResistContainer>
    </Container>
  )
}

CharResist.propTypes = {
  resistences: PropTypes.arrayOf(object).isRequired,
}
