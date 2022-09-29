// ============= Test Cases =============
import type { Alike, Expect } from "./test-utils.ts";

type cases = [
  Expect<Alike<MyReadonly2<Todo1>, Readonly<Todo1>>>,
  Expect<Alike<MyReadonly2<Todo1, "title" | "description">, Expected>>,
  Expect<Alike<MyReadonly2<Todo2, "title" | "description">, Expected>>,
];

// @ts-expect-error
type error = MyReadonly2<Todo1, "title" | "invalid">;

interface Todo1 {
  title: string;
  description?: string;
  completed: boolean;
}

interface Todo2 {
  readonly title: string;
  description?: string;
  completed: boolean;
}

interface Expected {
  readonly title: string;
  readonly description?: string;
  completed: boolean;
}

// ============= Your Code Here =============

type MyOmit<T, K extends keyof T> = {
  [P in keyof T as P extends K ? never : P]: T[P];
};
type MyReadonly1<T, K extends keyof T> = {
  readonly [P in keyof T as P extends K ? P : never]: T[P];
};

// type MyReadonly2<T, K extends keyof T = keyof T> =
//   & MyReadonly1<T, K>
//   & MyOmit<T, K>;

type MyReadonly2<T, K extends keyof T = keyof T> =
  & {
    readonly [P in K]: T[P];
  }
  & {
    [P in keyof T as P extends K ? never : P]: T[P];
  };
type A = MyReadonly2<Todo1>;
type B = MyReadonly2<Todo2, "title" | "description">;
