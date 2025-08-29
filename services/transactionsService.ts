import useAxios from "@/hooks/useAxios";
import { IDSMEnvelop } from "@/models/DSMEnvelop";
import { CreateTransactionRequest } from "@/models/requests/CreateTransactionRequest";
import { UpdateTransactionRequest } from "@/models/requests/UpdateTransactionRequest";
import { Transaction } from "@/models/Transaction";

const transactionsService = () => {
  const axiosInstance = useAxios();

  const getTransactions = async (deviceId: string): Promise<Transaction[]> => {
    const response = await axiosInstance.get<IDSMEnvelop<Transaction[]>>(
      "/Transactions",
      {
        params: {
          deviceId,
        },
      }
    );
    return response.data.payload ?? [];
  };

  const createTransaction = async (
    body: CreateTransactionRequest
  ): Promise<Transaction> => {
    const response = await axiosInstance.post<Transaction>(
      "/Transactions",
      body
    );

    return response.data;
  };

  const updateTransaction = async (
    body: UpdateTransactionRequest
  ): Promise<Transaction> => {
    const response = await axiosInstance.put<Transaction>(
      `/Transactions/${body.id}`,
      body
    );

    return response.data;
  };

  const deleteTransaction = async (id: string): Promise<void> => {
    return axiosInstance.delete(`/Transactions/${id}`);
  };

  return {
    getTransactions,
    createTransaction,
    deleteTransaction,
    updateTransaction,
  };
};

export default transactionsService;
