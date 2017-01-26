import { Injectable } from '@angular/core';
import {HierarchyService} from "./hierarchy.service";
import {UiFilter} from "../ui-filter";
import {Observable} from "rxjs/Observable";
import {TreeNode} from "primeng/components/common/api";
import {UiLabel} from "../ui-label";
import * as R from "ramda";

@Injectable()
export class TreeHierarchyAdapterService {

  constructor(private hierarchyService: HierarchyService) { }

  //adapt UiLabels to TreeNode(s)
  getChildren( filter:UiFilter, category:string, isLeaf:boolean):Observable<TreeNode[]>{
      return this.hierarchyService.getChildren(filter,category).map(
          ( nodes : UiLabel[])=>
              R.map( node =>
                  <TreeNode>{
                      label: node.name,
                      data: node.id,
                      leaf: isLeaf
                  }
                  ,nodes));
  }


}
