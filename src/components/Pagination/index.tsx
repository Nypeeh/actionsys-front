import { CSSProperties, useCallback } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

import { Container } from './styles'

interface PaginationData {
  totalPages: number
  offset: number
  setOffset: CallableFunction
  style?: CSSProperties
}

const MAX_ITEMS = 5
const MAX_LEFT = (MAX_ITEMS - 1) / 2

const Pagination: React.FC<PaginationData> = ({
  totalPages,
  offset,
  setOffset,
  style,
}) => {
  const first = Math.max(offset - MAX_LEFT, 1)

  const onPageChange = useCallback(
    page => {
      setOffset(page - 1)
    },
    [setOffset],
  )

  return (
    <Container total={totalPages} style={style && style}>
      <button onClick={() => setOffset(offset - 1)} disabled={offset === 1}>
        <FaChevronLeft />
      </button>

      {Array.from({ length: Math.min(MAX_ITEMS, totalPages) })
        .map((_, index) => index + first)
        .map(page => (
          <button
            onClick={() => onPageChange(page + 1)}
            key={page}
            className={page === offset ? 'pagination-active' : ''}
            disabled={page > totalPages}
          >
            {page <= totalPages && page}
          </button>
        ))}

      <button
        onClick={() => setOffset(offset + 1)}
        disabled={offset === totalPages}
      >
        <FaChevronRight />
      </button>

      <div className="bar"></div>
    </Container>
  )
}

export default Pagination
