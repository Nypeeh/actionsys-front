import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;

  > h1 {
    display: block;
    margin: 0 auto;
    text-align: center;
    width: 100%;
    margin-top: 2rem;
    color: #ff9000;
    border-bottom: 1px solid #ff9000;
    max-width: 600px;
    padding-bottom: 0.5rem;
  }

  > button {
    background-color: #ff9000;
    border: 0;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    position: fixed;
    right: 2%;
    bottom: 2%;
    font-size: 2rem;
    transition: filter 0.2s ease;

    display: flex;
    justify-content: center;
    align-items: center;

    :hover {
      filter: brightness(0.8);
    }
  }
`

export const EmployeesContainer = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 1rem;
  gap: 2rem;
  padding: 3rem 2% 3rem;

  > h2 {
    display: flex;
    flex-direction: column;
    align-items: center;

    > svg {
      color: #ff9000;
      font-size: 4rem;
      margin-top: 0.5rem;
    }
  }
`
