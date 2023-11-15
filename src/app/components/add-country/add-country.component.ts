import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { addObject, generateId, getObjectFromLocalStorage } from 'src/app/shared/genericFunction';

@Component({
  selector: 'app-add-country',
  templateUrl: './add-country.component.html',
  styleUrls: ['./add-country.component.css']
})
export class AddCountryComponent implements OnInit {
  countryForm:FormGroup;
  country:any ={};
  constructor(private router:Router) { }

  ngOnInit() {
  }
  addCountry(){
    let countries = getObjectFromLocalStorage("countries");
    addObject(this.country,"countries",countries);
    this.router.navigate(["admin"]);
  }

}
