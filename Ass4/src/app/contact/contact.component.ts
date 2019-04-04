import { Component, OnInit, Directive } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  loginForm: FormGroup;
  messageForm: FormGroup;
  submitted = false;
  success = false;
  adsucc = false;
  eachProduct:object;
  users1: object;
  us:object;
  manager: boolean;
  GUID: string;
  isManger: boolean = false;
  manerr:boolean = false;
  constructor(private formBuilder: FormBuilder, private data: DataService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      name: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  OnInit1() {
    this.messageForm = this.formBuilder.group({
      name: ['', Validators.required],
      message: ['', Validators.required]
    });
  }
  onSubmit() {
    
    this.submitted = true;
    if (this.loginForm.invalid) {
      this.success = false;
        return;
    }
    var id = this.loginForm.get('name').value;
    var des = this.loginForm.get('message').value;
    this.data.sendUser(id,des).subscribe(data => {
     this.us = data;
     console.log(this.us);
     this.manager = data[0].Manager;
     console.log(this.manager);
     this.GUID = data[0].GUID;
     console.log(this.GUID);
     if (this.manager == true && this.GUID.length >0)
    {
      this.OnInit1();
      this.success = true;
      this.data.getUser().subscribe(data => {
        this.users1 =data
        console.log(this.users1)
      })
      console.log(this.manager);
      this.isManger = false;
    }
    else
    {
      this.isManger = true;
      this.success = false;
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
this.loginForm.reset();
this.adsucc = false;
console.log("logout success");
}

  onSubmit1() {
    this.submitted = true;
    if (this.messageForm.invalid) {
      this.success = false;
        return;
    }
    var id = this.messageForm.get('name').value;
    var des = this.messageForm.get('message').value;
  //     this.eachProduct = 
  //   [
  //   {
      
  //       "P_CODE": id,
  //       "P_DESCRIPT": des
  //   }
  // ];
  //  console.log(this.eachProduct);
   this.data.sendDetails(id,des).subscribe(data => {
      //this.eachProduct =data
      console.log(this.data)
      console.log("data sent");
      this.data.getUser().subscribe(res => {
        this.users1 =res
        console.log(this.users1)
        console.log("request to get sent");
      });
    })
    this.success = false;
    this.messageForm.reset();
    
    this.adsucc = true;
    this.success = true;
}

}