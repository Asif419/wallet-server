export interface IRegisterInput {
  email: string;
  password: string;
}

export interface ILoginInput {
  email: string;
  password: string;
}

interface IUserWithWallet {
  id: number;
  email: string;
  wallet: {
    id: number;
    balance: number;
  };
}

export interface IAuthResponse {
  user: IUserWithWallet;
}

export interface IAuthMeta {
  accessToken: string;
}