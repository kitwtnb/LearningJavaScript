import Calculator from '../src/js/calculator'

test('adds 1 + 2 to equal 3', () => {
  const c = new Calculator()
  expect(c.add(1, 2)).toBe(3)
})
