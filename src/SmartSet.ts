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

export class SmartSet<T> implements Set<T> {
  public readonly getIdCallback: (item: T) => unknown;
  private readonly map = new Map<unknown, T>();

  public constructor(getIdCallback?: (item: T) => unknown, items?: Iterable<T>) {
    this.getIdCallback = getIdCallback ?? ((item: T) => item);
    if (null == items) return;
    for (const item of items) {
      this.add(item);
    }
  }

  public get [Symbol.toStringTag](): string {
    return 'SmartSet';
  }

  public getId(item: T): unknown {
    return this.getIdCallback(item);
  }

  public add(value: T): this {
    const id = this.getId(value);
    if (this.map.has(id)) return this;
    this.map.set(id, value);
    return this;
  }

  public clear(): void {
    this.map.clear();
  }

  public delete(value: T): boolean {
    const id = this.getId(value);
    return this.map.delete(id);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public forEach(callbackfn: (value: T, value2: T, set: Set<T>) => void, thisArg?: any): void {
    this.map.forEach((value /*, key, map */) => {
      callbackfn(value, value, this);
    }, thisArg);
  }

  public has(value: T): boolean {
    const id = this.getId(value);
    return this.map.has(id);
  }

  public get size(): number {
    return this.map.size;
  }

  public *[Symbol.iterator](): IterableIterator<T> {
    for (const value of this.map.values()) {
      yield value;
    }
  }

  public *entries(): IterableIterator<[T, T]> {
    for (const value of this) {
      yield [value, value];
    }
  }

  public keys(): IterableIterator<T> {
    return this[Symbol.iterator]();
  }

  public values(): IterableIterator<T> {
    return this[Symbol.iterator]();
  }
}
