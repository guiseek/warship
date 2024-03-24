type Child = Node | Text | string;

export function create<Name extends keyof HTMLElementTagNameMap>(
  name: Name,
  attrs: Partial<HTMLElementTagNameMap[Name]> = {},
  ...children: Child[]
): HTMLElementTagNameMap[Name] {
  const el = document.createElement(name);
  el.append(...children);
  return Object.assign(el, attrs);
}
