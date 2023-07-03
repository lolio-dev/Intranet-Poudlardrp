export interface Argument {
  name: string;
  type: ArgumentType;
  placeholder: string;
  validator: RegExp;
  next?: Argument[];
}

export enum ArgumentType {
  player = 'player',
  string = 'string',
  number = 'number',
  boolean = 'boolean',
}
