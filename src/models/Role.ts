export default class Role {
  constructor(
    private _id: string,
    private name: string,
    private color: number,
    private hoist: boolean,
    private position: number,
    private permissions: number,
    private managed: boolean,
    private mentionable: boolean,
  ) {
  }

  public get id() {
    return this._id;
  }
}
