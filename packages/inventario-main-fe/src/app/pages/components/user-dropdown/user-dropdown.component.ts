import {Component} from '@angular/core';
import {UserControllerService} from '../../../domain/user/user-controller.service';

@Component({
  selector: 'app-user-dropdown',
  templateUrl: './user-dropdown.component.html',
  styleUrls: ['./user-dropdown.component.scss']
})
export class UserDropdownComponent {
  dropdownOpen = false;

  constructor(private userControllerService: UserControllerService) {
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  closeDropdown() {
    this.dropdownOpen = false;
  }

  logout() {
    this.userControllerService.logout();
  }
}
