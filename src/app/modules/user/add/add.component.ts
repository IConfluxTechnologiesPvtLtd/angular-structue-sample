import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { NotificationService } from 'src/app/utility/notification.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  form_type = 'add';
  add_complaint_form?:FormGroup;
  edit_complaint_form?:FormGroup;
  max_length = 500;
  complaint_length = 0;
  is_submit = false;
  constructor(private formBuilder: FormBuilder,private location:Location,
    private notificationService:NotificationService) { 
    this.add_complaint_form = this.formBuilder.group({
      add_complaint: [{value:'',disabled:false}, [Validators.required,Validators.maxLength(this.max_length)]]
    });
  }

  ngOnInit(): void {
  }
  get add_complaint(){
    return this.add_complaint_form?.get('add_complaint');
  }
  valueChange(val: any) {
    this.complaint_length = val;
    if (this.complaint_length <= this.max_length) {
      return true;
    } else {
      return false;
    }
  }
  onAddComplaint(){
    this.is_submit = true;
    console.log(this.add_complaint_form?.value);
    
    if(this.add_complaint_form?.valid){
      this.notificationService.showNotification('Complaint added successfully','success');
      this.location.back();
    }
  }
}
