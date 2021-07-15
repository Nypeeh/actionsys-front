import { HTMLAttributes } from 'react'

import { Container } from './styles'

interface DotsLoaderProps extends HTMLAttributes<HTMLDivElement> {}

const DotsLoader: React.FC<DotsLoaderProps> = ({ ...props }) => {
  return (
    <Container {...props}>
      <div className="loading-dots">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
    </Container>
  )
}

export default DotsLoader
