import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-park',
  templateUrl: './park.component.html',
  styleUrls: ['./park.component.css']
})
export class ParkComponent implements OnInit {

  @Input() park: any;

  constructor() { }

  ngOnInit() {
  }

}
