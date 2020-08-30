import { Component, OnInit ,Input, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-error-alert',
  templateUrl: './error-alert.component.html',
  styleUrls: ['./error-alert.component.css']
})
export class ErrorAlertComponent implements OnInit {

  @Input () setMessage:{message:string,error:boolean};

  constructor() { }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['setMessage']){
      window.scroll(0,0);
     setTimeout(() => {
      this.setMessage.message='';
      this.setMessage.error=false;
     }, 7000);
    } 
  }


}
