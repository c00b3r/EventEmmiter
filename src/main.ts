import eventEmmiter from "./EventEmmiter";

const logData = (data: unknown) => console.log(data);

eventEmmiter.on("data", logData);
eventEmmiter.emit("data", { message: "Hello world" });
eventEmmiter.off("data", logData);
console.log(eventEmmiter._events);
eventEmmiter.emit("data", { message: "Hello world" });
