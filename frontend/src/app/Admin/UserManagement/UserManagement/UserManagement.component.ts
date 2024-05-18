import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { User } from '../../../Models/User';
import { UserService } from '../../../Services/User.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { DeleteUserComponent } from '../DeleteUser/DeleteUser/DeleteUser.component';
import { AlertifyService } from '../../../Services/alertify.service';
@Component({
  selector: 'app-UserManagement',
  standalone:true,
  imports:[CommonModule,MatTableModule, MatDialogModule,MatFormFieldModule,
    MatSelectModule,FormsModule,MatInputModule],
  templateUrl: './UserManagement.component.html',
  styleUrls: ['./UserManagement.component.css']
})
export class UserManagementComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  displayedColumns: string[] = ['name', 'email', 'gender', 'phoneNumber', 'role', 'status', 'actions'];
  roleOptions: string[] = ['All', 'admin', 'user'];
  statusOptions: string[] = ['All', 'true', 'false'];
  constructor(private userService: UserService, private dialog: MatDialog,private alertify:AlertifyService) {}
  ngOnInit(): void {
    this.loadUsers();
  }
  loadUsers(): void {
    this.userService.getAllUsers().subscribe(
      (users) => {
        this.users = users;
        this.applyFilter('');
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }
  
  applyFilter(value: string): void {
    value = value.trim().toLowerCase();
    if (value) {
      this.filteredUsers = this.users.filter((user) =>
        user.name.toLowerCase().includes(value) || user.email.toLowerCase().includes(value)
      );
    } else {
      this.filteredUsers = this.users;
    }
  }

  applyRoleFilter(role: string): void {
    if (role === 'All') {
      this.filteredUsers = this.users;
    } else {
      this.filteredUsers = this.users.filter((user) => user.role === role);
    }
  }

  applyStatusFilter(status: string): void {
    if (status === 'All') {
      this.filteredUsers = this.users;
    } else {
      const filterStatusString = status.toLowerCase(); // Ensure case-insensitive comparison
      this.filteredUsers = this.users.filter((user) => {
        const userStatusString = user.status.toString().toLowerCase(); // Convert user status to string
        return userStatusString === filterStatusString;
      });
    }
  }

  changeStatus(user: User): void 
  {
    const dialogRef = this.dialog.open(DeleteUserComponent, {
      width: '400px',
      data: { message: `Are you sure you want to change the status of "${user.name}"?` }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Toggle status string ("true" <-> "false")
        const newStatus = user.status === 'true' ? 'false' : 'true';

        // Update status via HTTP request to backend
        this.userService.updateUserStatus(user.id, newStatus).subscribe(
          () => {
            user.status = newStatus; // Update local status upon successful API response
            this.alertify.success(`Status of "${user.name}" changed successfully.`);
          },
          (error) => {
            console.error('Error changing user status:', error);
            // Handle error if necessary
          }
        );
      }
    });
  }


  changeRole(user: User): void 
  {
    const dialogRef = this.dialog.open(DeleteUserComponent, {
      width: '400px',
      data: { message: `Are you sure you want to change the Role of "${user.name}"?` }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Toggle status string ("true" <-> "false")
        const newRole = user.role === 'user' ? 'admin' : 'user';

        // Update status via HTTP request to backend
        this.userService.updateUserRole(user.id, newRole).subscribe(
          () => {
            user.role = newRole; // Update local status upon successful API response
            this.alertify.success(`Role of "${user.name}" changed successfully.`);
          },
          (error) => {
            console.error('Error changing user status:', error);
            // Handle error if necessary
          }
        );
      }
    });
    
  }

  openDeleteDialog(user: User): void {
    const dialogRef = this.dialog.open(DeleteUserComponent, {
      width: '400px',
      data: { message: `Are you sure you want to delete user "${user.name}"?` }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        // User confirmed deletion (result is true)
        this.deleteUser(user);
      }
    });
  }

  deleteUser(user: User): void {
    this.userService.deleteUser(user.id).subscribe(
      () => {
        console.log(`User "${user.name}" deleted successfully.`);
        this.alertify.success('Deleted successfully');
        // Remove deleted user from users array
        this.users = this.users.filter(u => u.id !== user.id);
        // Update filteredUsers with current filtering criteria
        this.applyFilter(''); // Reapply filter to reflect changes
      },
      (error) => {
        console.error('Error deleting user:', error);
      }
    );
  }
}
