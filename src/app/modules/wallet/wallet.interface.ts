export interface IWallet {
  id: number;
  balance: number;
  userId: number;
}

export interface ITopUpInput {
  amount: number;
}

export interface IWalletResponse {
  id: number;
  balance: number;
}