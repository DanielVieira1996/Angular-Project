import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { NewsService } from '../../news.service';
import { Article } from '../../NewsApiResponse.model';
import { RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-content-card',
  templateUrl: './content-card.component.html',
  styleUrls: ['./content-card.component.css'],
  imports:[RouterLink]
})
export class ContentCardComponent {
  start = signal(1);  // Page number
  totalPage = 1;  // Number of articles per page
  search_value = signal('');  // Search term (for filtering)
  order = signal('asc');  // Sorting order (ascending, descending, or by likes)
  isFetching = signal(false);  // To track loading state
  paginationTotal=0;
  range=[];
  data:any

  private newsService = inject(NewsService);
  articles = this.newsService.publicArticles;  // Original unsorted articles

  constructor(private route:ActivatedRoute ){
  
  }

  ngOnInit(): void {
    this.totalPage = this.route.snapshot.data['totalPage'];
    console.log(this.data + " daniel value");
    this.isFetching.set(true);
    const subscription = this.newsService.loadArticles().subscribe({
      next: () => {
        this.isFetching.set(false);
        this.paginationTotal=Math.ceil(this.articles().length/this.totalPage);
        this.range= Array.from({length:this.paginationTotal})        
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        this.isFetching.set(false);
      }
    });

  }

  // Computed signal for filtering and pagination
  filteredArticles = computed(() => {
    let articlesToShow = [...this.articles()]; // Always work with the original unsorted articles
    console.log(articlesToShow);

    // Step 1: Filter by search value (if any)
    if (this.search_value() !== '') {
      articlesToShow = articlesToShow.filter((article) =>
        article.title.toLowerCase().includes(this.search_value().toLowerCase())
      );
    }

      // Sort based on search value (order)
    if (this.order() === 'asc') {
        articlesToShow = articlesToShow.sort((a, b) => a.title.localeCompare(b.title));
    } else if (this.order() === 'des') {
       articlesToShow = articlesToShow.sort((a, b) => b.title.localeCompare(a.title));
    } else {
        // Sort by likes by default
        articlesToShow = articlesToShow.sort((a, b) => (b.likes || 0) - (a.likes || 0));
    }
  
    if(this.order()==="likes"){
        articlesToShow = articlesToShow.sort((a,b)=> b.likes! - a.likes! );
    }
  

    // Step 2: Paginate the articles
    const startIndex = (this.start() - 1) * this.totalPage;
    return articlesToShow.slice(startIndex, startIndex + this.totalPage);
  });

  // Handle the search input change
  onInputChange(event: Event) {
    const inputElement = (event.target as HTMLInputElement).value;
    this.search_value.set(inputElement.toLowerCase());  // Update the search value for filtering
  }

  // Handle sorting order change (trigger sorting manually)
  onchangeOrder(event: Event) {
    const order = (event.target as HTMLInputElement).value;
    this.order.set(order);  // Update the order signal
  }

  // Handle liking an article (does not trigger sorting)
  onLikeArticle(articleId: string) {
    this.newsService.likeArticle(articleId);  // Only update the likes count, don't trigger sorting
  }

  // Handle pagination (move to different page)
  paginationArticle(event: Event) {
    const order = event.target as HTMLElement;
    const orderValue = order?.textContent?.trim();
    this.start.set(orderValue ? parseInt(orderValue) : 1);  // Update the start page number
  }

  // Optional: Get sorted articles manually when needed (for example, on sorting action)
  getSortedArticles(): Article[] {
    return this.newsService.getSortedArticles();
  }

  // Delete articles
  deleteArticle(event: string){
    console.log("DELETE" + event);
  }
}