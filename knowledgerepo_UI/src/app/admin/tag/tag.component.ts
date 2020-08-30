import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription ,Observable} from 'rxjs';
import { TagService } from '../../module-service/tag.service';
import { StorageService } from '../../shared/storage.service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';


@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {
  createTagData: FormGroup;
  tagSubscription$: Subscription;
  setMessage: any = {};
  msg: String;
  status: String;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router, 
    private _tagService: TagService, 
    private _storage: StorageService,
    private confirmationService: ConfirmationService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.createTagData = this.formBuilder.group({
      tagName: ['', [Validators.required, Validators.minLength(1)]],
    });
    //sessionStorage.clear(); 
  }
  onSubmit() {
    if (this.createTagData.invalid) {
      return;
    }
    this.tagSubscription$ = this._tagService.createTag(this.createTagData.value).subscribe(resp => {
      console.log("response Object ", resp);
      this.msg = resp.msg;
      this.status = resp.status.toUpperCase();
      if (this.status == 'ERROR') {
        this.setMessage = { message: this.msg, error: true };
      } else if (this.status == 'SUCCESS') {
        this.setMessage = { message: this.msg, msg: true };
      }
    })
  }

}
