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

declare const UINT32: unique symbol;

/**
 * Unsigned 32-bit integer. This effectively extends the number type.
 */
export type Uint32 = number & { [UINT32]: never };

export function Uint32 (value: unknown): Uint32 {
  if (new.target != null) {
    throw new TypeError("Not a constructor");
  }
  if (typeof value == 'bigint') {
    value = BigInt.asUintN(32, value);
  }
  const numberValue = Number(value);
  if (isNaN(numberValue)) {
    throw new Error(`Not a number: ${value}`);
  }
  return (numberValue >>> 0) as Uint32;
}

type _Uint32 = Uint32;

export namespace Uint32 {
  /**
   * Just a type alias for Uint32.
   */
  export type Uint32 = _Uint32;

  /**
   * The minimum value (0) of an Uint32.
   */
  export const MIN: Uint32 = 0 as Uint32;

  /**
   * The maximum value (2^32 - 1) of an Uint32.
   */
  export const MAX: Uint32 = (-1 >>> 0) as Uint32;

  /**
   * Test if a value is a Uint32. Any value can be passed, but only number values return true.
   * @param value The number to test.
   * @returns true if the value is a Uint32.
   */
  export const isUint32 = (value: unknown): value is Uint32 => typeof value == 'number' && Object.is(value, Uint32(value));

  /**
   * Converts a value to a Uint32.
   * @param value The number to convert to a Uint32.
   * @returns the Uint32 value.
   */
  export const toUint32 = (value: number): Uint32 => Uint32(value);

  /**
   * Converts a string to a Uint32.
   * @param value the value to convert to a Uint32.
   * @returns the converted value.
   */
  export const fromString = (value: string): Uint32 => {
    const result = parseInt(value, 10);
    if (!Uint32.isUint32(result)) {
      throw new Error(`Invalid Uint32: ${value}`);
    }
    return result;
  };
}
