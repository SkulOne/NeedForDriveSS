export interface TableHeader {
  type: InputType;
  text: string;
  property?: string[];
  matColumnDef?: string;
}

export enum InputType {
  Text = 'text',
  Boolean = 'boolean',
  Object = 'object',
  Date = 'date',
}
