import { Injectable } from '@angular/core';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private users: User[] = [];

  constructor() {
    this.users.push({
      id: 1,
      username: "Admin",
      password: "123"
    });

    this.users.push({
      id: 1,
      username: "Feak",
      password: "123"
    });

    this.users.push({
      id: 1,
      username: "Pepito",
      password: "123"
    });
  }

  login(username: string, password: string): boolean {
    const user = this.users.find(u => u.username === username && u.password === password);
    return user !== undefined;
  }
}
