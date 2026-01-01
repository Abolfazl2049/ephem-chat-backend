import {Socket} from "socket.io";
import {User} from "../user/entities.ts";
import {Enclave} from "../enclave/entities.ts";

interface MySocket extends Socket {
  data: SocketData;
}
interface SocketData {
  user: User;
  status: "searching" | "processing";
  enclave: Enclave;
}
export {MySocket, SocketData};
