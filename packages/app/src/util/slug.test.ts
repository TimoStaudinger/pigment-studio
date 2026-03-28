import {nameToSlug} from './slug'

it('converts a simple name to a slug', () => {
  expect(nameToSlug('Primary')).toBe('primary')
})

it('replaces spaces with dashes', () => {
  expect(nameToSlug('Light Blue')).toBe('light-blue')
})

it('replaces special characters with dashes', () => {
  expect(nameToSlug('Accent #1')).toBe('accent--1')
  expect(nameToSlug('foo@bar!baz')).toBe('foo-bar-baz')
})

it('handles already-lowercase names', () => {
  expect(nameToSlug('red')).toBe('red')
})

it('handles empty string', () => {
  expect(nameToSlug('')).toBe('')
})

it('handles numbers', () => {
  expect(nameToSlug('Primary 100')).toBe('primary-100')
})
