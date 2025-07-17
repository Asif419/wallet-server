export interface IRegisterInput {
  email: string;
  password: string;
  role: 'user' | 'admin';
}

export interface ILoginInput {
  email: string;
  password: string;
}

interface IUserWithWallet {
  id: number;
  email: string;
  role: string;
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