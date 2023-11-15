import { UserService } from './../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MustMatch } from 'src/app/validators/mustMatch';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  path: string;
  emailExist: boolean = false;
  formTitle: string = "Signup";
  id: any;
  imagePreview:any;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.path = this.router.url;
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    if (this.id) {
      this.userService.getUserById(this.id).subscribe((data) => {
        console.log('here is the user', data.user);
        this.signupForm.patchValue(data.user);
      })
      this.formTitle = "Edit User";
    }
    console.log("here form title",this.formTitle);
    
    this.signupForm = this.formBuilder.group({
      firstName: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      lastName: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(15)]],
      email: ["", [Validators.required, Validators.email]],
      pwd: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(20),
      Validators.pattern(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$:;#^'"²§/,=+/!%*?&])/)]],
      confirmPwd: [""],
      gender: ["0", [Validators.required]],
      img:[""]
    },
      {
        validator: [MustMatch('pwd', 'confirmPwd',this.formTitle)]
      }
    );
  }
  signup() {
    if (this.id) {
      this.signupForm.value._id=this.id;
      this.userService.editUser(this.signupForm.value).subscribe(
        (response) => {
          console.log("here is the response", response);
          this.router.navigate(["admin"]);
        });
    } else {
      let role = (this.path == "/signupAdmin") ? "admin" : "user";
      this.signupForm.value.role = role;
      this.userService.signup(this.signupForm.value,this.signupForm.value.img).subscribe(
        (response) => {
          if (response.emailExist) {
            this.emailExist = response.emailExist;
          } else {
            this.router.navigate(["connexion"]);
          }
        });
    }
  }
  onImageSelected(event: Event) {
    //recuperation et l'ajout de l'image au formulaire
    const file = (event.target as HTMLInputElement).files[0];
    this.signupForm.patchValue({ img: file });
    this.signupForm.updateValueAndValidity();
    //afficher l'image ds html
    const reader = new FileReader();
    reader.onload = () => {
    this.imagePreview = reader.result as string
    };
    reader.readAsDataURL(file);
    }
}
