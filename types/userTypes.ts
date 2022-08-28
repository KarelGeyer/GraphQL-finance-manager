export interface BaseUser {
  name: string;
  surname: string;
  password: string;
  email: string;
  phoneNumber: number;

  save(): Promise<CompleteUser>;
}

export interface CompleteUser extends BaseUser {
  currency: string;
  accountID: string;
  teamID: string;
  refreshToken: string;
}

export interface UpdateUser extends CompleteUser {
  newEmail: string;
  newPassword: string;
}

export interface Credentials {
  email: string;
  password: string;
}

export interface AccessToken {
  accessToken: string;
}
