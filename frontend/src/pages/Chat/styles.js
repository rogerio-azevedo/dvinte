import styled from 'styled-components'
import { darken } from 'polished'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  > div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    padding: 10px;
  }
`

export const MapContainer = styled.div`
  width: 1200px;
  height: 600px;
  border: 1px solid;
`

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-family: Arial, sans-serif;
  height: 600px;
  justify-content: space-between;
  width: 20%;
  border: 1px solid;
  align-self: left;
`

export const InitContainer = styled.div`
  display: flex;
  flex-direction: row;

  input {
    color: #6f0000;
    width: 50px;
    height: 40px;
    text-align: center;
    font-weight: 600;
    font-size: 20px;
    margin: 2px;
    border-radius: 4px;

    border: 0;
    -webkit-box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.6);
    -moz-box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.6);
    box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.6);
  }

  button {
    color: #6f0000;
    width: 80px;
    height: 40px;
    text-align: center;
    font-weight: 600;
    font-size: 14px;
    margin: 2px;
    border-radius: 4px;

    border: 0;
    -webkit-box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.6);
    -moz-box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.6);
    box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.6);
  }
`

export const ChatHistory = styled.div`
  padding: 30px 30px 20px;
  border-bottom: 2px solid white;
  overflow-y: scroll;
  height: 600px;
`

export const List = styled.ul``

export const MessageData = styled.div`
  margin-bottom: 15px;
  text-align: ${props => (props.from ? 'right' : 'left')};
`
export const MessageDateTime = styled.span`
  color: #999;
  padding-left: 6px;
  font-size: 12px;
`

export const MessageDataName = styled.span`
  color: #000;
  padding-left: 6px;
  font-size: 14px;
  float: ${props => (props.from ? 'right' : 'left')};
`

export const Message = styled.div`
  color: #000;
  padding: 8px 12px;
  line-height: 26px;
  font-size: 14px;
  border-radius: 6px;
  margin-bottom: 30px;
  width: 90%;
  position: relative;

  background: ${props => (props.from ? '#c3e88d' : '#94c2ed')};
  float: ${props => (props.from ? 'right' : 'left')};

  &:after {
    bottom: 100%;
    left: ${props => (props.from ? '93%' : '7%')};
    border: solid transparent;
    content: ' ';
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-bottom-color: ${props => (props.from ? '#c3e88d' : '#94c2ed')};
    border-width: 10px;
    margin-left: -10px;
  }
`

export const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  display: inline-block;
  text-align: ${props => (props.from ? 'right' : 'left')};
`

export const ListMessage = styled.li`
  list-style: none;
  text-align: ${props => (props.from ? 'right' : 'left')};

  &:after {
    visibility: hidden;
    display: block;
    font-size: 0;
    content: ' ';
    clear: both;
    height: 0;
  }
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
  color: #000;

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

export const InitBoardContainer = styled.div``
