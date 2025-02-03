/**
 * A sorted array map that allows for O(log n) insertion, deletion, and search.
 * 
 * @public
 */
export class SortedArrayMap<V> {
    private _map: Map<number, V> = new Map()
    private _keys: number[] = []

    /**
     * Binary search for the key in the sorted array.
     * @param key The key to search for.
     * @returns 
     * 
     * @private
     */
    private _binarySearch(key: number) {
        let low = 0
        let high = this._keys.length - 1
        while (low <= high) {
            const mid = Math.floor((low + high) / 2)
            if (this._keys[mid]! < key) {
                low = mid + 1
            } else if (this._keys[mid]! > key) {
                high = mid - 1
            } else {
                return { index: mid, found: true }
            }
        }
        return { index: low, found: false }
    }

    clear(): void {
        this._map.clear();
        this._keys = [];
    }


    /**
     * Delete a key from the map.
     * 
     * @param key The key to delete.
     * @returns true if an element in the Map existed and has been removed, or false if the element does not exist.
     * 
     * @public
     */
    delete(key: number): boolean {
        if (this._map.has(key)) {
            const { index } = this._binarySearch(key);
            this._keys.splice(index, 1);
            this._map.delete(key);
            return true;
        }
        return false;
    }

    // /**
    //  * Executes a provided function once per each key/value pair in the Map, in key order.
    //  * 
    //  * @internal
    //  */
    // forEach(callbackfn: (value: V, key: number, map: Map<number, V>) => void, thisArg?: any): void {
    //     this._keys.forEach(key => {
    //         const value = this._map.get(key)!;
    //         callbackfn.call(thisArg, value, key, this)
    //     });
    // }

    /**
     * Get a value from the map.
     * 
     * @param key The key to get.
     * @returns Returns the element associated with the specified key. If no element is associated with the specified key, undefined is returned.
     * 
     * @public
     */
    get(key: number): V | undefined  {
        return this._map.get(key);
    }

    /**
     * @returns  boolean indicating whether an element with the specified key exists or not.
     * 
     * @public
     */
    has(key: number): boolean {
        return this._map.has(key);
    }

    /**
     * Adds a new element with a specified key and value to the Map. If an element with the same key already exists, the element will be updated.
     * 
     * @param key The key to set.
     * @param value The value to set.
     * 
     * @public
     */
    set(key: number, value: V): this {
        if (!this._map.has(key)) {
          const { index } = this._binarySearch(key);
          this._keys.splice(index, 0, key);
          this._map.set(key, value);
        }
        this._map.set(key, value);
        return this;
    }

    /**
     * @returns the number of elements in the Map.
     */
    get size() {
        return this._map.size;
    }

    // /** Returns an iterable of entries in the map. */
    // [Symbol.iterator](): MapIterator<[number, V]> {
    //     return this.entries();
    // }

    // /**
    //  * Returns an iterable of key, value pairs for every entry in the map.
    //  */
    // entries(): MapIterator<[number, V]> {
    //     class Iter<V> implements MapIterator<[number, V]> {
    //         private keyIter: Iterator<number>;
            
    //         constructor(private map: SortedArrayMap<any>) {
    //             this.map = map;
    //             this.keyIter = this.map.keys();
    //         }
        
    //         next(): IteratorResult<[number, V]> {
    //             const { done, value } = this.keyIter.next();
    //             if (!done) {
    //                 return { done: false, value: [value, this.map.get(value!)!] } 
    //             }
    //             return { done: true, value: undefined } 
    //         }
            
    //         [Symbol.iterator](): MapIterator<[number, V]> {
    //             return this
    //         }
    //     }

    //     return new Iter(this);
    // }

    /**
     * Returns an iterable of keys in the map
     */
    keys(): MapIterator<number> {
        return this._keys[Symbol.iterator]();
    }

    // values(): MapIterator<V> {
    //     class Iter<V> implements MapIterator<V> {
    //         private keyIter: Iterator<number>;
            
    //         constructor(private map: SortedArrayMap<any>) {
    //             this.map = map;
    //             this.keyIter = this.map.keys();
    //         }
        
    //         next() {
    //             const { done, value } = this.keyIter.next();
    //             return { done, value: done ? undefined : this.map.get(value!) }
    //         }
            
    //         [Symbol.iterator](): MapIterator<V> {
    //             return this
    //         }
    //     }

    //     return new Iter(this);
    // }
 
    // [Symbol.toStringTag]: string = "[object SortedArrayMap]";


    last(): [number, V] | undefined {
        if (this._keys.length === 0) {
            return undefined;
        }
        const key = this._keys[this._keys.length - 1]!;
        return [key, this._map.get(key)!];
    }
    
}

export class SortedArraySet  {
    private _map: SortedArrayMap<null> = new SortedArrayMap<null>();

    add(value: number): this {
        this._map.set(value, null);
        return this;
    }

    clear(): void {
        this._map.clear();
    }

    delete(value: number): boolean {
        return this._map.delete(value);
    }

    // forEach(callbackfn: (value: number, value2: number, set: Set<number>) => void, thisArg?: any): void {
    //     this._map.forEach((_, key) => {
    //         callbackfn.call(thisArg, key, key, this);
    //     });
    // }

    has(value: number): boolean {
        return this._map.has(value);
    }

    get size(): number {
        return this._map.size;
    }

    last(): number | undefined {
        return this._map.last()?.[0];
    }

    // entries(): IterableIterator<[number, number]> {
    //     class Iter<V> implements IterableIterator<[number, number]> {
    //         private keyIter: Iterator<number>;
            
    //         constructor(private set: SortedArraySet) {
    //             this.set = set;
    //             this.keyIter = this.set.keys();
    //         }
        
    //         next() {
    //             const { done, value } = this.keyIter.next();
    //             return { done, value: done ? undefined : [value, value] }
    //         }
            
    //         [Symbol.iterator](): MapIterator<V> {
    //             return this
    //         }
    //     }

    //     return new Iter(this);
    // }

    // keys(): IterableIterator<number> {
    //     return this._map.keys();
    // }

    // values(): IterableIterator<number> {
    //     return this._map.keys();
    // }

    [Symbol.iterator](): IterableIterator<number> {
        return this._map.keys();
    }

    // [Symbol.toStringTag]: string = "SortedArraySet";
}
