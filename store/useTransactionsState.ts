import { create } from "zustand";
import { Transaction } from "@/models/Transaction";

type State = {
  selectedTransaction?: Transaction | null;
  setSelectedTransaction: (transaction: Transaction) => void;
};

export const useTransactionsState = create<State>((set, get) => ({
  selectedTransaction: null,
  setSelectedTransaction: (transaction) =>
    set({ selectedTransaction: transaction }),
}));
