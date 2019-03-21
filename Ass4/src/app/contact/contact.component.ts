import { Component, OnInit, Directive } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  messageForm: FormGroup;
  submitted = false;
  success = false;
  eachProduct:object;
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
    });
    this.success = true;
}

}