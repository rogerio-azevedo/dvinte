import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
`

export const TableContainer = styled.div`
  width: 1300px;
  padding: 30px;
  border-radius: 4px;
  max-height: 700px;
  overflow: auto;

  -webkit-box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.5);
  -moz-box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.5);
  box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.5);
`

export const Portrait = styled.div`
  height: 100px;
  width: 100px;

  img {
    width: 100%;
    height: 90px;
    object-fit: cover;
    border-radius: 50%;
  }
`
