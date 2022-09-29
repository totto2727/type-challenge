// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils.ts";

type cases = [
  Expect<Equal<DeepReadonly<X>, Expected>>,
];

type X = {
  a: () => 22;
  b: string;
  c: {
    d: boolean;
    e: {
      g: {
        h: {
          i: true;
          j: "string";
        };
        k: "hello";
      };
      l: [
        "hi",
        {
          m: ["hey"];
        },
      ];
    };
  };
};

type Expected = {
  readonly a: () => 22;
  readonly b: string;
  readonly c: {
    readonly d: boolean;
    readonly e: {
      readonly g: {
        readonly h: {
          readonly i: true;
          readonly j: "string";
        };
        readonly k: "hello";
      };
      readonly l: readonly [
        "hi",
        {
          readonly m: readonly ["hey"];
        },
      ];
    };
  };
};

// ============= Your Code Here =============
// type DeepReadonly<T extends object> = {
//   readonly [P in keyof T]: T[P] extends Function ? T[P]
//     : T[P] extends object ? DeepReadonly<T[P]>
//     : T[P];
// };
// type DeepReadonly<T extends Record<string, unknown>> = {
//   readonly [P in keyof T]: T[P] extends Record<string, unknown>
//     ? DeepReadonly<T[P]>
//     : T[P] extends unknown[] ? readonly [...T[P]]
//     : T[P];
// };
type DeepReadonly<T extends Record<string, unknown> | unknown[]> = {
  readonly [P in keyof T]: T[P] extends Record<string, unknown> | unknown[]
    ? DeepReadonly<T[P]>
    : T[P];
};

type A = DeepReadonly<{ a: () => void; b: number[]; c: [1]; d: number }>;
type B = DeepReadonly<X>;
