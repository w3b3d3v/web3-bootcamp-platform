const { isObjectFulfilled } = require('../../utils/validators');

describe('isObjectFulfilled', () => {
    test('returns true when all string values are non-empty', () => {
      const obj = {
        name: 'John',
        age: '30',
        email: 'john@example.com'
      };
  
      expect(isObjectFulfilled(obj)).toBe(true);
    });
  
    test('returns false when a string value is empty', () => {
      const obj = {
        name: 'John',
        age: '',
        email: 'john@example.com'
      };
  
      expect(isObjectFulfilled(obj)).toBe(false);
    });
  
    test('returns true when all nested string values are non-empty', () => {
      const obj = {
        name: 'John',
        addresses: [
          { city: 'New York', street: '123 Main St' },
          { city: 'London', street: '456 Elm St' }
        ]
      };
  
      expect(isObjectFulfilled(obj)).toBe(true);
    });
  
    test('returns false when a nested string value is empty', () => {
      const obj = {
        name: 'John',
        addresses: [
          { city: 'New York', street: '123 Main St' },
          { city: '', street: '456 Elm St' }
        ]
      };
  
      expect(isObjectFulfilled(obj)).toBe(false);
    });
  
    test('returns true when array values contain non-empty objects', () => {
      const obj = {
        name: 'John',
        addresses: [
          { city: 'New York', street: '123 Main St' },
          { city: 'London', street: '456 Elm St' }
        ],
        hobbies: ['reading', 'traveling']
      };
  
      expect(isObjectFulfilled(obj)).toBe(true);
    });
  
    test('returns false when array values contain empty objects', () => {
      const obj = {
        name: 'John',
        addresses: [
          { city: 'New York', street: '123 Main St' },
          { city: '', street: '456 Elm St' }
        ],
        hobbies: ['reading', '']
      };
  
      expect(isObjectFulfilled(obj)).toBe(false);
    });
  
  
    test('returns true when nested array contains non-empty objects', () => {
      const obj = {
        name: 'John',
        addresses: [
          { city: 'New York', street: '123 Main St' },
          { city: 'London', street: '456 Elm St' },
          { city: 'Paris', street: '789 Oak St' }
        ]
      };
  
      expect(isObjectFulfilled(obj)).toBe(true);
    });
  });