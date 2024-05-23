export interface Database {
    User: {
      id: string;
      username: string;
      email: string;
    };
    Wallet: {
      id: string;
      userId: string;
      balance: number;
      currency: string | null;
    };
  }