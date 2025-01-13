import { Component, computed, inject, input, OnInit } from '@angular/core';
import { NewsService } from '../../news.service';
import { CommentsComponent } from '../comments/comments.component';
import { Article } from '../../NewsApiResponse.model';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-all-content',
  imports: [CommentsComponent],
  templateUrl: './all-content.component.html',
  styleUrl: './all-content.component.css'
})
export class AllContentComponent  {
  contentId= input.required<number>(); 
  private newsService= inject(NewsService);
  articles : Article[]=[];
  isLoading=false;
  //selectedArticle: Article ={};

 ngOnInit(): void {
  console.log(this.contentId());
    this.newsService.loadArticles().subscribe({
      next: (data) => {
        this.articles = data;
        //this.selectedArticle? = this.articles.find(article => article.id === this.contentId());
        console.log(this.articles);
        this.isLoading=true;
      },
      error: (error) => {
        console.error(error);
        this.isLoading=false;
      }
    });
  }
  
  
}


