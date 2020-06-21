import {Extrinsic} from '../classes/extrinsic.class';
import { Phala__ExtrinsicTableComponent } from '../components/extrinsic-table.phala/extrinsic-table.phala.component';
import { ExtrinsicTableComponent } from '../components/extrinsic-table/extrinsic-table.component';
import { Component } from '@angular/core';
import { ExtrinsicListItemComponent } from '../components/extrinsic-list-item/extrinsic-list-item.component';
import { Phala__ExtrinsicListItemComponent } from '../components/extrinsic-list-item.phala/extrinsic-list-item.phala.component';

type ExtrinsicRoute = {
  listItem: Component,
  detailPage: Component
}

const extrinsicRoutes = {
  modules: {
    phalamodule: {
      push_command: {
        listItem: Phala__ExtrinsicListItemComponent,
        detailPage: Phala__ExtrinsicTableComponent
      } as ExtrinsicRoute,
      register_worker: {
        listItem: Phala__ExtrinsicListItemComponent,
        detailPage: Phala__ExtrinsicTableComponent
      } as ExtrinsicRoute,
    }
  },
  default: {
    listItem: ExtrinsicListItemComponent,
    detailPage: ExtrinsicTableComponent
  } as ExtrinsicRoute,
};

function getRoute (attr: Extrinsic["attributes"]): ExtrinsicRoute {
  try {
    return extrinsicRoutes.modules[attr.module_id][attr.call_id] || extrinsicRoutes.default;
  } catch (e) {
    return extrinsicRoutes.default;
  }
}

export function getListItemByAttr (attr: Extrinsic["attributes"]): Component {
  return getRoute(attr).listItem;
}

export function getDetailPageByAttr (attr: Extrinsic["attributes"]): Component {
  return getRoute(attr).detailPage;
}
