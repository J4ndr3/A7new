import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  messageForm: FormGroup;
  submitted = false;
  success = false;
  users: object;
  constructor(private formBuilder: FormBuilder, private data: DataService) { }

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
      this.users =data
      console.log(this.users)
    });
    this.success = true;
}

}
