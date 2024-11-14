export interface SimpleLoginResponseInterface {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
}

export interface SimpleLoginBodyInterface {
  username: string;
  password: string;
  encrypted: boolean;
}

export interface LoginResponseInterface {
  token: string;
}


