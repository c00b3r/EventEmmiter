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
});
