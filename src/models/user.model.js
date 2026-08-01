import { users } from "../assests/users.js";

export default class usermodel {
  constructor(__id, __name, __email, __password) {
    this.id = __id;
    this.name = __name;
    this.email = __email;
    this.password = __password;
  }

  //   Register Logic
  static add(name, email, password) {
    const newUser = new usermodel(users.length + 1, name, email, password);
    users.push(newUser);
  }

  //   login logic
  static login(email, password) {
    const userLogin = users.filter(
      (user) =>
        user.email.trim().toLowerCase().includes(email.trim().toLowerCase()) &&
        user.password
          .trim()
          .toLowerCase()
          .includes(password.trim().toLowerCase()),
    );
    return userLogin;
  }

  static getbyEmail(email) {
    return users.find((user) => user.email == email);
  }
}
