// ### Validators de connexion ### //
export interface ValidatorErrorsLogin {
  email: string | null;
  password: string | null;
}

// ### Validators d'inscription ### //
export interface ValidatorErrorsRegister {
  email: string | null;
  pseudo: string | null;
  password: string | null;
}
