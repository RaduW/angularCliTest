import {Component, OnInit} from '@angular/core';

import {FormControl, FormGroup} from '@angular/forms';
import {SelectItem, TreeNode} from "primeng/components/common/api";
import * as R from "ramda";

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
    treeSelection: TreeNode;
    treeContent: TreeNode[];
    treeConfig:string[];
    options : any;
    selectionForDisplay:any;

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
        this. treeSelection = null;
        this.treeContent = getRootContent();
        this.treeConfig =  getTreeConfig(settings);
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

    onNodeSelected({node}:{node:TreeNode}){
        this.selectionForDisplay = R.compose(R.dissoc('parent'), R.dissoc('children'))(node);
        console.log(node);

    }
    onNodeExpand({node}:{node:TreeNode}){
        // if ( node.children == null)
        //     node.children = getTreeContent();
    }

    onNavigate(){
        this.treeSelection = this.treeContent[0].children[1].children[2];
        this.treeContent[0].expanded=true;
        this.treeContent[0].children[1].expanded = true;
        //this.treeContent[0].children[1].children[2].expanded = true;
        console.log(this.treeSelection);
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

export interface UiHierarchyLevelFilter extends UiLabel {
    config?: string[];
}

export interface UiHierarchyFilter {
    name: string;
    description: string;
    levels: UiHierarchyLevelFilter[];
}
function getRootContent():TreeNode[]{
    let retVal = [
        {

            label: "Root",
            data: "root",
            expandedIcon: "fa-circle",
            collapsedIcon: "fa-circle-o",
            leaf: false,
            children: getTreeContent()
        }];

    for ( const node of retVal[0].children)
    {
        node.children = getTreeContent();
        for ( const node2 of node.children)
        {
            node2.children = getTreeContent();
        }
    }

    return retVal;
}

function getTreeContent(): TreeNode[]{
    return R.clone([
        {

            label: "Mumu",
            data: "mumu",
            //expandedIcon: "fa-circle",
            //collapsedIcon: "fa-circle",
            leaf: false
        },
        {
            label: "Pupu",
            data: "pupu",
            //expandedIcon: "fa-circle",
            //collapsedIcon: "fa-circle",
            leaf: false
        },
        {
            label: "Cucu",
            data: "cucu",
            //expandedIcon: "fa-circle",
            //collapsedIcon: "fa-circle",
            leaf: false
        },
        {
            label: "Lulu",
            data: "lulu",
            //expandedIcon: "fa-circle",
            //collapsedIcon: "fa-circle",
            leaf: false
        }
    ]);
}

function getTreeConfig(settings:UiSetting):string[]{
    let retVal = [];
    for ( let filter of settings.hierarchy.levels){
        if ( filter.config){
            for( let param of filter.config ){
                retVal.push(`${filter.id}:${param}`);
            }
        }
        else{
            retVal.push(filter.id);
        }
    }
    return retVal;
}

function getSettings(): UiSetting|null {
    return {
        id: "basic",
        name: "Test",
        description: "this is a test",
        simple: [
            {
                id: "converted",
                name: "Converted",
                description: "is Converted",
                type: "flag"
            },
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
        ],
        hierarchy: {
            name: "some_hierarchy",
            description: "some hierarchy description",
            levels:[
                {
                    id:"filter1",
                    name:"Filter 1 name"
                },
                {
                    id:"publicationDate",
                    name:"Publication Date",
                    config:["Y", "M"]
                },
                {
                    id:"filter2",
                    name:"Filter 2 name"
                },
            ]
        }
    }
}
