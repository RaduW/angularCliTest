import {TreeNode} from "primeng/components/common/api";
import {UiFilter} from "./ui-filter";
import * as R from "ramda"


export function getFilterAndCategory(node:TreeNode, filterNames:string[])
        :{filter:UiFilter, category:string, isLeaf:boolean}{
    let numFilters = 0;
    while ( node.data){
        ++numFilters;
        node = node.parent;
    }
    const filter = getFilterForNode(node,filterNames);
    if ( numFilters >= filterNames.length){
        return null;
    }
    let isLeaf : boolean = false;
    if ( numFilters + 1 == filterNames.length){
        isLeaf = true;
    }

    return {
        isLeaf:isLeaf,
        filter:filter,
        category:filterNames[numFilters]
    };

}

export function getFilterForNode(node:TreeNode, filterNames:string[]): UiFilter{
    let selectedVals :string[]= [];
    while ( node.data){
        selectedVals = R.prepend(node.data,selectedVals);
        node = node.parent;
    }
    const filter = R.zipObj(filterNames, selectedVals);
    return filter
}
