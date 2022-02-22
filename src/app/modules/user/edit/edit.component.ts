import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { NotificationService } from 'src/app/utility/notification.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  status_arr = [{
    label: "Pending",
    value: "pending"
  },{
    label: "Reject",
    value: "reject"
  },{
    label: "Resolved",
    value: "resolved"
  }];
  edit_complaint_form?:FormGroup;
  max_length = 500;
  complaint_length = 0;
  is_submit = false;

  constructor(private formBuilder: FormBuilder,private location:Location,
    private notificationService:NotificationService) { 
    this.edit_complaint_form = this.formBuilder.group({
      complaint: [{value:'',disabled:true}],
      status:[''],
      notes:['']
    });
  }

  ngOnInit(): void {
    this.edit_complaint_form?.setValue({
      complaint:"Question",
      status:"pending",
      notes:''
    });
  }
  get complaint(){
    return this.edit_complaint_form?.get('complaint');
  }
  get status(){
    return this.edit_complaint_form?.get('status');
  }
  get notes(){
    return this.edit_complaint_form?.get('notes');
  }
  onEditComplaint(){
    this.is_submit = true;
    console.log(this.edit_complaint_form?.value);
    if(this.edit_complaint_form?.valid){
      this.notificationService.showNotification('Complaint updated successfully','success');
      this.location.back();
    }
  }
}
