import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  max-width: 320px;

  > div {
    width: 100%;
    border-radius: 0.5rem 0.5rem;
    box-shadow: 0 0 16px 2px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    > main {
      padding: 1rem;

      > strong {
        font-size: 1.1rem;
        display: inline-block;
        width: 100%;
        text-align: center;
        margin-bottom: 1rem;
      }

      > p {
        & + p {
          margin-top: 0.5rem;
        }
      }
    }
  }
`

export const ImgContainer = styled.div`
  width: 100%;
  background-color: #28262e;
  height: 150px;
  border-radius: 0.5rem 0.5rem 0 0;
  display: flex;
  justify-content: center;
  align-items: center;

  > svg {
    font-size: 3rem;
    color: #f5f5f5;
  }
`
