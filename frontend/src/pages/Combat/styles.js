import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`

export const CombatContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  height: 100%;
  overflow: auto;
  border: 0;

  -webkit-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.6);
  -moz-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.6);
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.6);
`

export const MapContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 0;
`

export const TalkContainer = styled.div`
  display: flex;
  width: 20%;
  min-width: 350px;
  flex-direction: column;
  height: 100%;
  /* overflow: auto; */

  border: 1px solid;

  -webkit-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.6);
  -moz-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.6);
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.6);
`

export const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  padding: 5px;

  -webkit-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.6);
  -moz-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.6);
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.6);

  div {
    margin-right: 10px;
    margin-left: 10px;
  }

  /* &:nth-child(3) {
        margin-bottom: 20px;
        color: red !important;
    } */
`

export const SavesConteiner = styled.div`
  display: flex;
  flex-direction: column;
  border: 0;
`

export const AttackContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 0;
`
