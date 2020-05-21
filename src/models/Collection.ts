export default class Collection<K, V> extends Map {
  public filter(fn: Function): Collection<K, V> {
    const filtered = new Collection();
    for (const [key, value] of this) {
      fn(value) ? filtered.set(key, value) : null;
    }
    return filtered;
  }

  public map(fn: Function): Collection<K, V> {
    const mapped = new Collection();
    for (const [key, value] of this) {
      mapped.set(key, fn(value));
    }
    return mapped;
  }
}
