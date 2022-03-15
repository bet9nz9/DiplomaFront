import {Component, DoCheck, OnInit} from '@angular/core';
import {AuthService} from "../../controller/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ActivationMessage} from "../../model/activationMessage";

@Component({
  selector: 'app-activation-code',
  templateUrl: './activation-code.component.html',
  styleUrls: ['./activation-code.component.scss']
})
export class ActivationCodeComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
              private authService: AuthService,
              private router: Router) { }

  code: string;
  activationMessage: ActivationMessage;
  disable = false;
  timeToRedirect = 10;
  interval;
  ngOnInit(): void {
    this.code = this.activatedRoute.snapshot.paramMap.get('code');
    this.getActivation();

  }

  getActivation(): void{
    this.authService.getActivation(this.code).subscribe((data) => {
      this.activationMessage = data;
      this.disable = true;
      this.startTimer();
    })
  }

  startTimer(): void{
    this.interval = setInterval(() => {
      if (this.timeToRedirect > 0){
        this.timeToRedirect--;
      }else {
        this.router.navigate(['./']);
      }
    }, 1000);
  }

}
