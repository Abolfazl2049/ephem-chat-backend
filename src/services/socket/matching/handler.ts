import {Server} from "socket.io";
import {User} from "../../user/entities.js";
import {MySocket} from "../types.js";
import {onUserConnect} from "./utils.js";
let matchingIo: ReturnType<Server["of"]>;
const registerMatchingNamespace = (io: Server) => {
  matchingIo = io.of("/matching");

  matchingIo.on("connection", async (socket: MySocket) => {
    const userId = socket.handshake.auth.userId;
    try {
      const user = await User.findByPk(userId);
      if (user) {
        socket.data.user = user;
        onUserConnect(socket, user);
      } else {
        socket.disconnect();
      }
    } catch (error) {
      console.error("Error during matching connection:", error);
      socket.disconnect();
    }

    socket.on("disconnect", () => {
      console.log("User disconnected from matching:", socket.id, "userId:", socket.data?.user?.id);
    });
  });
};
const getMatchingIO = () => {
  if (!matchingIo) {
    throw new Error("Matching namespace not initialized");
  }
  return matchingIo;
};
export {registerMatchingNamespace, getMatchingIO};
