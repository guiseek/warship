const keyMap = new Map<string, string[]>()

export function addKey(control: string, keys: string[]) {
  keyMap.set(control, keys)
}

function hasKey(key: string) {
  return Array.from(keyMap.entries())
    .filter(([, keys]) => {
      return keys.includes(key)
    })
    .map(([control]) => control)
}

export function control(value: Record<string, boolean>) {
  onkeydown = (ev) => {
    let is = true
    const controls = hasKey(ev.code) ?? []
    if (controls) {
      for (const key of controls) {
        value[key] = true
      }
    } else {
      is = false
    }

    if (is) ev.preventDefault()
  }

  onkeyup = (ev) => {
    let is = true
    const controls = hasKey(ev.code) ?? []
    if (controls) {
      for (const key of controls) {
        value[key] = false
      }
    } else {
      is = false
    }

    if (is) ev.preventDefault()
  }
}
