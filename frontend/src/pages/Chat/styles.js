import styled from 'styled-components'
import { darken } from 'polished'

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

export const List = styled.ul`
  margin: 0;
  padding: 1rem;
  overflow: auto;
`

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-family: Arial, sans-serif;
  height: 600px;
  justify-content: space-between;
  width: 600px;
  border: 1px solid;
  margin-top: 50px;
`

export const ListMessage = styled.li`
  list-style: none;
  text-align: ${props => (props.from ? 'right' : 'left')};
`

export const Message = styled.span`
  border: 1px solid transparent;
  border-radius: 5px;
  display: inline-block;
  list-style: none;
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;

  background: ${props => (props.from ? '#c3e88d' : '#89ddff')};
  border-color: ${props => (props.from ? '#82be27' : '#1abeff')};
  text-align: ${props => (props.from ? 'right' : 'left')};
`

export const FormMessage = styled.form`
  background: #434758;
  padding: 1rem;
`

export const InputMessage = styled.input`
  border: 1px solid #dcdcdc;
  border-radius: 5px;
  color: #333;
  font-size: 1.2rem;
  padding: 0.5rem 1rem;
  width: 100%;

  :focus {
    border-color: #a3f7ff;
    box-shadow: 0 0 7px #a3f7ff;
    outline: none;
  }
`

export const DicesRollContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 600px;
  margin-top: 50px;
`

export const InputMulti = styled.input`
  margin-top: 30px;
  width: 80px;
  text-align: center;
  font-size: 1.5em;
  padding: 0.5em 0;
  border-radius: 10px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.12);
  border: none;
  background: #fff;
  transition: background 0.3s;
  color: $black;

  &:hover {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  }
`
export const InputResult = styled.input`
  margin-top: 30px;
  width: 420px;
  height: 40px;
  text-align: center;
  font-size: 16px;
  padding: 0.5em 0;
  border-radius: 10px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.12);
  border: none;
  background: #fff;
  transition: background 0.3s;
  color: $black;

  &:hover {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  }
`

export const DiceContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`

export const Dice = styled.div`
  background: #200122;
  height: 60px;
  width: 60px;
  margin: 6px;
  border-radius: 6px;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${darken(0.1, '#8e0e00')};

    -webkit-box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.5);
    -moz-box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.5);
    box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.5);
  }

  strong {
    color: #fff;
    font-size: 20px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
`
