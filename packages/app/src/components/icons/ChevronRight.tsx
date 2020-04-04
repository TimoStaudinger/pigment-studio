import React from 'react'

const ChevronRight = ({
  className,
  size = 24
}: {
  size?: number
  className?: string
}) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="2"
    viewBox="0 0 24 24"
    style={{height: size, width: size}}
  >
    <path d="M9 5l7 7-7 7"></path>
  </svg>
)

export default ChevronRight
