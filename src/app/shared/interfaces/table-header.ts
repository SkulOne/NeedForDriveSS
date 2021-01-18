export interface TableHeader {
  type: InputType;
  text: string;
  property?: string[];
  matColumnDef?: string;
}

export enum InputType {
  Text = 'text',
  Number = 'number',
  Boolean = 'boolean',
  Object = 'object',
  Date = 'date',
}
