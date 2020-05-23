export class MessageEmbedField {

  private name: string;
  private value: string;
  private inline?: boolean;

  constructor(
    name: string,
    value: string,
    inline?: boolean
  ) {
    this.name = name;
    this.value = value;
    this.inline = inline;
  }

  getName(): string { return this.name; }
  getValue(): string { return this.value; }
  getInline(): boolean | undefined { return this.inline; }

  setName(name: string) { this.name = name; }
  setValue(value: string) { this.value = value; }
  setInline(inline: boolean) { this.inline = inline; }
}