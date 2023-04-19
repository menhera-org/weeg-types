/* -*- indent-tabs-mode: nil; tab-width: 2; -*- */
/* vim: set ts=2 sw=2 et ai : */
/**
  Copyright (C) 2023 WebExtensions Experts Group

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
  @license
*/

declare const INT32: unique symbol;

/**
 * Signed 32-bit integer. This effectively extends the number type.
 */
export type Int32 = number & { [INT32]: never };

export function Int32 (value: unknown): Int32 {
  if (new.target != null) {
    throw new TypeError("Not a constructor");
  }
  if (typeof value == 'bigint') {
    value = BigInt.asIntN(32, value);
  }
  const numberValue = Number(value);
  if (isNaN(numberValue)) {
    throw new Error(`Not a number: ${value}`);
  }
  return (0 | numberValue) as Int32;
}

// just a hack.
type _Int32 = Int32;

export namespace Int32 {
  /**
   * Just a type alias for Int32.
   */
  export type Int32 = _Int32;

  /**
   * The minimum value of an Int32.
   */
  export const MIN: Int32 = (1 << 31) as Int32;

  /**
   * The maximum value of an Int32.
   */
  export const MAX: Int32 = ~MIN as Int32;

  /**
   * Test if a value is an Int32. Any value can be passed, but only number values return true.
   * @param value The number to test.
   * @returns true if the value is an Int32.
   */
  export const isInt32 = (value: unknown): value is Int32 => typeof value == 'number' && Object.is(value, 0|value);

  /**
   * Converts a value to an Int32.
   * @param value The number to convert to an Int32.
   * @returns the Int32 value.
   */
  export const toInt32 = (value: number): Int32 => Int32(value);

  /**
   * Converts a string to an Int32.
   * @param value the value to convert to a Int32.
   * @returns the converted value.
   */
  export const fromString = (value: string): Int32 => {
    const result = parseInt(value, 10);
    if (!Int32.isInt32(result)) {
      throw new Error(`Invalid Int32: ${value}`);
    }
    return result;
  };
}
