import {Component, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";

import {SelectItem} from 'primeng/primeng';



@Component({
    selector: 'app-first-form',
    templateUrl: './first-form.component.html',
    styles: []
})
export class FirstFormComponent implements OnInit {

    formGroup: FormGroup;
    checkOptions:string[];
    multiOptions:string[];
    triState?:boolean;
    allOptions:SelectItem[];
    allOptionsAndNull:SelectItem[];
    singleOption?:string;

    constructor() {

    }

    ngOnInit() {
        this.formGroup = null;
        this.checkOptions= [];
        this.multiOptions= [];
        this.triState= null;

        this.allOptionsAndNull = [
            {label:'Choose', value:null},
            {label:'New York', value:'New York'},
            {label:'Rome', value:'Rome'},
            {label:'London', value:'London'},
            {label:'Istanbul', value:'Istanbul'},
            {label:'Johannesburg', value:'Johannesburg'},
            {label:'Sydney', value:'Sydney'},
            {label:'Paris', value:'Paris'},
            {label:'Toronto', value:'Toronto'},

        ];
        this.allOptions = [
            {label:'New York', value:'New York'},
            {label:'Rome', value:'Rome'},
            {label:'London', value:'London'},
            {label:'Istanbul', value:'Istanbul'},
            {label:'Johannesburg', value:'Johannesburg'},
            {label:'Sydney', value:'Sydney'},
            {label:'Paris', value:'Paris'},
            {label:'Toronto', value:'Toronto'},
        ]
    }

}
