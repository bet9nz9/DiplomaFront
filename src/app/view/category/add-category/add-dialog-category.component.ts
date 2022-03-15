import {Component} from '@angular/core';
import {CategoryService} from '../../../controller/category.service';
import {Category} from '../../../model/category';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {WaitComponent} from '../../wait/wait.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-category-add',
  templateUrl: 'add-category.html',
  styleUrls: ['../dialog.scss'],
})

// tslint:disable-next-line:component-class-suffix
export class AddDialogCategory{
  constructor( private httpService: CategoryService,
               private dialog: MatDialog) {}
  category = new Category(null);
  formGroup = new FormGroup({
    nameForm: new FormControl('', Validators.required),
    descriptionForm: new FormControl('', Validators.required),
    importantForm: new FormControl('', Validators.required)
  });
  addCategory(): void{
    this.openWaitDialog();
    this.httpService.addCategory(this.category).subscribe((data) =>
      {
        this.dialog.closeAll();
      }, (error) =>
      {
        console.log('error' + error);
      }
    );
  }

  openWaitDialog(): void{
    const dialogRef = this.dialog.open(WaitComponent);

    dialogRef.afterClosed().subscribe(result => {

    });
  }
}
