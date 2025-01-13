import { Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { NewsService } from '../../news.service';
import { Article } from '../../NewsApiResponse.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-favourite-content',
  imports: [RouterLink],
  templateUrl: './favourite-content.component.html',
  styleUrl: './favourite-content.component.css'
})
export class FavouriteContentComponent{
  private newsService= inject(NewsService);
  newArticles= this.newsService.sortedArticles;
  

}
