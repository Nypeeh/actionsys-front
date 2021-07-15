import { shade } from 'polished'
import styled from 'styled-components'

export const Container = styled.button`
  background: #ff9000;
  border-radius: 10px;
  height: 56px;
  border: 0;
  padding: 0 1rem;
  color: #312e38;
  width: 100%;
  font-weight: 500;
  margin-top: 1.5rem;
  transition: background-color 0.2s ease;

  :hover {
    background: ${shade(0.2, '#ff9000')};
  }
`
