import { Component, inject, input, OnInit, output } from '@angular/core';
import { News } from '../../news.model';
import { NewsService } from '../../news.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-new',
  imports: [ReactiveFormsModule],
  templateUrl: './update-new.component.html',
  styleUrl: './update-new.component.css'
})
export class UpdateNewComponent  {
  updateNews = input.required<string>();
  changeNews= output<boolean>();
  titleNew="";
  idNew="";
  form = new FormGroup({
    textNew: new FormControl('',{
      validators:[
        Validators.required
      ]
    }),
  })
  constructor(private newsService: NewsService) {}

  /* getNew(idNew:string){
    this.titleNew = this.newsService.getDataSignal()().filter(value=> value.id===idNew)[0].title;
    this.idNew =this.newsService.getDataSignal()().filter(value=> value.id===idNew)[0].id;
  }

  ngOnInit() {
    this.getNew(this.updateNews());
  } */

  /* onSubmit(){
    var updateObj={
      id: this.idNew,
      text: this.form.value.textNew || ''
    }
    this.newsService.changeContent(updateObj);
    this.changeNews.emit(false);
  } */
  
}
