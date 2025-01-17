import { EventEmmiterInterface, Events } from "./types/interface";

class EventEmmiter implements EventEmmiterInterface {
  _events: Events[] = [];

  on(eventName: string, listener: EventListener): void {
    this._events.push({ eventName: eventName, listener: listener });
  }

  emit<T extends Record<string, unknown>>(eventName: string, data: T): void {
    const arrayParam = Object.values(data);

    this._events.forEach((event) => {
      if (event.eventName === eventName) {
        event.listener(...arrayParam);
      }
    });
  }

  off(eventName: string, listener: Function): void {
    this._events = this._events.filter((event) => {
      return !(event.eventName === eventName && event.listener === listener);
    });
  }
}

const eventEmmiter = new EventEmmiter();

export default eventEmmiter;
