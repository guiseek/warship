export class EventMap<T extends object> {
  #mapper = new Map()

  on<Event extends keyof T>(event: Event, cb: Callback<T[Event]>) {
    const events = this.#getEvents(event)
    this.#mapper.set(event, events.add(cb))

    const cancel = () => {
      const events = this.#getEvents(event)
      events.delete(cb)
      this.#setEvents(event, events)
    }

    return {cancel}
  }

  emit<Event extends keyof T>(event: Event, value?: T[Event]): void
  emit<Event extends keyof T>(event: Event, value: T[Event]) {
    for (const cb of this.#getEvents(event)) cb(value)
  }

  #setEvents<Event extends keyof T>(
    event: Event,
    events: Set<Callback<T[Event]>>
  ) {
    this.#mapper.set(event, events)
  }

  #getEvents<Event extends keyof T>(event: Event): Set<Callback<T[Event]>> {
    return this.#mapper.get(event) ?? new Set()
  }
}
