import { ValidationService } from './../../services/validation.service';
import { UserService } from './../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
  inscriptionForm: FormGroup;
  path: string;
  emailExist: boolean = false;
  formTitle: string = "inscription";
  id: any;
  imagePreview:any;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private validationService: ValidationService) { }

  ngOnInit() {
    this.inscriptionForm = this.formBuilder.group({
      tel: ["", [Validators.required,Validators.pattern(/^\d{8}$/)]],
      pwd: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(14)]],
      nom: ["", [Validators.required, Validators.minLength(3)]],
      prenom: ["", [Validators.required, Validators.minLength(5)]],

    },
    );
  }
  inscription() {
    console.log("here is inscription form",this.inscriptionForm.value);
    
      this.validationService.inscription(this.inscriptionForm.value).subscribe(
        (response) => {
          console.log("here is response",response);
          
            // this.router.navigate(["connexion"]);
          })

}
}
