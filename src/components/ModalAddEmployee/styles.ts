import { shade } from 'polished'
import styled from 'styled-components'

export const Container = styled.div`
  z-index: 1;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #28262e;
  width: 90vw;
  height: 95vh;
  border-radius: 1rem;
  padding: 2rem 2%;
  overflow-x: auto;

  > button {
    position: sticky;
    top: 0;
    left: 97%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    border-radius: 0.5rem;
    border: 0;
    color: #ff9000;
    background-color: ${shade(0.2, '#28262e')};
    transition: 0.2s ease;

    :hover {
      background-color: #ff9000;
      color: ${shade(0.2, '#28262e')};
    }
  }

  > h2 {
    width: 100%;
    text-align: center;

    button {
      width: 40px;
      height: 40px;
      margin-left: 0.5rem;
      border-radius: 0.5rem;
      border: 0;
      background-color: #c53030;
      color: white;
      font-size: 1.1rem;
      line-height: 40px;
      transition: filter 0.2s ease;

      :hover {
        filter: brightness(1.2);
      }
    }
  }

  > main {
    max-width: 700px;
    margin: 2rem auto 0;
  }
`

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
`
