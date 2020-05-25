import { OPCODE } from "./Constants.ts";

export const Heartbeat = {
  op: OPCODE.ONE,
  d: null,
};

export const Identify = {
  op: OPCODE.TWO,
  d: {
    token: "",
    properties: {
      $os: "linux",
      $browser: "katana",
      $device: "katana",
    },
  },
};

export const headers = {
  "Content-Type": "application/json",
  "Authorization": "",
};

export interface Payload {
  op: number;
  s: number;
  t: string;
  d: any;
}
