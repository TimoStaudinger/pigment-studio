import React, {useRef, useEffect} from 'react'

interface Props {
  children: React.ReactNode
}

const BlockPageScroll = ({children}: Props) => {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollEl = scrollRef.current
    scrollEl?.addEventListener('wheel', stopScroll)
    return () => scrollEl?.removeEventListener('wheel', stopScroll)
  }, [])

  const stopScroll = (e: WheelEvent) => e.preventDefault()

  return <div ref={scrollRef}>{children}</div>
}

export default BlockPageScroll
