export class User {
  constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
    public username: string,
    public password: string,
    public confirmedPassword: string,
    public active: boolean,
  ) {}
}
