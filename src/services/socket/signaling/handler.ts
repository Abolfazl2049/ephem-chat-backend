import {Server} from "socket.io";
import {User} from "../../user/entities.js";
import {MySocket} from "../types.js";
import {Enclave} from "#src/services/enclave/entities.js";

export const registerSignalingNamespace = (io: Server) => {
  const signaling = io.of("/signaling");
  const userSockets = new Map<string, MySocket>();

  signaling.on("connection", async (socket: MySocket) => {
    const userId = socket.handshake.auth.userId;
    const enclaveId = socket.handshake.auth.enclaveId;
    try {
      const user = await User.findByPk(userId);
      const enclave = await Enclave.findByPk(enclaveId);
      if (user && enclave) {
        socket.data.user = user;
        socket.data.enclave = enclave;
        socket.join(enclaveId);
        userSockets.set(userId, socket);

        console.log("User connected to signaling:", socket.id, "userId:", userId);
      } else {
        socket.disconnect();
      }
    } catch (error) {
      console.error("Error during signaling connection:", error);
      socket.disconnect();
    }

    // Join
    socket.on("join", data => {
      socket.to(enclaveId).emit("join", {
        userId: socket.data?.user.id,
        enclaveId: enclaveId
      });
    });

    // WebRTC Offer
    socket.on("offer", data => {
      const targetSocket = userSockets.get(data.targetUserId);
      if (targetSocket) {
        targetSocket.emit("offer", {
          from: socket.id,
          userId: socket.data?.user.id,
          offer: data.offer,
          enclaveId: enclaveId
        });
      }
    });

    // WebRTC Answer
    socket.on("answer", data => {
      const targetSocket = userSockets.get(data.targetUserId);
      if (targetSocket) {
        targetSocket.emit("answer", {
          from: socket.id,
          userId: socket.data?.user.id,
          answer: data.answer,
          enclaveId: enclaveId
        });
      }
    });

    // ICE Candidate
    socket.on("candidate", data => {
      const targetSocket = userSockets.get(data.targetUserId);
      if (targetSocket) {
        targetSocket.emit("candidate", {
          from: socket.id,
          userId: socket.data?.user.id,
          candidate: data.candidate,
          enclaveId: enclaveId
        });
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected from signaling:", socket.id, "userId:", socket.data?.user.id);
      socket.to(enclaveId).emit("left", {
        userId: socket.data?.user.id,
        enclaveId: enclaveId
      });
      userSockets.delete(userId);
    });
  });
};
