import {Extrinsic} from '../classes/extrinsic.class';
import { Phala__ExtrinsicTableComponent } from '../components/extrinsic-table.phala/extrinsic-table.phala.component';
import { ExtrinsicTableComponent } from '../components/extrinsic-table/extrinsic-table.component';
import { Component } from '@angular/core';

type ExtrinsicRoute = {
  listItem: Component,
  detailPage: Component
}

const extrinsicRoutes = {
  modules: {
    authorship: {
      set_uncles: {
        listItem: Phala__ExtrinsicTableComponent,
        detailPage: Phala__ExtrinsicTableComponent
      } as ExtrinsicRoute,
    }
  },
  default: {
    listItem: ExtrinsicTableComponent,
    detailPage: ExtrinsicTableComponent
  } as ExtrinsicRoute,
};

function getRoute (attr: Extrinsic["attributes"]): ExtrinsicRoute {
  try {
    return extrinsicRoutes.modules[attr.module_id][attr.call_id];
  } catch (e) {
    console.log(e)
    return extrinsicRoutes.default;
  }
}

export function getListItemByAttr (attr: Extrinsic["attributes"]): Component {
  return getRoute(attr).listItem;
}

export function getDetailPageByAttr (attr: Extrinsic["attributes"]): Component {
  return getRoute(attr).detailPage;
}
