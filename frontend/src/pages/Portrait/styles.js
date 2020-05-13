import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
`

export const ImageContainer = styled.div`
  display: grid;
  max-width: 900px;
  max-height: 650px;
  padding: 20px;
  margin-bottom: 20px;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 12px;
  overflow-y: scroll;
  border: #aaa 1px solid;
  border-radius: 20px;
`

export const List = styled.ul``

export const ListItem = styled.li``

export const Item = styled.div`
  width: 150px;
  height: 170px;

  img {
    width: 100%;
    height: 170px;
    object-fit: cover;
    border-radius: 15%;
  }
`
