import React from 'react'

import * as CntFld from './styled'

export default () => (
  <div id='info_div' style={{ display: 'none' }}>
    <CntFld.CenterField>
      <span id='label' />
    </CntFld.CenterField>
    <CntFld.CenterField>
      <CntFld.BottomField>
        <span id='labelhelp'>clique para continuar ou arraste novamente</span>
      </CntFld.BottomField>
    </CntFld.CenterField>
  </div>
)
