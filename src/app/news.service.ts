import { Injectable, inject, OnInit, signal, DestroyRef, OnDestroy, computed } from "@angular/core";
import { TestComponentRenderer } from "@angular/core/testing";
import { HttpClient } from "@angular/common/http";
import { Article, NewsApiResponse } from "./NewsApiResponse.model";
import { BehaviorSubject, catchError, map, Observable,of, tap, throwError } from 'rxjs';

@Injectable({
    providedIn:'root'
})

export class NewsService  {

  private articles = signal<Article[]>([]);
  defaultImage: string = "favicon.ico"
    url = 'https://newsapi.org/v2/top-headlines?' +
    'country=us&' +
    'apiKey=f1d6c2d2571948328a778f914f233777';

  publicArticles= this.articles.asReadonly();


  // computed will run everytime, in this case, this.articles changes, so everytime we update the articles, we will create a new public
  // sortedArticles which will be get the sorted articles.
  public sortedArticles = computed(() =>
    [...this.articles()].sort((a, b) => b.likes - a.likes).slice(0,5));

  
 
  constructor(private httpClient: HttpClient) {}

  private fetchArticles() {
    console.log("Loading articles");
    var obj={likes:0};
    const aux: Article[]=[];
    return this.httpClient.
    get<{ articles: Article[] }>(this.url)
    .pipe(
      map((resData)=>{
        console.log("try danie");
        console.log(resData.articles);
        const result= this.getPaginationArticles(resData.articles);
        this.articles.set(result)
        return result;
      }),     
      catchError((error)=>{
        console.log(error);
        return throwError(
          ()=>
            new Error('Something went wrong')
        );
      })
    )
  }


  loadArticles() {
    const aux= this.fetchArticles();
    console.log(aux);
    return this.fetchArticles();
  }

  loadSpecificArticle(){
    return this.fetchArticles();
  }

  public getArticle(articleId: number): Article[] | undefined {
    return this.articles().filter(item => String(item.id) === String(articleId));
  }

  likeArticle(article:string){
    const temp = this.articles().map(item => 
    item.title === article ? { ...item, likes:item.likes + 1 } : item);    
    this.articles.set(temp);  // Update the signal
  }

  
    getStorage(){
      if(window.localStorage.getItem('login')){
        return true;
      }
      else return false;

    } 

    getSortedArticles(): Article[] {
      return [...this.articles()].sort((a, b) => b.likes - a.likes); // Sort by likes
    }


    getPaginationArticles(articles : Article[]) : Article[]{
      return articles.filter(article=>!article.title.includes("Removed"))
          .map((article,index)=>{
                article.urlToImage = article.urlToImage || 'favicon.ico';         
                const temp={...article,id:index, likes:0}
                return temp;
              })
          }
              
  
}