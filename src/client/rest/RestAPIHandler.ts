import Client from '../Client.ts';
import { headers } from '../../constants/Payloads.ts';
import { Constants, ENDPOINTS } from '../../constants/Constants.ts';
import Message from '../../models/Message.ts';
import { MessageOptions } from '../../typedefs/MessageOptions.ts';

export default class RestAPIHandler {
  
  private _token: string = '';

  constructor(private client: Client) {
    Object.defineProperty(this, '_token', {
      enumerable: false
    })
  }

  async fetchGuilds() {
    const response = await fetch(`${Constants.API}/${ENDPOINTS.USER_GUILDS}`, { headers });
    return response.json();
  }

  async fetchGuild(id: string) {
    const response = await fetch(`${Constants.API}/${ENDPOINTS.GUILDS}/${id}`, { headers });
    return response.json();
  }

  async fetchChannels(id: string) {
    const response = await fetch(`${Constants.API}/${ENDPOINTS.GUILDS}/${id}/${ENDPOINTS.CHANNELS}`, { headers });
    return response.json();
  }

  async createMessage(options: MessageOptions, id: string) {
    const data = {
      content: options.content,
      tts: options.tts
    }
    const response = await fetch(`${Constants.API}/${ENDPOINTS.CHANNELS}/${id}/${ENDPOINTS.MESSAGES}`, {
      headers,
      body: JSON.stringify(data),
    });
    const json = await response.json();
  }

  set token(token: string) {
    this._token = token;
    headers.Authorization = `Bot ${this._token}`;
  }

}