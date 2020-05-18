import { Constants, ENDPOINTS } from '../constants/Constants.ts';
import { headers } from '../constants/Payloads.ts';

export default class RestAPIHandler {
  
  static async fetchGuilds(token: string) {
    headers.Authorization = `Bot ${token}`;
    const response = await fetch(`${Constants.API}/${ENDPOINTS.USER_GUILDS}`, {
      headers,
    });
    return response.json();
  }

  static async fetchGuild(token: string, id: string) {
    headers.Authorization = `Bot ${token}`;
    const response = await fetch(`${Constants.API}/${ENDPOINTS.GUILDS}/${id}`, { headers });
    return response.json();
  }
}