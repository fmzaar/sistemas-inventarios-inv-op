export interface UserInterface {
  email: string;
  password: string;
}

export interface UserResInterface {
  access_token: string;
}

export interface RegistrationInterface {
  email: string;
  password: string;
}

export interface JwtTokenInterface {
  username: string;
  exp: number;
}
