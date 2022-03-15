import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {CategoryService} from '../../../controller/category.service';
import {Category} from '../../../model/category';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {WaitComponent} from '../../wait/wait.component';

@Component({
  selector: 'app-update-category',
  templateUrl: 'update-category.html',
  styleUrls: ['../dialog.scss'],
})

// tslint:disable-next-line:component-class-suffix
export class UpdateCategory implements OnInit {

  constructor(private categoryService: CategoryService,
              @Inject(MAT_DIALOG_DATA) public category: Category,
              private dialog: MatDialog) {}

  flexWheel = true;

  formGroup = new FormGroup({
    nameForm: new FormControl('', Validators.required),
    descriptionForm: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
    this.categoryService.getOneCategory(this.category.id).subscribe(
      (response) => {
        this.category = response;
        this.flexWheel = false;
      }
    );
  }

  openWaitDialog(): void{
    const dialogRef = this.dialog.open(WaitComponent);

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  updateCategory(): void{
    this.openWaitDialog();
    this.categoryService.updateCategory(this.category).subscribe((data) =>
      {
        this.dialog.closeAll();
      }, (error) =>
      {
        console.log('error' + error);
      }
    );
  }
}
