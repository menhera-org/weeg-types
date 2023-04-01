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

import { SmartSet } from "./SmartSet.js";

export class SetMap<K,V> implements Map<K, ReadonlySet<V>> {
  private readonly map: Map<K, Set<V>>;
  private readonly getIdCallback?: (item: V) => unknown;

  public constructor(getIdCallback?: (item: V) => unknown) {
    this.map = new Map();
    this.getIdCallback = getIdCallback;
  }

  public get size(): number {
    return this.map.size;
  }

  /**
   * Total number of items in the sets.
   */
  public get itemCount(): number {
    let count = 0;
    for (const set of this.map.values()) {
      count += set.size;
    }
    return count;
  }

  /**
   * Adds an item to the set associated with the key.
   * @param key
   * @param value
   * @returns the SetMap instance, for chaining.
   */
  public addItem(key: K, value: V): this {
    let set = this.map.get(key);
    if (null == set) {
      set = new SmartSet(this.getIdCallback);
      this.map.set(key, set);
    }
    set.add(value);
    return this;
  }

  /**
   * Deletes an item from the set associated with the key.
   * @param key
   * @param value
   * @returns if the item was deleted.
   */
  public deleteItem(key: K, value: V): boolean {
    const set = this.map.get(key);
    if (null == set) return false;
    const result = set.delete(value);
    if (0 === set.size) {
      this.map.delete(key);
    }
    return result;
  }

  public clear(): void {
    this.map.clear();
  }

  public get(key: K): ReadonlySet<V> | undefined {
    return this.map.get(key);
  }

  public set(key: K, value: ReadonlySet<V>): this {
    this.map.set(key, new SmartSet(this.getIdCallback, value));
    return this;
  }

  public has(key: K): boolean {
    return this.map.has(key);
  }

  public delete(key: K): boolean {
    return this.map.delete(key);
  }

  public forEach(callbackfn: (value: ReadonlySet<V>, key: K, map: Map<K, ReadonlySet<V>>) => void, thisArg?: unknown): void {
    this.map.forEach(callbackfn, thisArg);
  }

  public entries(): IterableIterator<[K, ReadonlySet<V>]> {
    return this.map.entries();
  }

  public keys(): IterableIterator<K> {
    return this.map.keys();
  }

  public values(): IterableIterator<ReadonlySet<V>> {
    return this.map.values();
  }

  public [Symbol.iterator](): IterableIterator<[K, ReadonlySet<V>]> {
    return this.map[Symbol.iterator]();
  }

  public get [Symbol.toStringTag](): string {
    return 'SetMap';
  }
}
