import { Observable } from 'rxjs';
import { RssService } from './../../services/rss.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.scss']
})
export class ReaderComponent implements OnInit {

  constructor(private rssService: RssService) {}

  public rssData;
  public newsImgUrl;

  ngOnInit() {}

  readLink(url: string) {
    this.newsImgUrl = this.rssService.getUrl(url);
    return this.rssData = this.rssService.getData(url)
    // .subscribe(
    //   data => console.log(data)
    // )
    ;
  }
}
