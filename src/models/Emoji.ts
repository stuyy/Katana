import Role from "./Role.ts";

export default class Emoji {
  constructor(
    private _id: string,
    private _name: string,
    private _roles: Map<string, Role>,
    private _users: Map<string, any>,
    private _required_colons: boolean,
    private _managed: boolean,
    private _animated: boolean,
    private _available: boolean,
  ) {
  }
}
