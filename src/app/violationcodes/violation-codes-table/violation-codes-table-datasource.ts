import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface ViolationCodesTableItem {
  category: string;
  code: string;
  codeSections: string;
  legacyCode: string;
  longDescription: string;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: ViolationCodesTableItem[] = [
  {
    'category': 'STRUCTURAL',
    'code': 'PORCH_GUARDRAIL',
    'codeSections': '1502',
    'legacyCode': 'RSGR4',
    'longDescription': 'The porch/deck guardrail is structurally inadequate. Railings shall be designed and constructed to withstand a horizontal force of 20 pounds per lineal foot applied at the top of the railing. Reconstruct the guardrail to withstand the required horizontal force. [California Code of Regulations, Title 25, Section 1502]'

  },

];

/**
 * Data source for the ViolationCodesTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class ViolationCodesTableDataSource extends DataSource<ViolationCodesTableItem> {
  data: ViolationCodesTableItem[] = EXAMPLE_DATA;

  constructor(private paginator: MatPaginator, private sort: MatSort) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<ViolationCodesTableItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    // Set the paginator's length
    this.paginator.length = this.data.length;

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: ViolationCodesTableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: ViolationCodesTableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'category': return compare(a.category, b.category, isAsc);
        case 'code': return compare(+a.code, +b.code, isAsc);
        case 'codeSections': return compare(+a.codeSections, +b.codeSections, isAsc);
        case 'legacyCode': return compare(+a.legacyCode, +b.legacyCode, isAsc);
        case 'longDescription': return compare(+a.longDescription, +b.longDescription, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
