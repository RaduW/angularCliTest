import {UiLabel} from "./ui-label";
import * as R from "ramda";

export interface UiSetting extends UiLabel {
    userId?: string;
    simple?: UiFilterElement[];
    hierarchy?: UiHierarchyFilter;
}


export type FilterUiType = "flag"|"multiChoice"|"singleChoice";


export interface UiFilterElement extends UiLabel {
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


export function getHierarchyLevels( levels : UiHierarchyLevelFilter[]):string[]{
    const extractPath = (val) => {
        if ( val.config)
            return R.map( (configVal)=>`${val.id}:${configVal}`, val.config);
        return [val.id];
    };
    const paths = R.reduce( (result,level) => R.concat(result, extractPath(level)), [],levels);
    return paths;

}
