import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxXml2jsonService } from 'ngx-xml2json';
import { map, pluck } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RssService {
  proxyurl = 'https://cors-anywhere.herokuapp.com/';
  parser = new DOMParser();

  constructor(
    private http: HttpClient,
    private ngxXml2jsonService: NgxXml2jsonService
  ) {}

  getNewsArray(url: string) {
    return this.http.get(this.proxyurl + url, { responseType: 'text' }).pipe(
      map(data => this.parser.parseFromString(data, 'text/xml')),
      map(doc => this.ngxXml2jsonService.xmlToJson(doc)),
      pluck('rss'),
      pluck('channel'),
      pluck('item')
    );
  }

  getUrl(url: string) {
    return this.http
    .get(this.proxyurl + url, { responseType: 'text' })
    .pipe(
      map(data => this.parser.parseFromString(data, 'text/xml')),
      map(doc => this.ngxXml2jsonService.xmlToJson(doc)),
      pluck('rss'),
      pluck('channel'),
      pluck('item'),
      map(data => data[0].enclosure['@attributes'].url)
    );
  }

  getData(url: string): Observable<any> {
    if (!url) {
      alert('Введите адрес новостной ленты');
    } else {
      return this.http.get(this.proxyurl + url, { responseType: 'text' }).pipe(
        map((data: string) => this.parser.parseFromString(data, 'text/xml')),
        map(doc => this.ngxXml2jsonService.xmlToJson(doc)),
        pluck('rss'),
        pluck('channel')
      );
    }
  }
}
