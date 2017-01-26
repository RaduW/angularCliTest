import { Injectable } from '@angular/core';
import {Http, ResponseContentType, Response} from "@angular/http";
import {UiFilter} from "../ui-filter";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";
import {UiLabel} from "../ui-label";

@Injectable()
export class HierarchyService {

  constructor(private http:Http) { }

  getChildren(filter:UiFilter, category:string):Observable<UiLabel[]>{
      const categoryToLevel = {
          "documentType":1,
          "publicationDate:Y":2,
          "publicationDate:M":3,
          "legislationType":4
      };
      const level = categoryToLevel[category];

       return this.http.get(`${level}-hierarchyNodes.json`, {responseType: ResponseContentType.Json})
            .map((response: Response) => {
                return <UiLabel[]>response.json();
            });

  }
}
