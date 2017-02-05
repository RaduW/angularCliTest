import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {FormGroup, NgForm} from "@angular/forms";

import {SelectItem} from 'primeng/primeng';



@Component({
    selector: 'app-first-form',
    templateUrl: './first-form.component.html',
    styles: []
})
export class FirstFormComponent implements OnInit {

    allOptions:SelectItem[];
    allOptionsAndNull:SelectItem[];
    i1:any;
    i2:any;
    
    @ViewChild(NgForm)
    f: NgForm;
    
    constructor() {
        this.i1 =[];
        this.i2=[];
    }
    
    
    ngOnInit() {

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
