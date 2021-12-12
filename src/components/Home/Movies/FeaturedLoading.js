import React from 'react'
import styled from 'styled-components'
import { RingLoader } from 'react-spinners'
function FeaturedLoading() {
  return (
    <Container>
      <RingLoader size={200} color={'white'} speedMultiplier={1.5} />
    </Container>
  )
}
const Container = styled.div`
  opacity: 0.5;
  display: flex;
  height: 58vh;
  background: grey;
  align-items: center;
  justify-content:center;
`

export default FeaturedLoading
