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
 * extrinsic-table.component.ts
 */

import {Component, Input, OnInit} from '@angular/core';
import {Extrinsic} from '../../classes/extrinsic.class';
import {Location} from '@angular/common';
import {ExtrinsicService} from '../../services/extrinsic.service';

@Component({
  selector: 'app-extrinsic-table-phala',
  templateUrl: './extrinsic-table.phala.component.html',
  styleUrls: ['./extrinsic-table.phala.component.scss']
})
export class Phala__ExtrinsicTableComponent implements OnInit {

  _extrinsic: Extrinsic = null;
  contractId = null;
  payload = null;
  encodedRuntimeInfo = null;
  report = null;
  signature = null;
  rawSigningCert = null;
  amount = null;
  data = null;

  @Input() extrinsicId: string = null;
  @Input() context: string = null;
  @Input() networkURLPrefix: string = null;
  @Input() networkTokenDecimals = 0;
  @Input() networkTokenSymbol: string ;
  @Input() title: string;

  @Input() set extrinsic(extrinsic: Extrinsic) {
    this._extrinsic = extrinsic;
    if (extrinsic.attributes.call_id === 'push_command') {
      (extrinsic.attributes.params || []).forEach(i => {
        if (i.name === 'contract_id') {
          this.contractId = i;
        }
        if (i.name === 'payload') {
          this.payload = i;
          this.payload.jsonObject = JSON.parse(i.value);
        }
      });
    }
    if (extrinsic.attributes.call_id === 'register_worker') {
      (extrinsic.attributes.params || []).forEach(i => {
        if (i.name === 'encoded_runtime_info') {
          this.encodedRuntimeInfo = i;
        }
        if (i.name === 'report') {
          this.report = i;
          this.report.jsonObject = JSON.parse(i.value);
        }
        if (i.name === 'signature') {
          this.signature = i;
        }
        if (i.name === 'raw_signing_cert') {
          this.rawSigningCert = i;
        }
      });
    }
    if (extrinsic.attributes.call_id === 'transfer_to_tee') {
      (extrinsic.attributes.params || []).forEach(i => {
        if (i.name === 'amount') {
          this.amount = i;
        }
      });
    }
    if (extrinsic.attributes.call_id === 'transfer_to_chain') {
      (extrinsic.attributes.params || []).forEach(i => {
        if (i.name === 'amount') {
          this.data = i;
        }
      });
    }
    console.log(extrinsic)
  };

  get extrinsic (): Extrinsic {
    return this._extrinsic;
  }

  constructor(
    private location: Location,
    private extrinsicService: ExtrinsicService
  ) { }

  ngOnInit() {
    if (this.extrinsicId) {
       this.extrinsicService.get(this.extrinsicId).subscribe(extrinsic => this.extrinsic = extrinsic);
    }
  }

  goBack(): void {
    this.location.back();
  }

  public formatBalance(balance: number) {
    return balance / Math.pow(10, this.networkTokenDecimals);
  }

  paramName(name: string) {

    if (name === 'dest') {
      name = 'Destination';
    }

    return name;
  }

}
