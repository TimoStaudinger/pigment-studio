const throttle = (func: Function, limit: number) => {
  let inThrottle: boolean

  return function() {
    const args = arguments
    // @ts-ignore
    const context = this
    if (!inThrottle) {
      func.apply(context, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

export default throttle
