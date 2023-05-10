/** array-move version 4.0
Credit: https://github.com/sindresorhus/array-move

Licence:

MIT License

Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (https://sindresorhus.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
documentation files (the "Software"), to deal in the Software without restriction, including without limitation the
rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit
persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or
substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
USE OR OTHER DEALINGS IN THE SOFTWARE.
**/

/**
Moves the item to the new position in the input array. Useful for huge arrays where absolute performance is needed.

@param array - The array to modify.
@param fromIndex - The index of item to move. If negative, it will begin that many elements from the end.
@param toIndex - The index of where to move the item. If negative, it will begin that many elements from the end.
**/
export function arrayMoveMutable (array: unknown[], fromIndex: number, toIndex: number): void {
  const startIndex = fromIndex < 0 ? array.length + fromIndex : fromIndex

  if (startIndex >= 0 && startIndex < array.length) {
    const endIndex = toIndex < 0 ? array.length + toIndex : toIndex

    const [item] = array.splice(fromIndex, 1)
    array.splice(endIndex, 0, item)
  }
}

/**
Clones the given `array`, moves the item to a new position in the new array, and then returns the new array.
The given `array` is not mutated.

@param array - The array with the item to move.
@param fromIndex - The index of item to move. If negative, it will begin that many elements from the end.
@param toIndex - The index of where to move the item. If negative, it will begin that many elements from the end.
@returns A new array with the item moved to the new position.
**/
export function arrayMoveImmutable<ValueType> (array: readonly ValueType[], fromIndex: number, toIndex: number):
  ValueType[] {
  const newArray = [...array]
  arrayMoveMutable(newArray, fromIndex, toIndex)
  return newArray
}
