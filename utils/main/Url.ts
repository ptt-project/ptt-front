const href = (pathname: string, locale: string): string => {
  if (locale === 'en') {
    return `/en${pathname}`
  }
  return pathname
}

export { href }
