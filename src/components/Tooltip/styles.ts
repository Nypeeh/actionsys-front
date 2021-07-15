import styled from 'styled-components'

export const Container = styled.div`
  position: relative;

  span {
    position: absolute;
    background: #ff9000;
    padding: 0.5rem;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
    transition: 0.4s ease;
    opacity: 0;
    visibility: hidden;

    bottom: calc(100% + 12px);
    width: 160px;
    left: -190%;
    transform: translateX(-50%);
    color: #312e38;

    ::before {
      content: '';
      position: absolute;
      border-style: solid;
      border-color: #ff9000 transparent;
      border-width: 6px 6px 0 6px;
      top: 100%;
      left: 80%;
      transform: translateX(-50%);
    }
  }

  :hover span {
    opacity: 1;
    visibility: visible;
  }
`
