import styled from 'styled-components'

interface ContainerProps {
  color?: string
}

export const Container = styled.div<ContainerProps>`
  @keyframes dot-keyframes {
    0% {
      opacity: 0.4;
      transform: translateY(0);
    }

    50% {
      opacity: 1;
      transform: translateY(-0.3rem);
    }

    100% {
      opacity: 0.4;
      transform: translateY(0);
    }
  }

  .loading-dots {
    text-align: center;
    width: 100%;

    .dot {
      animation: dot-keyframes 0.8s infinite ease-in-out;
      background-color: ${({ color }) => color || '#fff'};
      border-radius: 10px;
      display: inline-block;
      height: 10px;
      width: 10px;

      margin-left: 0.3rem;

      &:nth-child(2) {
        animation-delay: 0.2s;
      }

      &:nth-child(3) {
        animation-delay: 0.4s;
      }
    }
  }
`
