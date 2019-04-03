import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  messageForm: FormGroup;
  submitted = false;
  success = false;
  users1: object;
  us:object;
  manager: boolean;
  GUID: string;
  isManger: boolean = false;
  manerr:boolean = false;
  constructor(private formBuilder: FormBuilder,private data: DataService) { }
  ngOnInit() {
    this.messageForm = this.formBuilder.group({
      name: ['', Validators.required],
      message: ['', Validators.required]
    });
  }
  onSubmit() {
    
    this.submitted = true;
    if (this.messageForm.invalid) {
      this.success = false;
        return;
    }
    var id = this.messageForm.get('name').value;
    var des = this.messageForm.get('message').value;
    this.data.sendUser(id,des).subscribe(data => {
     this.us = data;
     console.log(this.us);
     this.manager = data[0].Manager;
     console.log(this.manager);
     this.GUID = data[0].GUID;
     console.log(this.GUID);
     if (this.manager == false && this.GUID.length >0)
    {
      this.success = true;
      this.manerr = false;
      this.isManger = false;
      this.data.getUser().subscribe(data => {
        this.users1 =data
        console.log(this.users1)
      })
      console.log(this.manager);
    }
    else if(this.manager == true && this.GUID.length >0)
    {
      this.manerr = true;
      this.isManger = false;
      this.success = false;
    }
    else
    {
      this.isManger = true;
      this.success = false;
      this.manerr = false;
    }
    });
    
}

onLogOut()
{
  this.success = false;
  this.us= null;
this.GUID = null;
this.manager = null;
this.messageForm.reset();
console.log("logout success");
}
  
}
