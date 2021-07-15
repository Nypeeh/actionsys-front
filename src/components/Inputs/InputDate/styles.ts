import styled, { css } from 'styled-components'
import Tooltip from '../../Tooltip'

interface ContainerProps {
  hasLabel: boolean
}

interface ContentProps {
  isFocused: boolean
  isFilled: boolean
  isErrored: boolean
}

export const Container = styled.div<ContainerProps>`
  & + div {
    margin-top: 0.5rem;

    ${({ hasLabel }) =>
      hasLabel &&
      css`
        margin-top: 1rem;
      `}
  }

  > p {
    color: rgba(255, 255, 255, 0.6);
    margin-bottom: 0.3rem;
    margin-left: 0.3rem;
  }
`

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 1rem;

  span {
    background: #c53030;
    color: white;

    ::before {
      border-color: #c53030 transparent;
    }
  }
`

export const Content = styled.div<ContentProps>`
  background: #232129;
  border-radius: 10px;
  border: 2px solid #232129;
  padding: 1rem;
  width: 100%;

  display: flex;
  align-items: center;
  color: #666360;
  transition: 0.2s ease;

  ${({ isErrored }) =>
    isErrored &&
    css`
      color: #c53030;
      border-color: #c53030;
    `}

  ${({ isFilled }) =>
    isFilled &&
    css`
      color: #ff9000;
    `}


${({ isFocused }) =>
    isFocused &&
    css`
      color: #ff9000;
      border-color: #ff9000;
    `}



input {
    background: transparent;
    flex: 1;
    border: 0;
    color: #f4ede8;

    ::placeholder {
      color: #666360;
    }

    :-webkit-autofill,
    :-webkit-autofill:hover,
    :-webkit-autofill:focus {
      -webkit-text-fill-color: #f4ede8;
      box-shadow: 0 0 0px 1000px #232129 inset;
      transition: background-color 5000s ease-in-out 0s;
      background: red;
    }
  }

  > svg {
    margin-right: 1rem;
  }
`
