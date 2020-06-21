import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { Extrinsic } from 'src/app/classes/extrinsic.class';
import {Location} from '@angular/common';

@Component({
  selector: 'tr[app-extrinsic-list-item]',
  templateUrl: './extrinsic-list-item.component.html',
  styleUrls: ['./extrinsic-list-item.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ExtrinsicListItemComponent implements OnInit {

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
