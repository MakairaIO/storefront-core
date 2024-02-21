export function isEmpty<T>(value: T) {
  if (Array.isArray(value)) {
    return value.length === 0
  }

  if (typeof value === 'object' && value !== null) {
    // Check if it's an object and has no keys
    return Object.keys(value).length === 0 && value.constructor === Object
  }

  return true
}
