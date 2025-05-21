import { Component } from '@angular/core';
import {environment} from "../../../../../environment";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: false
})
export class HomeComponent {
  protected readonly environment = environment;
}
