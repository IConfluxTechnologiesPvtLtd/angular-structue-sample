import { Component, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { HttpClient,HttpParams,HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Modal } from 'bootstrap';
import { NotificationService } from './utility/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  is_loading = false;
  
  show_toaster = false;
  toaster_type = 'success';
  toaster_message = '';
  
  is_submit = false;

  login_dialog_type = "login";
  change_dialog_type_text = "Forgot Password?";
  login_dialog_footer_button_text = "Login";
  login_form?:FormGroup;
  forget_password_form?:FormGroup;
  step = 1;
  // profile_form?:FormGroup;
  change_password_form?:FormGroup;

  otp_form?:FormGroup;
  formInput_login = ['input1', 'input2', 'input3', 'input4'];
  @ViewChildren('formRow') rows: any;
  otp_verify_error = '';
  otp_value='';

  password_form?:FormGroup;
  hide : boolean = true;
  confirmhide: boolean = true;

  is_first_enabled = false;
  is_last_enabled = false;
  is_prev_enabled = false;
  is_next_enabled = false;

  selected_complaint_data:any = null;
  
  user_data:any = null;
  constructor(private notificationService:NotificationService,
    private formBuilder: FormBuilder){      
      // this.user_data = {
      //   name: "Ronak",
      //   email: "ronak@iconflux.com"
      // };
      this.notificationService.notificationval.subscribe((data)=>{
        this.show_toaster = data.showNotification;
        this.toaster_type = data.type;
        this.toaster_message = data.message;
      });
    this.login_form = this.formBuilder.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required]],
    });
    this.forget_password_form = this.formBuilder.group({
      forget_password_email:['',[Validators.required,Validators.email]]
    });
    this.otp_form = this.toFormGroup(this.formInput_login);
    this.password_form = this.formBuilder.group({
      forget_password: ["", { validators: [Validators.required, Validators.minLength(4)] }],
      confirm_password: ['', { validators: [Validators.required] }],
    },{ validator: this.ConfirmPasswordValidator('forget_password', 'confirm_password') });

    this.change_password_form = this.formBuilder.group({
      old_password: ["", { validators: [Validators.required] }],
      new_password: ["", { validators: [Validators.required, Validators.minLength(4)] }],
      confirm_change_password: ['', { validators: [Validators.required] }],
    },{ validator: this.ConfirmPasswordValidator('new_password', 'confirm_change_password') });
    
  }
  ngOnInit(): void {
    // this.current_page = 2;
    this.getPageData();  
  }
  getPageData(){
    
  }
  toFormGroup(elements:any) {
    const group: any = {};
    elements.forEach((key:any) => {
      group[key] = new FormControl('', Validators.required);
    });
    return new FormGroup(group);
  }
  keyUpEvent(event:any, index:any) {
    let pos = index;
    if (event.keyCode === 8 && event.which === 8) {
     pos = index - 1 ;
    } else {
     pos = index + 1 ;
    }
    if (pos > -1 && pos < this.formInput_login.length ) {
      this.rows._results[pos].nativeElement.focus();
    }
  }

  ConfirmPasswordValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.confirmPasswordValidator) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmPasswordValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
  get email(){
    return this.login_form?.get('email');
  }
  get password(){
    return this.login_form?.get('password');
  }

  get forget_password_email(){
    return this.forget_password_form?.get('forget_password_email');
  }
  
  
  get forget_password() {
    return this.password_form?.get("forget_password");
  }
  get confirm_password() {
    return this.password_form?.get("confirm_password");
  }

  get old_password() {
    return this.change_password_form?.get("old_password");
  }
  get new_password() {
    return this.change_password_form?.get("new_password");
  }
  get confirm_change_password() {
    return this.change_password_form?.get("confirm_change_password");
  }   

  openLoginModal(){
    this.step = 1;
    this.login_dialog_type = "login";
    this.change_dialog_type_text = "Forgot Password?";
    this.login_dialog_footer_button_text = 'Login';
    this.login_form?.reset();
    this.is_submit = false;
    const element = document.getElementById('loginModal') as HTMLElement;
    const myModal = new Modal(element);
    myModal.show();
  }
  logoutPress(){

  }
  profilePress(){

  }
  changePasswordPress(){
    
    this.change_password_form?.reset();
    this.is_submit = false;
    const element = document.getElementById('changePasswordModal') as HTMLElement;
    const myModal = new Modal(element);
    myModal.show();
  }
  showToaster(message:string,type:string){
    // type : success/danger
    this.toaster_type = type;
    this.toaster_message = message;
    this.show_toaster = true;
    setTimeout(() => {
      this.hideToaster();    
    }, 3000);
  }
  hideToaster(){
    this.show_toaster = false;
  }
  showLoader(){
    this.is_loading = true;
  }
  hideLoader(){
    this.is_loading = false;
  }
  
changeLoginFormPress(){
  if(this.login_dialog_type == 'login'){
    this.is_submit = false;
    this.forget_password_form?.reset();
    this.login_dialog_type = "forget password";
    this.change_dialog_type_text = "Back to Login";
    this.login_dialog_footer_button_text = 'Send OTP';
  }else{
    this.is_submit = false;
    this.login_form?.reset();
    this.login_dialog_type = "login";
    this.change_dialog_type_text = "Forgot Password?";
    this.login_dialog_footer_button_text = 'Login';
  }
}
loginFooterButtonPress(){
  if(this.login_dialog_type == 'login'){
    this.loginPress();
  }else{
    this.saveForgetPasswordDialogPress();    
  }
}
loginPress(){
  this.is_submit = true;
  if(this.login_form?.valid){
    console.log(this.login_form?.value);
    // this.notificationService.showNotification('Login successfully','success');
  }
}
resendOTP(){
  
  
}
saveForgetPasswordDialogPress(){
  this.is_submit = true;
  if(this.step == 1){
    this.saveUserForm();    
  }else if(this.step == 2){
    this.saveOTPForm();
  }else if(this.step == 3){
    this.savePasswordForm();
  }
}
saveUserForm(){
  if(this.forget_password_form?.valid){
    this.is_submit = false;
    this.otp_value='';
    this.step = 2;
    this.login_dialog_footer_button_text = "Verify OTP";
  }
}
saveOTPForm(){

  if(this.otp_form?.valid){
    let otp_value = '';
    let otp_form_value = this.otp_form.value;
    
    for (const key in otp_form_value) {
      const element = otp_form_value[key];
      otp_value+=element;
    }
    this.otp_value=otp_value;
    this.is_submit = false;
    this.step = 3;
    this.login_dialog_footer_button_text = "Submit";
  }
}
savePasswordForm(){
  if(this.password_form?.valid){
    console.log(this.password_form?.value);
    console.log(this.forget_password_form?.value);
    console.log(this.otp_value);
  }
}

changePasswordButtonPress(){
  this.is_submit = true;
  if(this.change_password_form?.valid){
    console.log(this.change_password_form?.value);
    
  }
}
}
