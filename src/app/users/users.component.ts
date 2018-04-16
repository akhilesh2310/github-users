import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  username = '';
  constructor(private http: HttpClient) {

  }
  getData(username: string) {
    let url = `https://api.github.com/users/${username}`;
    return this.http.get(url);
  }
  ngOnInit() {
    this.users = this.getAllUsers();
    console.log(this.users);
  }

  getUser(username: string) {
    if (username) {
      this.getData(username).subscribe(data => {
        console.log(data);
        let storedUsers = this.getAllUsers();
        let user = storedUsers.find(function (obj) { return obj.login === username; });
        if (!user) {
          this.users.push(data);
          this.storeUser();
          alert('User added to list.');
        } else {
          alert('User already added.');
        }
      }, (error) => {
        console.log(error);
        alert('User not found.');
      });
    } else {
      alert('Username is required.');
    }
  }

  getAllUsers() {
    let users = localStorage.getItem('users');
    if (users) {
      return JSON.parse(users);
    }
    return [];
  }

  storeUser() {
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  viewDetails($event, user) {

  }
}
