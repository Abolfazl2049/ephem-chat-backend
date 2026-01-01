import {Server as HTTPServer} from "http";
import {Server} from "socket.io";
import {registerMatchingNamespace} from "./matching/handler.js";
import {registerSignalingNamespace} from "./signaling/handler.js";

let io: Server;

const initSocketIO = (server: HTTPServer) => {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });
  // Register namespaces
  registerMatchingNamespace(io);
  registerSignalingNamespace(io);

  return io;
};

const getIO = () => {
  if (!io) {
    throw new Error("Socket.IO not initialized");
  }
  return io;
};

export {initSocketIO, getIO};
