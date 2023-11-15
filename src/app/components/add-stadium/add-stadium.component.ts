import { ActivatedRoute } from '@angular/router';
import { StadiumService } from './../../services/stadium.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { getObjectFromLocalStorage } from 'src/app/shared/genericFunction';

@Component({
  selector: 'app-add-stadium',
  templateUrl: './add-stadium.component.html',
  styleUrls: ['./add-stadium.component.css']
})
export class AddStadiumComponent implements OnInit {
  stadiumForm: FormGroup;
  countries: any = [];
  stadiums: any = [];
  stadium:any={};
  id:any;
  formTitle:any="Add Stadium";
  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute:ActivatedRoute,
    private stadiumService: StadiumService) { }

  ngOnInit() {
    this.id=this.activatedRoute.snapshot.paramMap.get("x");
    this.stadiumForm = this.formBuilder.group(
      {
        name: ["", [Validators.required]],
        capacity: ["", [Validators.required]],
        country: [""]
      })
      if (this.id) {
        this.stadiumService.getStadiumById(this.id).subscribe(
          (data)=>{
            this.stadium=data.stadium;
          });
        this.formTitle = "Edit Stadium";
      }
      this.getAllStadiums();
    this.countries = getObjectFromLocalStorage("countries");
  }
  addStadium() {
    if (this.id) {
      this.stadiumForm.value.id=this.id;
      this.stadiumService.editStadium(this.stadiumForm.value).subscribe(
        (response) => { 
          console.log("here reponse is ", response);
          this.getAllStadiums();
        });
    } else {
      this.stadiumService.addStadium(this.stadiumForm.value).subscribe(
        (response) => { 
          console.log("here reponse is ", response)
          this.getAllStadiums();
        });
    }
    
  }
  getAllStadiums(){
    this.stadiumService.getAllStadiumes().subscribe(
      (data)=>{
        this.stadiums=data.stadiums;
      });
  }
}
