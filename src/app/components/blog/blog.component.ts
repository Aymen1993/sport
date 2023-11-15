import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  articleTab:any =[
    {tilte:"Romolu to stay at Real Nadrid?",date:"May 20, 2020",description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus deserunt saepe temporadolorem.",image:"assets/images/img_1.jpg"},
    {tilte:"Kai Nets Double To Secure Comfortable Away Win",date:"May 20, 2020",description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus deserunt saepe temporadolorem.",image:"assets/images/img_1.jpg"},
    {tilte:"Dogba set for Juvendu return?",date:"May 20, 2020",description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus deserunt saepe temporadolorem.",image:"assets/images/img_2.jpg"},
    {tilte:"Romolu to stay at Real Nadrid?",date:"May 20, 2020",description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus deserunt saepe temporadolorem.",image:"assets/images/img_3.jpg"},
    {tilte:"Dogba set for Juvendu return?",date:"May 20, 2020",description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus deserunt saepe temporadolorem.",image:"assets/images/img_1.jpg"},
    {tilte:"Romolu to stay at Real Nadrid?",date:"May 20, 2020",description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus deserunt saepe temporadolorem.",image:"assets/images/img_2.jpg"}
  ];
  constructor() { }

  ngOnInit() {
  }

}
