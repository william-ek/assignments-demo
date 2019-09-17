import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { ViolationCodesTableDataSource } from './violation-codes-table-datasource';
import violations from '../../../assets/jsonobjects/violationCodes.json';
import { ViolationCodesTableItem } from 'src/app/models/violation-codes-table-item';

@Component({
  selector: 'app-violation-codes-table',
  templateUrl: './violation-codes-table.component.html',
  styleUrls: ['./violation-codes-table.component.css']
})
export class ViolationCodesTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: ViolationCodesTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['category', 'code', 'codeSections', 'legacyCode', 'longDescription'];

  ngOnInit() {
    this.dataSource = new ViolationCodesTableDataSource(this.paginator, this.sort);

    try {
      violations.violations.forEach(item => {
        const violation = new ViolationCodesTableItem(item.category, item.code, item.codeSections, item.legacyCode, item.longDescription);
        this.dataSource.data.push(violation);
      });
    } catch (e) {}
  }
}
