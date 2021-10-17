import { Schema, SchemaDefinitionProperty} from 'mongoose';

export interface OrderInterface {
  date: SchemaDefinitionProperty<Date>
  order: number;
  user: Schema.Types.ObjectId;
  list: ListOrderInterface[];
}

interface ListOrderInterface {
  name: string;
  quantity: number;
  cost: number;
}


