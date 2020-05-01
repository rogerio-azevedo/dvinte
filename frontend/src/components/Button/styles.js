import styled from 'styled-components'
import { darken } from 'polished'

export const Container = styled.div`
  button {
    height: 40px;
    width: 120px;
    background: #8e0e00;
    font-weight: bold;
    color: #fff;
    border: 0;
    border-radius: 4px;
    font-size: 16px;
    transition: background 0.3s;
    display: ${props => (props.loading ? 'none' : 'block')};

    &:hover {
      background: ${darken(0.09, '#8e0e00')};
    }
  }
`
