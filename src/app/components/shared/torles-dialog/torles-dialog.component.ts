import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {CustomMaterialModule} from "../../../core/custom-material/custom-material.module";

@Component({
    selector: 'app-torles-dialog',
    templateUrl: './torles-dialog.component.html',
    styleUrls: ['./torles-dialog.component.scss'],
    imports: [CustomMaterialModule]
})
export class TorlesDialogComponent {

  protected szoveg?: String;
  protected buttonSzoveg?: String;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    if(data) {
      this.szoveg = data['szoveg'];
      this.buttonSzoveg = data['buttonSzoveg'];
    }
  }


}
