import React from 'react'

const Selector = ({size = 24}: {size?: number}) => (
  <svg
    fill="none"
    stroke="currentColor"
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="2"
    viewBox="0 0 24 24"
    style={{height: size, width: size}}
  >
    <path d="M8 9l4-4 4 4m0 6l-4 4-4-4"></path>
  </svg>
)

export default Selector
