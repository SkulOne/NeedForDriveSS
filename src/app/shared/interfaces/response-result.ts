export interface ResponseResult<T> {
  count: number;
  data: T;
  fields: Fields;
}

interface Fields {
  [key: string]: Field;
}

interface Field {
  name: string;
  type: string;
  required: boolean;
}
