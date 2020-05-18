import { OPCODE } from './Constants.ts';

export const Heartbeat = {
  op: OPCODE.ONE,
  d: null,
}

export const Identify = {
  op: OPCODE.TWO,
  d: {
    token: '',
    properties: {
      $os: 'linux',
      $browser: 'denocord',
      $device: 'denocord',
    }
  }
}

export const headers = {
  'Content-Type' : 'application/json',
  'Authorization' : '',
}