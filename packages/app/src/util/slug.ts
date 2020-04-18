export const nameToSlug = (name: string): string =>
  name.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()
