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
export type BigUint64 = bigint & { [BIGUINT64]: never };

export const MIN: BigUint64 = 0n as BigUint64;
export const MAX: BigUint64 = BigInt.asUintN(64, -1n) as BigUint64;

export const BigUint64 = (value: unknown): BigUint64 => {
  const allowedTypes = ['string', 'number', 'bigint', 'boolean'];
  if (!allowedTypes.includes(typeof value)) {
    throw new Error(`Invalid type: ${typeof value}`);
  }
  const bigintValue = BigInt(value as string | number | bigint | boolean);
  return toBigUint64(bigintValue);
};

/**
 * Test if a value is an BigUint64. This throws on numbers.
 * @param value The number to test.
 * @returns true if the value is an BigUint64.
 */
export const isBigUint64 = (value: bigint): value is BigUint64 => toBigUint64(value) === value;

/**
 * Converts a value to an BigUint64. This throws on numbers (use BigInt(number)).
 * @param value The number to convert to an BigUint64.
 * @returns the BigUint64 value.
 */
export const toBigUint64 = (value: bigint): BigUint64 => BigInt.asUintN(64, value) as BigUint64;

/**
 * Converts a string to an BigUint64.
 * @param value the value to convert to a BigUint64.
 * @returns the converted value.
 */
export const fromString = (value: string): BigUint64 => {
  const result = BigInt(value);
  if (!isBigUint64(result)) {
    throw new Error(`Invalid BigUint64: ${value}`);
  }
  return result;
};
