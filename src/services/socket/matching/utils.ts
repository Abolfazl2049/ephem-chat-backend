import {createEnclave} from "../../enclave/service.js";
import {User} from "../../user/entities.js";
import {MySocket} from "../types.js";
import {getMatchingIO} from "./handler.js";
function onUserConnect(socket: MySocket, user: User) {
  socket.data.user = user;
  socket.data.status = "searching";
  searchForMatch(socket);
}

function searchForMatch(socket: MySocket) {
  const searchingSockets = Array.from(getMatchingIO().sockets.values()).filter(s => s.data.status === "searching" && s.id !== socket.id);
  console.log(
    "searchingSockets:",
    searchingSockets.map(s => s.id)
  );
  if (searchingSockets.length > 0) {
    const opponentSocket = searchingSockets[0] as MySocket;
    const opponentSocketRef = getMatchingIO().sockets.get(opponentSocket.id) as MySocket | undefined;
    console.log("opponentSocketRef:", opponentSocketRef?.id);
    if (opponentSocketRef) onMatchFound(socket, opponentSocketRef);
  }
}

async function onMatchFound(socket1: MySocket, socket2: MySocket) {
  socket1.data.status = "processing";
  socket2.data.status = "processing";
  socket1.emit("matchFound");
  socket2.emit("matchFound");
  try {
    const enclave = await createEnclave([socket1.data.user!, socket2.data.user!]);
    socket1.emit("enclaveCreated", {enclaveId: enclave.id});

    setTimeout(() => {
      socket2.emit("enclaveCreated", {enclaveId: enclave.id});
    }, 3000);
  } catch (error) {
    console.error("Error creating enclave:", error);
    socket1.emit("matchFailed");
    socket2.emit("matchFailed");
    socket1.data.status = "searching";
    socket2.data.status = "searching";
  }
}
export {onUserConnect, searchForMatch};
