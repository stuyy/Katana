import Client from "../Client.ts";
import { headers } from "../../constants/Payloads.ts";
import { Constants, ENDPOINTS, StatusCode } from "../../constants/Constants.ts";
import { MessageOptions } from "../../typedefs/MessageOptions.ts";

export default class RestAPIHandler {
  private _token: string = "";

  constructor(private client: Client) {
    Object.defineProperty(this, "_token", {
      enumerable: false,
    });
  }

  async fetchGuilds() {
    const response = await fetch(
      `${Constants.API}/${ENDPOINTS.USER_GUILDS}`,
      { headers },
    );
    return response.json();
  }

  async fetchGuild(id: string) {
    const response = await fetch(
      `${Constants.API}/${ENDPOINTS.GUILDS}/${id}?with_counts=true`,
      { headers },
    );
    return response.json();
  }

  async fetchChannels(id: string) {
    const response = await fetch(
      `${Constants.API}/${ENDPOINTS.GUILDS}/${id}/${ENDPOINTS.CHANNELS}`,
      { headers },
    );
    return response.json();
  }

  async fetchChannel(id: string) {
    const response = await fetch(
      `${Constants.API}/${ENDPOINTS.CHANNELS}/${id}`,
      { headers },
    );
    return response.json();
  }

  async fetchGuildMember(guildId: string, userId: string) {
    const response = await fetch(
      `${Constants.API}/${ENDPOINTS.GUILDS}/${guildId}/${ENDPOINTS.MEMBERS}/${userId}`,
      { headers },
    );
    return response.json();
  }

  async fetchGuildMembers(guildId: string, count: number) {
    const response = await fetch(
      `${Constants.API}/${ENDPOINTS.GUILDS}/${guildId}/${ENDPOINTS.MEMBERS}?limit=${count}`,
      { headers },
    );
    return response.json();
  }

  async fetchUser(userId: string) {
    const response = await fetch(
      `${Constants.API}/${ENDPOINTS.USERS}/${userId}`,
      { headers },
    );
    return response.json();
  }

  async fetchMessage(channelId: string, messageId: string): Promise<any> {
    const response = await fetch(`${Constants.API}/${ENDPOINTS.CHANNELS}/${channelId}/${ENDPOINTS.MESSAGES}/${messageId}`, { method: 'GET', headers });
    return response.json();
  }

  async pinMessage(channelId: string, messageId: string): Promise<any> {
    return fetch(`${Constants.API}/${ENDPOINTS.CHANNELS}/${channelId}/${ENDPOINTS.PINS}/${messageId}`, { method: 'PUT', headers });
  }

  async unpinMessage(channelId: string, messageId: string): Promise<any> {
    return fetch(`${Constants.API}/${ENDPOINTS.CHANNELS}/${channelId}/${ENDPOINTS.PINS}/${messageId}`, { method: 'DELETE', headers });
  }

  async createMessage(options: MessageOptions, id: string) {
    const response = await fetch(
      `${Constants.API}/${ENDPOINTS.CHANNELS}/${id}/${ENDPOINTS.MESSAGES}`,
      {
        method: "POST",
        headers,
        body: JSON.stringify(options),
      },
    );
    return response.json();
  }

  async deleteMessage(channelId: string, messageId: string) {
    return fetch(
      `${Constants.API}/${ENDPOINTS.CHANNELS}/${channelId}/${ENDPOINTS.MESSAGES}/${messageId}`,
      {
        method: 'DELETE',
        headers
      }
    );
  }

  async editMessage(options: MessageOptions, channelId: string, messageId: string) {
    return fetch(
      `${Constants.API}/${ENDPOINTS.CHANNELS}/${channelId}/${ENDPOINTS.MESSAGES}/${messageId}`,
      {
        method: 'PATCH',
        headers,
        body: JSON.stringify(options),
      }
    )
  }

  async createReaction(channelId: string, messageId: string, emoji: any): Promise<Response> {
    const response = await fetch (
      `${Constants.API}/${ENDPOINTS.CHANNELS}/${channelId}/${ENDPOINTS.MESSAGES}/${messageId}/${ENDPOINTS.REACTIONS}/${emoji}/@me`,
      {
        method: 'PUT',
        headers,
      }
    );
    if (response.status === StatusCode.NO_CONTENT) return response;
    throw new Error(await response.text());
  }

  set token(token: string) {
    this._token = token;
    headers.Authorization = `Bot ${this._token}`;
  }
}
