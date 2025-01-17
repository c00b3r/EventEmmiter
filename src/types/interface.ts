interface EventEmmiterInterface {
  _events: Events[];

  on(eventName: string, listener: Function): void;

  emit<T extends Record<string, unknown>>(eventName: string, data: T): void;

  off(eventName: string, listener: Function): void;
}

type Events = {
  eventName: string;
  listener: Function;
};

export type { EventEmmiterInterface, Events };
