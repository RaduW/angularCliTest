import {Component, OnInit} from '@angular/core';

import {FormControl, FormGroup} from '@angular/forms';
import {SelectItem} from "primeng/components/common/api";

@Component({
    selector: 'app-second-form',
    templateUrl: './second-form.component.html',
    styles: []
})
export class SecondFormComponent implements OnInit {

    form: FormGroup;

    filters: UiFilter[];
    allOptions: SelectItem[];
    allOptionsAndNull: SelectItem[];
    options : any;

    constructor() {
    }

    ngOnInit() {
        this.form = new FormGroup({});
        let settings = getSettings();
        this.filters =  settings.simple;
        this.options = {};

        for( let item of this.filters ){
            switch( item.type){
                case "flag":
                    this.form.addControl(item.id, new FormControl());
                    break;
                case "multiChoice":
                    this.form.addControl(item.id, new FormControl([]));
                    this.options[item.id] = SecondFormComponent.filterOptions(item.values, false);
                    break;
                case "singleChoice":
                    this.form.addControl(item.id, new FormControl([]));
                    this.options[item.id] = SecondFormComponent.filterOptions(item.values, true);
                    break;
                default:
                    console.error(`Unsupported filter of type: ${item.type}`);

            }
        }
    }

    static filterOptions(values:UiLabel[], addDefault:boolean):SelectItem[]{
        let retVal:SelectItem[]= [];
        if ( addDefault){
            retVal.push({label: 'Choose', value: null});
        }
        for ( let value of values){
            retVal.push({label:value.name, value:value.id});
        }
        return retVal;
    }
}

export type FilterUiType = "flag"|"multiChoice"|"singleChoice";

export interface UiLabel {
    id: string;
    name: string;
    description?: string;
}

export interface UiSetting extends UiLabel {
    userId?: string;
    simple?: UiFilter[];
    hierarchy?: UiHierarchyFilter;
}

export interface UiFilter extends UiLabel {
    type: FilterUiType;
    values?: UiLabel[]
}

export interface UiHierarchyLevelFilter {
    id: string;
    config?: string[];
}

export interface UiHierarchyFilter {
    name: string;
    description: string;
    levels: UiHierarchyLevelFilter[];
}

function getSettings(): UiSetting|null {
    return {
        id: "basic",
        name: "Test",
        description: "this is a test",
        simple: [
            {
                id: "emitent",
                name: "Emitent",
                description: "Emitent type",
                type: "singleChoice",
                values: [
                    {
                        id: "ministerul_apararii",
                        name: "Ministerul Apararii"
                    },
                    {
                        id: "ministerul_afacerilor_interne",
                        name: "Ministerul Afacerilor Interne"
                    },
                    {
                        id: "ministerul_educatiei",
                        name: "Ministerul Educatiei"
                    }
                ]
            },
            {
                id: "publicationType",
                name: "Publication Type",
                description: "Publication Type",
                type: "multiChoice",
                values: [
                    {
                        id: "monitorul_oficial",
                        name: "Monitorul Oficial",
                        description: "Monitorul Oficial"
                    },
                    {
                        id: "revista_legi_si_retete",
                        name: "Revista Legi si Retete",
                        description: "Revista Legi si Retete",
                    },
                    {
                        id: "biroul_electoral_municipal_bucuresti",
                        description : "Biroul Electoral Municipal Bucuresti",
                        name : "Biroul Electoral Municipal Bucuresti"
                    }
                ]
            },
            {
                id: "published",
                name: "Published",
                description: "is published",
                type: "flag"
            }
        ]
    }
}
