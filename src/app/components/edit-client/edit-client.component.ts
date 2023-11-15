import { ValidationService } from './../../services/validation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  editForm: FormGroup;
  id: any;
  client: any;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private validationService: ValidationService) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    this.editForm = this.formBuilder.group(
      {
        tel: ["", [Validators.required,Validators.pattern(/^\d{8}$/)]],
        nom: ["", [Validators.required, Validators.minLength(3)]],
        prenom: ["", [Validators.required, Validators.minLength(5)]]
      })
    this.validationService.getUserById(this.id).subscribe(
      (data) => {
        console.log("here user", data.message);
        this.client = data.user;
        this.editForm.patchValue(this.client);
      })

  }
  edit() {
    this.editForm.value._id=this.id;
    console.log("here is edit form",this.editForm.value)
    this.validationService.editUser(this.editForm.value).subscribe(
        (response) => { 
          console.log("here reponse is ", response);
          this.router.navigate(["listUsers"]);
        });
      
  }

}
