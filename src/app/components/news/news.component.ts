import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  newsTab: any =[
    {title:"Romolu to stay at Real Nadrid?",imgPlayer:"assets/images/img_1.jpg",avatar:"assets/images/person_1.jpg",author:"Mellissa Allison",date:"May 19, 2020; Sports"},
    {title:"Kai Nets Double To Secure Comfortable Away Win",imgPlayer:"assets/images/img_2.jpg",avatar:"assets/images/person_2.jpg",author:"oussema ",date:"May 19, 2020; Sports"},
    {title:"Dogba set for Juvendu return?",imgPlayer:"assets/images/img_3.jpg",avatar:"assets/images/person_3.jpg",author:"ali ",date:"May 19, 2020; Sports"}
    ];
  constructor() { }

  ngOnInit() {
  }

}
