import { Observable } from 'rxjs';
import { RssService } from './../../services/rss.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.scss']
})
export class ReaderComponent {
  constructor(private rssService: RssService) {}

  public rssData: Observable<any>;
  public newsImgUrl: Observable<any>;
  public newsArray: Observable<any>;

  readLink(url: string) {
    this.newsArray = this.rssService.getNewsArray(url);
    this.newsImgUrl = this.rssService.getUrl(url);
    return (this.rssData = this.rssService.getData(url));
    // .subscribe(
    //   data => console.log(data)
    // )
  }
}
