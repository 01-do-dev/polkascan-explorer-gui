import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { Extrinsic } from 'src/app/classes/extrinsic.class';
import {Location} from '@angular/common';

@Component({
  selector: 'tr[app-extrinsic-list-item].phala',
  templateUrl: './extrinsic-list-item.phala.component.html',
  styleUrls: ['./extrinsic-list-item.phala.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class Phala__ExtrinsicListItemComponent implements OnInit {

  @Input() extrinsic: Extrinsic = null;
  @Input() networkURLPrefix: string = null;

  constructor(
    private location: Location,
  ) { }

  ngOnInit() {
  }

  goBack(): void {
    this.location.back();
  }

}
