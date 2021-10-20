export interface QueryInterface {
  user: string;
  date?: {
    $gte?: any,
    $lte?: any
  };
  order?: number;
}
