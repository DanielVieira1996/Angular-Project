import { Component, inject } from '@angular/core';
import { NewsService } from '../news.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  
  newsService= inject(NewsService);
  authenticatedUser = this.newsService.getStorage();
  
  

}
