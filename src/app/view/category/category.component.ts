import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {CategoryService} from '../../controller/category.service';
import {Category} from '../../model/category';
import {AddDialogCategory} from './add-category/add-dialog-category.component';
import {UpdateCategory} from './update-category/update-category';

@Component({
  selector: 'app-category',
  templateUrl: 'category.component.html',
  styleUrls: ['dialog.scss'],
})
// tslint:disable-next-line:component-class-suffix
export class DialogCategory implements OnInit{

  flexWheel: boolean;
  displayedColumns: string[] = ['name', 'description', 'action'];
  categories: Category[];
  constructor(public dialog: MatDialog,
              public categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void{
    this.flexWheel = true;
    this.categoryService.getAll().subscribe((categoryResponse) => {
      // @ts-ignore
      this.categories = categoryResponse.content;
      this.flexWheel = false;
    });
  }

  updateCategory(category: Category): void{
    const dialogRef = this.dialog.open(UpdateCategory, {
      data: category,
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getCategories();
    });
  }

  deleteCategory(category: Category): void {
    this.categoryService.deleteCategory(category.id).subscribe(data => {
      console.log(data);
    });
    this.getCategories();
  }
  addCategory(): void{
    const dialogRef = this.dialog.open(AddDialogCategory);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getCategories();
    });
  }
}
