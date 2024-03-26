/// <reference types="vite/client" />

declare const container: HTMLDivElement
declare const nickname: HTMLInputElement
declare const color: HTMLInputElement
declare const form: HTMLFormElement

interface Callback<T> {
  (value: T): void
}

type Child = Node | Text | string
