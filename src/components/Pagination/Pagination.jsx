import './Pagination.css'

const Pagination = ({ page, setPage, totalPage, loading, error }) => {
  function handlePreviousPage() {
    setPage(page - 1)
    window.scroll(0, 0)
  }

  function handleNextPage() {
    setPage(page + 1)
    window.scroll(0, 0)
  }

  return (
    <div className={`pagination ${(loading || error) && 'pagination--hide'}`}>
      <button
        className='pagination__btn'
        onClick={handlePreviousPage}
        disabled={page <= 1}>
        Previous
      </button>
      <div className='pagination__box'>
        <span className='pagination__current-page'>{page}</span>
        <span> / </span>
        <span className='pagination__total-page'>{totalPage}</span>
      </div>
      <button
        className='pagination__btn'
        onClick={handleNextPage}
        disabled={page >= totalPage}>
        Next
      </button>
    </div>
  )
}

export default Pagination
