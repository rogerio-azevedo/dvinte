import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  align-self: center;
  flex-direction: column;
  margin: 20px;
`

export const FormContainer = styled.div`
  margin-top: 20px;
`

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  justify-items: center;

  span {
    color: #bf1650;

    &::before {
      display: inline;
      content: '⚠ ';
    }
  }
`

export const InputText = styled.input`
  width: 250px;
  border: 1px solid;
  border-radius: 4px;
  height: 40px;
  padding: 0 15px;
  color: rgba(111, 0, 0, 1);
  font-weight: 500;
  font-size: 15px;

  &::placeholder {
    color: rgba(111, 0, 0, 0.5);
  }
`
