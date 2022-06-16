import {Component, Inject, OnInit} from '@angular/core';
import {EKeyService} from '../../../controller/eKey.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Ekey} from '../../../model/ekey';
import {Entrance} from "../../../model/entrance";
import {HttpParams} from "@angular/common/http";
import {EntranceService} from "../../../controller/entance.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'open-close-entrance',
  templateUrl: './open-close-entrance.component.html',
  styleUrls: ['./open-close-entrance.component.scss']
})

export class OpenCloseEntranceComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public entrance: Entrance,
              private eKeyService: EKeyService,
              private entranceService: EntranceService) {

  }

  ekeys: Ekey[];
  ekey: Ekey;
  flexWheel = false;
  params: HttpParams;

  formGroup = new FormGroup({
    ekey: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
    let params = new HttpParams().append('isActive', 'true');

    this.eKeyService.getData(params).subscribe(resp =>{
      //@ts-ignore
      this.ekeys = resp.content;
      this.flexWheel = true;
    })
  }

  interact(): void{
    this.flexWheel = true;
    let action = this.entrance.isOpen ? 'close' : 'open';
    /*if (this.entrance.isOpen){
      action = 'close';
    } else {
      action = 'close';
    }*/

    this.params = new HttpParams().append('action', action)
      .append('entranceId', this.entrance.id.toString())
      .append('ekeyId', this.ekey.id.toString());

    this.entranceService.interact(this.params).subscribe(resp => {
      this.flexWheel = false;
    }, error => {
      console.log('error occupied : ' + error.message);
    });

  }
}
