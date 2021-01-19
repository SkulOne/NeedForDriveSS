import { TableHeader } from '@shared/interfaces/table-header';
import { SelectControlEntity, TextInput } from '@shared/interfaces/input';

export interface EntityInputs {
  [key: string]: {
    tableHeaders: TableHeader[];
    inputs: EntityInput[];
  };
}

export type EntityInput = TextInput | SelectControlEntity;
