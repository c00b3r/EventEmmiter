import eventEmmiter from "../EventEmmiter";

describe("EventEmmiter", () => {
  it("should register event and his listener", () => {
    const mockFunction = jest.fn();
    eventEmmiter.on("data", mockFunction);

    expect(eventEmmiter._events.length).toBe(1);
    expect(eventEmmiter._events[0].eventName).toBe("data");
    expect(eventEmmiter._events[0].listener).toBe(mockFunction);
  });

  it("shoulda call listener", () => {
    const mockFunction = jest.fn();
    eventEmmiter.on("data", mockFunction);
    eventEmmiter.emit("data", { message: "Hello world" });

    expect(mockFunction).toHaveBeenCalledTimes(1);
    expect(mockFunction).toHaveBeenCalledWith("Hello world");
  });

  it("should remove listener", () => {
    const mockFunction = jest.fn();
    eventEmmiter.on("data", mockFunction);
    eventEmmiter.off("data", mockFunction);
    eventEmmiter.emit("data", { message: "Hello world" });

    expect(mockFunction).not.toHaveBeenCalled();
  });

  it("should remove listener for name and listener", () => {
    const mockFunction = jest.fn();
    const mockFunction1 = jest.fn();

    eventEmmiter.on("data", mockFunction);
    eventEmmiter.on("data", mockFunction1);

    eventEmmiter.off("data", mockFunction);
    eventEmmiter.emit("data", { message: "Hello world" });

    expect(mockFunction).not.toHaveBeenCalled();
    expect(mockFunction1).toHaveBeenCalledTimes(1);
    expect(mockFunction1).toHaveBeenCalledWith("Hello world");
  });

  it("should be call with another type of data", () => {
    const mockFunction = jest.fn();
    eventEmmiter.on("data", mockFunction);

    eventEmmiter.on("data", mockFunction);

    eventEmmiter.emit("data", { message: "Hello world" });
    expect(mockFunction).toHaveBeenCalledWith("Hello world");

    eventEmmiter.emit("data", { value: 123 });
    expect(mockFunction).toHaveBeenCalledWith(123);

    eventEmmiter.emit("data", { array: [1, 2, 3] });
    expect(mockFunction).toHaveBeenCalledWith([1, 2, 3]);

    eventEmmiter.emit("data", { user: { login: 123, password: "secret" } });
    expect(mockFunction).toHaveBeenCalledWith({
      login: 123,
      password: "secret",
    });
  });

  it("shoud call with multiple arguments", () => {
    const mockFunction = jest.fn();
    eventEmmiter.on("data", mockFunction);
    eventEmmiter.emit("data", { message: "Hello", id: 1 });

    expect(mockFunction).toHaveBeenCalledTimes(1);
    expect(mockFunction).toHaveBeenCalledWith("Hello", 1);
  });

  it("should dont call with not register event", () => {
    expect(() => {
      eventEmmiter.emit("data", { message: "Hello world" });
    }).not.toThrow();
  });
});
