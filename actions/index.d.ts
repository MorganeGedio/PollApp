// *.d.ts : used to provide typescript type information about a module

import { Action } from "redux";

export interface PayloadAction<T, P> extends Action<T> {
  payload: P;
}

export interface ErrorAction<T, E> extends Action<T> {
  error: E;
}
