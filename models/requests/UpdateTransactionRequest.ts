import { CreateTransactionRequest } from "./CreateTransactionRequest";

export type UpdateTransactionRequest = CreateTransactionRequest & {
  id?: string;
};
