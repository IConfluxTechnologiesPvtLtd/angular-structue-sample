import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  is_loading = false;
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

  sort_by='created_at';
  sort_value='desc';
  
  current_page = 1;
  jump_to_number = 1;
  number_of_pages = 0;
  number_of_pages_arr:any[] = [];
  per_page_item=10;
  total_records = 0;
  
  
  page_list:any[] = [];
  

  is_first_enabled = false;
  is_last_enabled = false;
  is_prev_enabled = false;
  is_next_enabled = false;

  
  constructor() { 
    
  }

  ngOnInit(): void {
    this.getPageData();  
  }
  getPageData(){
    
    this.total_records=100;
    this.page_list = [{
      id:'1',
      complaint:'need',
      status:'pending',
      notes:'',
      created_at:'13 Jan,2022',
      updated_at:'13 Jan,2022'
    },{
      id:'2',
      complaint:'need123',
      status:'reject',
      notes:'',
      created_at:'13 Jan,2022',
      updated_at:'13 Jan,2022'
    },{
      id:'3',
      complaint:'ne123123ed',
      status:'resolved',
      notes:'',
      created_at:'13 Jan,2022',
      updated_at:'13 Jan,2022'
    }];
    this.setPaginationButtons();
  }
  
  headerPress(key:string){
    if(key == this.sort_by){
      if(this.sort_value == 'asc'){
        this.sort_value = 'desc';
      }else{
        this.sort_value = 'asc';
      }
    }else{
      this.sort_by = key;
      this.sort_value = 'desc';
    }
    this.current_page = 1;
    this.getPageData();
  }
 
  showLoader(){
    this.is_loading = true;
  }
  hideLoader(){
    this.is_loading = false;
  }
  setPaginationButtons(){
    console.log('asd');
    
    this.number_of_pages = Math.ceil(this.total_records/this.per_page_item);

    if(this.current_page == 1){
      this.is_prev_enabled = false;
      this.is_first_enabled = false;
        //disabled prev
        // disabled first
    }else if(this.current_page>1){
        // enable first
        // enable prev
        this.is_prev_enabled = true;
      this.is_first_enabled = true;
    }
console.log(this.is_first_enabled);

    if(this.current_page == this.number_of_pages){
          //disabled next    
          // disabled lasr
          this.is_next_enabled = false;
          this.is_last_enabled = false;
    }else if(this.current_page<this.number_of_pages){
        // enable last
        // enable next
        this.is_next_enabled = true;
          this.is_last_enabled = true;
    }
    let number_of_pages_arr = [];
    for (let index = 0; index < this.number_of_pages; index++) {
      // const element = this.number_of_pages;
      let item = {
        name: index+1,
        value: index+1
      };
      number_of_pages_arr.push(item);
    }
    this.number_of_pages_arr = number_of_pages_arr;
  }
  jumpTo(event:any){
    console.log(this.jump_to_number);
    
  }
  
previousClick(){
     if(this.current_page!=1){
      this.current_page--;
     }
     this.getPageData();
}
nextClick(){
     if(this.current_page!=this.number_of_pages){
      this.current_page++;
     }
     this.getPageData();
}
firstClick(){
  this.current_page = 1;
  this.getPageData();
}
lastClick(){
  this.current_page = this.number_of_pages;
  this.getPageData();
}
goToPage(page_no:any){
  this.current_page = page_no;
  this.getPageData();
}

}
