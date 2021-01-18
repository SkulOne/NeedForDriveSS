export interface InputCheckedElement {
  id: string;
  value: unknown;
  labelValue: string;
}
export interface TextInput {
  label?: string;
  controlName: string;
  matLabel: string;
}

export interface SelectControlEntity {
  matLabel: string;
  controlName: string;
  dataName: string;
}
