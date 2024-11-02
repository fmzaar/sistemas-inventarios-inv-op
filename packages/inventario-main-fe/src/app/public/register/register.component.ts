import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserControllerService} from '../../domain/user/user-controller.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  hidePassword = true;


  constructor(private fb: FormBuilder, private readonly userControllerService: UserControllerService) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.userControllerService.registerUser({
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
