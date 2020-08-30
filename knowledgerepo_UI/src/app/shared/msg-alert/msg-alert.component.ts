import { Component, OnInit ,Input, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-msg-alert',
  templateUrl: './msg-alert.component.html',
  styleUrls: ['./msg-alert.component.css']
})
export class MsgAlertComponent implements OnInit {

  @Input () setMessage:{message:string,msg:boolean};

  constructor() { }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['setMessage']){
      window.scroll(0,0);
     setTimeout(() => {
      this.setMessage.message='';
      this.setMessage.msg=false;
     }, 7000);
    } 
  }
}
