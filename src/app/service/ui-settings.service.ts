import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {UiSetting, FilterUiType} from "../ui-setting";
import {Http, ResponseContentType, Response} from "@angular/http";


import "rxjs/add/operator/map";


@Injectable()
export class UiSettingsService {

    constructor(private http: Http) {
    }

    getUiSetting(settingName: string): Observable<UiSetting> {
        return this.http.get(`${settingName}-UiSettings.json`, {responseType: ResponseContentType.Json})
            .map((response: Response) => {
                return <UiSetting>response.json();
            });
    }
}
