import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { User } from '../../../Models/User';
import { UserService } from '../../../Services/User.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-UserManagement',
  standalone:true,
  imports:[CommonModule,MatTableModule, MatDialogModule],
  templateUrl: './UserManagement.component.html',
  styleUrls: ['./UserManagement.component.css']
})
export class UserManagementComponent implements OnInit {
  users: User[] = [];
  displayedColumns: string[] = ['name', 'email', 'gender', 'phoneNumber', 'role', 'status', 'actions'];

  constructor(private userService: UserService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void 
  {
    this.userService.getAllUsers().subscribe(
      (users) => {
        this.users = users;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  editUser(user: User): void 
  {
    console.log('Edit user:', user);
  }

  changeStatus(user: User): void 
  {
    console.log('Change status of user:', user);
  }

  changeRole(user: User): void 
  {
    console.log('Change role of user:', user);
  }

  deleteUser(user: User): void 
  {
    console.log('Delete user:', user);
  }
}
