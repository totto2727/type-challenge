// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils.ts";

type cases = [
  Expect<Equal<Push<[], 1>, [1]>>,
  Expect<Equal<Push<[1, 2], "3">, [1, 2, "3"]>>,
  Expect<Equal<Push<["1", 2, "3"], boolean>, ["1", 2, "3", boolean]>>,
];

// ============= Your Code Here =============
type Push<T extends unknown[], U> = [...T, U];
type A = Push<[1, 2], "3">;
