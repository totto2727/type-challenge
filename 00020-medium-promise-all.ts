// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils.ts";

const promiseAllTest1 = PromiseAll([1, 2, 3] as const);
const promiseAllTest2 = PromiseAll([1, 2, Promise.resolve(3)] as const);
const promiseAllTest3 = PromiseAll([1, 2, Promise.resolve(3)]);

type cases = [
  Expect<Equal<typeof promiseAllTest1, Promise<[1, 2, 3]>>>,
  Expect<Equal<typeof promiseAllTest2, Promise<[1, 2, number]>>>,
  Expect<Equal<typeof promiseAllTest3, Promise<[number, number, number]>>>,
];

// ============= Your Code Here =============
declare function PromiseAll<T extends unknown[]>(
  values: readonly [...T],
): Promise<
  { -readonly [P in keyof T]: T[P] extends Promise<infer U> ? U : T[P] }
>;

type A = typeof promiseAllTest1;
type B = typeof promiseAllTest3;
