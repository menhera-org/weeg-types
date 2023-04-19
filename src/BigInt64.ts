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

declare const BIGINT64: unique symbol;

/**
 * A 64-bit signed integer. This effectively extends the bigint type.
 */
export type BigInt64 = bigint & { [BIGINT64]: never };

export function BigInt64 (value: unknown): BigInt64 {
  if (new.target != null) {
    throw new TypeError("Not a constructor");
  }
  const allowedTypes = ['string', 'number', 'bigint', 'boolean'];
  if (!allowedTypes.includes(typeof value)) {
    throw new Error(`Invalid type: ${typeof value}`);
  }
  const bigintValue = BigInt(value as string | number | bigint | boolean);
  return BigInt.asIntN(64, bigintValue) as BigInt64;
}

type _BigInt64 = BigInt64;

export namespace BigInt64 {
  /**
   * Just a type alias for BigInt64.
   */
  export type BigInt64 = _BigInt64;

  /**
   * The minimum value of an BigInt64.
   */
  export const MIN: BigInt64 = BigInt.asIntN(64, 1n << 63n) as BigInt64;

  /**
   * The maximum value of an BigInt64.
   */
  export const MAX: BigInt64 = ~MIN as BigInt64;

  /**
   * Test if a value is an BigInt64. Any value can be passed, but only bigint values return true.
   * @param value The number to test.
   * @returns true if the value is an BigInt64.
   */
  export const isBigInt64 = (value: bigint): value is BigInt64 => typeof value == 'bigint' && BigInt64(value) === value;

  /**
   * Converts a value to an BigInt64.
   * @param value The bigint number to convert to an BigInt64.
   * @returns the BigInt64 value.
   */
  export const toBigInt64 = (value: bigint): BigInt64 => BigInt64(value);

  /**
   * Converts a string to an BigInt64.
   * @param value the value to convert to a BigInt64.
   * @returns the converted value.
   */
  export const fromString = (value: string): BigInt64 => {
    const result = BigInt(value);
    if (!BigInt64.isBigInt64(result)) {
      throw new Error(`Invalid BigInt64: ${value}`);
    }
    return result;
  };
}
