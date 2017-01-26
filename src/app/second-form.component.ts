import {Component, OnInit} from '@angular/core';

import {FormControl, FormGroup} from '@angular/forms';
import {SelectItem, TreeNode} from "primeng/components/common/api";
import * as R from "ramda";
import {UiFilterElement, UiSetting, UiHierarchyLevelFilter, getHierarchyLevels} from "./ui-setting";
import {UiLabel} from "./ui-label";
import {UiSettingsService} from "./service/ui-settings.service";
import {UiFilter} from "./ui-filter";
import {ServerHierarchyNode} from "./service/server-hierarchy-node";
import {TreeHierarchyAdapterService} from "./service/tree-hierarchy-adapter.service";
import {getFilterAndCategory, getFilterForNode} from "./tree-node-uitl";

@Component({
    selector: 'app-second-form',
    templateUrl: './second-form.component.html',
    styles: []
})
export class SecondFormComponent implements OnInit {

    form: FormGroup;
    filters: UiFilterElement[];
    treeSelection: TreeNode;
    hierarchyFilterNames: string[];
    treeContent: TreeNode[];
    options : any;
    globalFilter: UiFilter;


    constructor(private uiSettingsService:UiSettingsService, private hierarchyService:TreeHierarchyAdapterService) {}

    ngOnInit() {
        this.form = new FormGroup({});

        this.form.valueChanges.subscribe(value => this.onFilterValueChanges(value));

        this.uiSettingsService.getUiSetting("first").subscribe(
            (settings:UiSetting)=>{ this.onUiSettingsChanged(settings);}
        );

    }

    private onFilterValueChanges(value:any){
        //this.globalFilter = this.getContentsFilter(this.treeSelection);
        console.log(value);
        if ( this.treeSelection)
            this.globalFilter = R.merge(value, getFilterForNode(this.treeSelection,this.hierarchyFilterNames));
        else
            this.globalFilter = value;
    }

    private onUiSettingsChanged(settings:UiSetting){
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
        this.treeSelection = null;
        this.treeContent = getRootContent();
        this.hierarchyFilterNames = getHierarchyLevels(settings.hierarchy.levels);
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
        this.globalFilter = R.merge(this.form.value,  getFilterForNode(node,this.hierarchyFilterNames));
    }
    onNodeExpand({node}:{node:TreeNode}){
        const {filter,category,isLeaf} = getFilterAndCategory(node,this.hierarchyFilterNames);
        if ( ! node.children && ! node.leaf ){
            this.hierarchyService.getChildren(filter,category,isLeaf).subscribe(children =>{
                node.children = children;
            });
        }
    }

    onNavigate(){
        this.treeSelection = this.treeContent[0].children[1].children[2];
        this.treeContent[0].expanded=true;
        this.treeContent[0].children[1].expanded = true;
        //this.treeContent[0].children[1].children[2].expanded = true;
        console.log(this.treeSelection);
    }

    getContentsFilter(node:TreeNode):UiFilter{
        const filters = this.form.value;
        const hierachyFilter = node? getFilterForNode(node,this.hierarchyFilterNames) : null;
        return R.merge(filters,hierachyFilter);
    }

}

interface ITreeData{
    filter: {[name:string]:number|string} ;
    category: string;
}

function serverNodesToTreeNodes(serverNodes : ServerHierarchyNode[]){
    return null;
}

function getRootContent():TreeNode[] {
    return [{
        label: "Root",
        data: null,
        expandedIcon: "fa-circle",
        collapsedIcon: "fa-circle-o",
        leaf: false,
        //children: null
    }];
}







