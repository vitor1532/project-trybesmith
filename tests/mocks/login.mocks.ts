export const validLoginFields = {
  username: 'Hagar',
  password: '$3cr3t',
}

export const invalidLoginFieldsUsername = {
  password: '$3cr3t',
};

export const invalidLoginFieldsPassword = {
  username: 'Hagar',
};

export const invalidPassword = {
  username: 'Hagar',
  password: '123',
}

export const invalidUsername = {
  username: 'Loki',
  password: '123',
}

export const failedLoginResponse = {
  message: 'Username or password invalid',
};