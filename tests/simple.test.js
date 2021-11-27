const { expect } = require('@jest/globals');
const add = require('../utils');

test('adds two numbers', () => {
    expect(add(1,1)).toBe(2);
    
})

test('adds positive and negative numbers', () => {
    expect(add(1,-1)).toBe(0);
})