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

/**
 * A null prototype object.
 * For any object that has null as their prototype, `object instanceof NullPrototype` will return true.
 */
export type NullPrototype<T extends {}> = Record<keyof Object, never> & T;

export const NullPrototype: new <T extends {}>() => NullPrototype<T> = function <T extends {}>() {
  if (null == new.target) {
    throw new TypeError("Cannot call a class as a function");
  }
  return Object.create(null) as NullPrototype<T>;
} as unknown as new <T extends {}>() => NullPrototype<T>;

NullPrototype.prototype = null;

Object.defineProperty(NullPrototype, Symbol.hasInstance, {
  value: (instance: unknown): instance is NullPrototype<{}> => {
    return Object.getPrototypeOf(instance) === null;
  },
});

Object.freeze(NullPrototype);
