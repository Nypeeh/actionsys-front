import styled, { css } from 'styled-components'

interface ContainerProps {
  total: number
}

export const Container = styled.div<ContainerProps>`
  background-color: #f2f2f2;
  display: flex;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
  max-width: 600px;

  .pagination-active {
    color: #159fed;
  }

  button {
    cursor: pointer;
    border: 0;
    background-color: transparent;
    width: 100px;
    height: 80px;
    line-height: 80px;
    text-align: center;
    color: #333;
    font-size: 1.1rem;
    font-weight: 700;
    transition: 0.3s linear;

    :hover {
      color: #159fed;
    }

    ${({ total }) =>
      total >= 5
        ? css`
            :nth-child(1):hover ~ .bar {
              left: 0;
            }
            :nth-child(2):hover ~ .bar {
              left: 15.5%;
            }
            :nth-child(3):hover ~ .bar {
              left: 29.5%;
            }
            :nth-child(4):hover ~ .bar {
              left: 44.2%;
            }
            :nth-child(5):hover ~ .bar {
              left: 58%;
            }
            :nth-child(6):hover ~ .bar {
              left: 72.5%;
            }
            :nth-child(7):hover ~ .bar {
              left: 87.8%;
            }
          `
        : total >= 4
        ? css`
            :nth-child(1):hover ~ .bar {
              left: 0;
            }
            :nth-child(2):hover ~ .bar {
              left: 19%;
            }
            :nth-child(3):hover ~ .bar {
              left: 35.5%;
            }
            :nth-child(4):hover ~ .bar {
              left: 52%;
            }
            :nth-child(5):hover ~ .bar {
              left: 69%;
            }
            :nth-child(6):hover ~ .bar {
              left: 87.8%;
            }
          `
        : total >= 3
        ? css`
            :nth-child(1):hover ~ .bar {
              left: 0;
            }
            :nth-child(2):hover ~ .bar {
              left: 22%;
            }
            :nth-child(3):hover ~ .bar {
              left: 42.4%;
            }
            :nth-child(4):hover ~ .bar {
              left: 62.5%;
            }
            :nth-child(5):hover ~ .bar {
              left: 84.8%;
            }
          `
        : total >= 2 &&
          css`
            :nth-child(1):hover ~ .bar {
              left: 0;
            }
            :nth-child(2):hover ~ .bar {
              left: 28%;
            }
            :nth-child(3):hover ~ .bar {
              left: 53.4%;
            }
            :nth-child(4):hover ~ .bar {
              left: 81.8%;
            }
          `}

    .pagination-active {
      color: #159fed;
      background-color: #e9e9e9;
    }
  }

  .bar {
    position: absolute;
    ${({ total }) =>
      total <= 2
        ? css`
            width: 18%;
          `
        : total <= 3
        ? css`
            width: 15%;
          `
        : css`
            width: 12%;
          `}

    height: 4px;
    background-color: #159fed;
    bottom: 0;
    left: -20%;
    transition: 0.4s linear;
  }
`
