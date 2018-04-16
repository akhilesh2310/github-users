import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  user: any = {};
  repos: any = [];
  followers: any = [];
  constructor(private route: ActivatedRoute, private http: HttpClient) {
  }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getUser(id);
      this.getRepos(id).subscribe(data => {
        this.repos = data;
      });
      this.getFollowers(id).subscribe(data => {
        this.followers = data;
      });
    }

  }

  getUser(username: string) {
    let users = localStorage.getItem('users');
    if (users) {
      let storedUsers = JSON.parse(users);
      this.user = storedUsers.find(function (obj) { return obj.login === username; });
    }
  }

  getRepos(username: string) {
    let url = `https://api.github.com/users/${username}/repos`;
    return this.http.get(url);
  }

  getFollowers(username: string) {
    let url = `https://api.github.com/users/${username}/followers`;
    return this.http.get(url);
  }
}
