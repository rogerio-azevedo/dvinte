import styled from 'styled-components'
import { darken } from 'polished'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const CombatContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 20px;
`

export const MapContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 75%;
  height: 740px;
  border: 1px solid;

  -webkit-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.6);
  -moz-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.6);
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.6);
`
export const CharContainer = styled.div`
  display: flex;
  flex-direction: row;

  > div {
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    > div {
      input {
        height: 40px;
        width: 45px;
      }
    }
  }
`

export const TalkContainer = styled.div`
  display: flex;
  width: 25%;
  flex-direction: column;
  height: 740px;
  border: 1px solid;

  -webkit-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.6);
  -moz-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.6);
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.6);
`

export const ChatContainer = styled.div`
  width: 100%;
  flex-direction: row;
  font-family: Arial, sans-serif;
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
`

export const ChatHistory = styled.div`
  padding: 30px 30px 20px;
  border-bottom: 2px solid white;
  overflow-y: scroll;
  height: 550px;
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
  background: #8e0e00;
  padding: 8px;
  border-radius: 4px;
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

export const DiceContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  margin-top: 10px;
`

export const InputMulti = styled.input`
  text-align: center;
  font-size: 1.5em;
  padding: 11px;
  border-radius: 4px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.12);
  border: none;
  background: #fff;
  transition: background 0.3s;
  color: #000;
  margin-right: 10px;
  cursor: pointer;

  -webkit-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.6);
  -moz-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.6);
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.6);

  &:hover {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  }
`

export const Dice = styled.div`
  background: #8e0e00;
  height: 50px;
  width: 50px;
  margin: 3px;
  border-radius: 4px;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${darken(0.1, '#200122')};

    -webkit-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.5);
    -moz-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.5);
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.5);
  }

  strong {
    color: #fff;
    font-size: 16px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
`

export const InitBoardContainer = styled.div``

export const StatusContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;

  > div {
    display: flex;
    flex-direction: row;

    > div {
      display: flex;
      flex-direction: column;
      padding: 5px;

      label {
        width: 70px;
        font-weight: 600;
        color: #6f0000;
        text-align: center;
      }

      > input {
        color: #6f0000;
        width: 70px;
        height: 30px;
        text-align: center;
        font-weight: 600;
        font-size: 16px;
        margin: 2px;
        border-radius: 4px;

        border: 0;
        -webkit-box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.6);
        -moz-box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.6);
        box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.6);
      }
    }
  }
`

export const ActionContainer = styled.div`
  > div {
    display: flex;
    flex-direction: row;
    padding: 10px;
    border: 1px solid;
    margin: 5px;

    > div {
      display: flex;
      flex-direction: column;

      button {
        color: #6f0000;
        width: 70px;
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
    }
  }
`
