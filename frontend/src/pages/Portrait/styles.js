import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  max-width: 900px;
  justify-content: center;
  align-items: center;
  justify-items: center;
`

export const ListItens = styled.div`
  margin-top: 20px;
  width: 100%;
  flex: 1;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
  justify-content: center;
  align-items: center;

  /* max-height: 400px;
  overflow: auto; */

  li {
    font-weight: 600;
    font-size: 15px;
    margin: 3px;
    padding: 10px;

    img {
      width: 150px;
      height: 180px;
      border-radius: 50px;
    }
  }
`
