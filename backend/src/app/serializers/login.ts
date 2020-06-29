interface LoginSerializer {
  token: string;
}

export const create = (token: string): LoginSerializer => {
  return {
    token: token
  }
}
