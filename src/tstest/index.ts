type User = {
  id: number | string;
  name: string;
  email: string;
}

type UserWithoutEmail1 = Omit<User, 'email'>;

type key = keyof User;

type UserWithoutEmail2 = Pick<User, Exclude<key, 'email'>>;

type UserWithoutEmail3 = {
  [P in Exclude<key, 'email'>]: User[P]
};

type UserWithoutEmail = Partial<User>;

type TestType = UserWithoutEmail & { qq?: string };

class Test {

  a: UserWithoutEmail1;

  runTest(): void {
    this.a.
  }
}