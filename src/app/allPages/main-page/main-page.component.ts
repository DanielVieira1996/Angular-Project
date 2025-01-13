import { Component } from '@angular/core';
import { FavouriteContentComponent } from '../../content/favourite-content/favourite-content.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-page',
  imports: [RouterOutlet, FavouriteContentComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {

}
