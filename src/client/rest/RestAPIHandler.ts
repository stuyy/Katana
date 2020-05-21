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
    const response = await fetch(`${Constants.API}/${ENDPOINTS.GUILDS}/${id}?with_counts=true`, { headers });
    return response.json();
  }

  async fetchChannels(id: string) {
    const response = await fetch(`${Constants.API}/${ENDPOINTS.GUILDS}/${id}/${ENDPOINTS.CHANNELS}`, { headers });
    return response.json();
  }

  async fetchChannel(id: string) {
    const response = await fetch(`${Constants.API}/${ENDPOINTS.CHANNELS}/${id}`, { headers });
    return response.json();
  }

  async fetchGuildMember(guildId: string, userId: string) {
    const response = await fetch(`${Constants.API}/${ENDPOINTS.GUILDS}/${guildId}/${ENDPOINTS.MEMBERS}/${userId}`, { headers });
    return response.json();
  }

  async fetchGuildMembers(guildId: string, count: number) {
    const response = await fetch(`${Constants.API}/${ENDPOINTS.GUILDS}/${guildId}/${ENDPOINTS.MEMBERS}?limit=${count}`, { headers });
    return response.json();
  }

  async fetchUser(userId: string) {
    const response = await fetch(`${Constants.API}/${ENDPOINTS.USERS}/${userId}`, { headers });
    return response.json();
  }

  async createMessage(options: MessageOptions, id: string) {
    const data = {
      "content": options.content,
      "tts": options.tts,
    };
    const response = await fetch(`${Constants.API}/${ENDPOINTS.CHANNELS}/${id}/${ENDPOINTS.MESSAGES}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });
    console.log(response);
    return response.json();
  }
  

  set token(token: string) {
    this._token = token;
    headers.Authorization = `Bot ${this._token}`;
  }

}