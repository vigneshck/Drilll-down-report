import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  Name_value:any;
  output:any; 
  rows:any;
  result:any;
  taluk:any;
  talukdata:any;
  districtcode:any;
  myVar:any;
  today:any;
  schedule:any;
  getdata: any;
  
  constructor(private http: HttpClient) {

    const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const d = new Date();

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = monthNames[d.getMonth()]; 
var yyyy = today.getFullYear();

this.today = mm + ' ' + dd + ', ' + yyyy;
//alert(today);
    
   }

  ngOnInit() {

    this.getdata()
  
  }
  
  getdistrict(): void {
   
    let res = this.http.post('https://tnega.ceg.tn.gov.in/microsvc/tnega_transaction_details/', {
      department: "REV- Revenue Department",
      from_date: "2019-01-01",
      report_type: "REVENUE",
      search_type: "District",
      service_name: "No Graduate",
      to_date: "2019-02-01"
    }).subscribe(data => {

    this.result = data;
    
    console.log(this.result);

    var code = this.result[6].en_district_name

     
    });

  }

  gettaluk(): void {
   
    let res = this.http.post('https://tnega.ceg.tn.gov.in/microsvc/tnega_transaction_details/', {
      department: "REV- Revenue Department",
      district: this.districtcode,
      from_date: "2019-01-01",
      report_type: "REVENUE",
      search_type: "Taluk",
      service_name: "No Graduate",
      to_date: "2019-02-01"
    }).subscribe(data => {

    this.talukdata = data;
    console.log(this.talukdata);
    });

  }

  getcode(districtcode): void {

    this.districtcode = districtcode;
    alert(this.districtcode);
    this.gettaluk();
    this.myVar = true;

  }



  getdata(): void {
   
    let res = this.http.post('http://192.168.2.210:29532/microsvc/ibs_s_wrapper_service/', {
      PARAMS:{
      IMES_ID: "201",
      IMP_ID: "41",
      AMOUNT: "500000",
      RATE: "10",
      TERMMONTHS: "18",
      PAYMENTONDAY: "25",
      ISSUEDATE: "25.05.2019"
      }
      }).subscribe(data => {

    //this.talukdata = data;
    console.log(data.data);

    console.log(data.data.data.REPAYMENT_SCHEDULE);

    this.schedule = data.data.data.REPAYMENT_SCHEDULE;

    console.log(this.schedule);
    });

  }





}
