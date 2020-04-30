import styled from 'styled-components'
import { darken } from 'polished'

export const Container = styled.div`
  button {
    height: 38px;
    width: 120px;
    background: #6f0000;
    font-weight: bold;
    color: #fff;
    border: 0;
    border-radius: 4px;
    font-size: 16px;
    transition: background 0.3s;
    display: ${props => (props.loading ? 'none' : 'block')};

    &:hover {
      background: ${darken(0.06, '#6f0000')};
    }
  }
`
