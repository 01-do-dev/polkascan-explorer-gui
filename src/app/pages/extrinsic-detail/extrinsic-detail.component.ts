/*
 * Polkascan Explorer GUI
 *
 * Copyright 2018-2020 openAware BV (NL).
 * This file is part of Polkascan.
 *
 * Polkascan is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Polkascan is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Polkascan. If not, see <http://www.gnu.org/licenses/>.
 *
 * extrinsic-detail.component.ts
 */

import { Component, OnDestroy, OnInit, ComponentFactoryResolver, ViewChild, ViewContainerRef, Type } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Extrinsic } from '../../classes/extrinsic.class';
import { ExtrinsicService } from '../../services/extrinsic.service';
import { AppConfigService } from '../../services/app-config.service';
import { getDetailPageByAttr } from 'src/app/utils/extrinsic-route';

@Component({
  selector: 'app-extrinsic-detail',
  templateUrl: './extrinsic-detail.component.html',
  styleUrls: ['./extrinsic-detail.component.scss']
})
export class ExtrinsicDetailComponent implements OnInit, OnDestroy {

  @ViewChild('extrinsicTable', { read: ViewContainerRef }) viewContainer: ViewContainerRef;
  extrinsic$: Observable<Extrinsic>;
  public notFound = false;

  private networkSubscription: Subscription;
  public networkURLPrefix: string;
  public networkTokenDecimals: number;
  public networkTokenSymbol: string;

  constructor(
    private route: ActivatedRoute,
    private extrinsicService: ExtrinsicService,
    private appConfigService: AppConfigService,
    private resolver: ComponentFactoryResolver
  ) { }

  ngOnInit() {
    this.networkSubscription = this.appConfigService.getCurrentNetwork().subscribe(network => {
      this.networkURLPrefix = this.appConfigService.getUrlPrefix();

      this.networkTokenDecimals = +network.attributes.token_decimals;
      this.networkTokenSymbol = network.attributes.token_symbol;
      this.getExtrinsic();
    });
  }

  getExtrinsic() {
    const _this = this;

    this.extrinsic$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return this.extrinsicService.get(params.get('id'));
      })
    );

    this.extrinsic$.subscribe({
      next(value) {
        _this.loadSubComponent(value);
      }, error(err) {
        console.log(err.status === 404);
        if (err.status === 404) {
          this.notFound = true;
        }
      }
    });

  }

  loadSubComponent(value) {
    if (!(value && value.attributes)) {
      return;
    }

    this.viewContainer.clear();

    const componentFactory = this.resolver.resolveComponentFactory<Component>(
      getDetailPageByAttr(value.attributes) as Type<Component>
    );
    const componentRef = this.viewContainer.createComponent(componentFactory);
    (componentRef.instance as any).extrinsic = value;
    (componentRef.instance as any).networkURLPrefix = this.networkURLPrefix;
    (componentRef.instance as any).networkTokenDecimals = this.networkTokenDecimals;
    (componentRef.instance as any).networkTokenSymbol = this.networkTokenSymbol;
  }

  ngOnDestroy() {
    // Will clear when component is destroyed e.g. route is navigated away from.
    this.networkSubscription.unsubscribe();
  }
}
