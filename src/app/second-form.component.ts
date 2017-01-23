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

    allOptions: SelectItem[];
    allOptionsAndNull: SelectItem[];

    constructor() {
    }

    ngOnInit() {
        this.form = new FormGroup({});
        this.form.addControl('triState', new FormControl());
        this.form.addControl('checkBox', new FormControl([]));
        this.form.addControl('dropDown', new FormControl());
        this.form.addControl('multiSelect', new FormControl([]));
        this.allOptionsAndNull = [
            {label: 'Choose', value: null},
            {label: 'New York', value: 'New York'},
            {label: 'Rome', value: 'Rome'},
            {label: 'London', value: 'London'},
            {label: 'Istanbul', value: 'Istanbul'},
            {label: 'Johannesburg', value: 'Johannesburg'},
            {label: 'Sydney', value: 'Sydney'},
            {label: 'Paris', value: 'Paris'},
            {label: 'Toronto', value: 'Toronto'},

        ];
        this.allOptions = [
            {label: 'New York', value: 'New York'},
            {label: 'Rome', value: 'Rome'},
            {label: 'London', value: 'London'},
            {label: 'Istanbul', value: 'Istanbul'},
            {label: 'Johannesburg', value: 'Johannesburg'},
            {label: 'Sydney', value: 'Sydney'},
            {label: 'Paris', value: 'Paris'},
            {label: 'Toronto', value: 'Toronto'},
        ]

    }
}

type FilterUiType = "flag"|"multiChoice"|"singleChoice";

interface UiLabel {
    id: string;
    name: string;
    description?: string;
}

interface UiSetting extends UiLabel {
    userId?: string;
    simple?: UiFilter[];
    hierarchy?: UiHierarchyFilter;
}

interface UiFilter extends UiLabel {
    type: FilterUiType;
    values?: UiLabel[]
}

interface UiHierarchyLevelFilter {
    id: string;
    config?: string[];
}

interface UiHierarchyFilter {
    name: string;
    description: string;
    levels: UiHierarchyLevelFilter[];
}

function getSetting(): UiSetting|null {
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
