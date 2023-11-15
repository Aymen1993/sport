import { ValidationService } from './../../services/validation.service';
import { UserService } from './../../services/user.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {
  connexionForm: FormGroup
  notFound: any = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private validationService: ValidationService) { }

  ngOnInit() {
    this.connexionForm = this.formBuilder.group(
      {
        tel: ["", [Validators.required]],
        pwd: ["", [Validators.required]]
      })
  }
  login() {
    console.log("here login",this.connexionForm.value);
    
    this.validationService.connexion(this.connexionForm.value).subscribe(
      (response) => {
        if (response.message == "1") {
          console.log("here is reponse",response.user);
          
          // localStorage.setItem("connectedUser",JSON.stringify(response.user));
            this.router.navigate(['listUsers']);
          
        } else {
          this.notFound = true;
        }
      });
  }

}
