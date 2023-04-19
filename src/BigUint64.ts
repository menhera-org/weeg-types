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

declare const BIGUINT64: unique symbol;

/**
 * A 64-bit unsigned integer. This effectively extends the bigint type.
 */
export type BigUint64 = bigint & { [BIGUINT64]: never };

export function BigUint64 (value: unknown): BigUint64 {
  if (new.target != null) {
    throw new TypeError("Not a constructor");
  }
  const allowedTypes = ['string', 'number', 'bigint', 'boolean'];
  if (!allowedTypes.includes(typeof value)) {
    throw new Error(`Invalid type: ${typeof value}`);
  }
  const bigintValue = BigInt(value as string | number | bigint | boolean);
  return BigInt.asUintN(64, bigintValue) as BigUint64;
}

type _BigUint64 = BigUint64;

export namespace BigUint64 {
  /**
   * Just a type alias for BigUint64.
   */
  export type BigUint64 = _BigUint64;

  /**
   * The minimum value (0) of an BigUint64.
   */
  export const MIN: BigUint64 = 0n as BigUint64;

  /**
   * The maximum value (2^64 - 1) of an BigUint64.
   */
  export const MAX: BigUint64 = BigInt.asUintN(64, -1n) as BigUint64;

  /**
   * Test if a value is an BigUint64. Any value can be passed, but only bigint values return true.
   * @param value The number to test.
   * @returns true if the value is an BigUint64.
   */
  export const isBigUint64 = (value: unknown): value is BigUint64 => typeof value == 'bigint' && BigUint64(value) === value;

  /**
   * Converts a value to an BigUint64.
   * @param value The bigint number to convert to an BigUint64.
   * @returns the BigUint64 value.
   */
  export const toBigUint64 = (value: bigint): BigUint64 => BigUint64(value);

  /**
   * Converts a string to an BigUint64.
   * @param value the value to convert to a BigUint64.
   * @returns the converted value.
   */
  export const fromString = (value: string): BigUint64 => {
    const result = BigInt(value);
    if (!BigUint64.isBigUint64(result)) {
      throw new Error(`Invalid BigUint64: ${value}`);
    }
    return result;
  };
}

