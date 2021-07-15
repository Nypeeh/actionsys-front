import { shade } from 'polished'
import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
    transition: font-size 0.2s ease;
    font-family: 'Poppins', sans-serif;
  }

  @media(max-width: 1080px) {html {font-size: 93.75%;}}
  @media(max-width: 720px) {html {font-size: 87.5%;}}

  body {
    -webkit-font-smoothing: antialiased;
    -ms-font-smoothing: antialiased;
    background: #312e38;
    color: #fff;
  }

  body, input, button {
    font: 400 1rem 'Poppins', serif;
  }

  ::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: transparent;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background-color: #ff9000;
    border-radius: 0.5rem;
    transition: background-color 0.3s ease;

    :hover {
      background-color: ${shade(0.2, '#ff9000')};
    }
  }

  button { cursor: pointer }
`
