import React from 'react'

interface IPager {
  currentPage: number;
  totalPage: number;
  onClick: any;
}

const Pager = ({currentPage, totalPage, onClick}: IPager) => {
  let pager:any[] = [];

  for (let i = 1; i <= totalPage; i++) {
    const lastNum = i % 10;
    if (i == 1 || i == 10) {
      pager.push(i);
    }
    if (currentPage < 3 && i > 1 && i <= 5) {
      pager.push(i);
    }
    if (i == currentPage - 3) {
      pager.push('...');
    }
    if (i >= currentPage - 2 && i < currentPage + 3 && !pager.includes(i)) {
      pager.push(i);
    }
    if (i == currentPage + 3) {
      pager.push('...');
    }
    if (!pager.includes(i) && i <= totalPage && lastNum == 0) {
      pager.push(i);
    }
  }

  const handleClick = (pager:number) => {
    onClick({page: pager})
  }

  return (
    <div>
      <button
        className='btn mr-2'
        disabled={currentPage == 1}
        onClick={() => handleClick(currentPage - 1)}
      >
        {'<'}
      </button>
      {pager.length > 0 &&
        pager.map((page, index) => {
          return (
            <button
              className='btn mr-2'
              key={`pager-item-${index}`}
              disabled={page == currentPage || page == '...'}
              onClick={() => handleClick(page)}
            >
              {page}
            </button>
          );
        })
      }
      <button
        className='btn'
        disabled={currentPage == totalPage}
        onClick={() => handleClick(currentPage + 1)}
      >
        {'>'}
      </button>
    </div>
  )
}

export default Pager
