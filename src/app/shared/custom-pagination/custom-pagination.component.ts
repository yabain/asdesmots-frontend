import { Component } from '@angular/core';
import { pageSelection, pageSize, pageSizeCal, PaginationService } from './pagination.service';

@Component( {
       selector: 'app-custom-pagination',
       templateUrl: './custom-pagination.component.html',
       styleUrls: [ './custom-pagination.component.scss' ],
} )
export class CustomPaginationComponent
{
       public pageSize = 12;

       public tableData: Array<string> = [];
       public totalData = 0;
       public skip = 0;
       public limit: number = this.pageSize;
       public currentPage = 1;
       public totalPages = 0;
       public pageNumberArray: Array<number> = [];
       public pageSelection: Array<pageSelection> = [];
       public serialNumberArray: Array<number> = [];


       constructor ( private pagination: PaginationService )
       {
              this.pagination.calculatePageSize.subscribe( ( res: pageSizeCal ) =>
              {
                     this.calculateTotalPages( res.totalData, res.pageSize, res.tableData );
                     this.pageSize = res.pageSize;
              } );
              this.pagination.changePagesize.subscribe( ( res: pageSize ) =>
              {
                     this.changePageSize( res.pageSize );
              } );
       }

       public getMoreData( event: string ): void
       {
              if ( event === 'next' && this.currentPage < this.totalPages )
              {
                     this.currentPage++;
              } else if ( event === 'previous' && this.currentPage > 1 )
              {
                     this.currentPage--;
              }
              // this.updatePagination();
              this.moveToPage( this.currentPage )
       }

       public moveToPage( pageNumber: number ): void
       {
              this.currentPage = pageNumber;
              this.pagination.start = ( pageNumber - 1 ) * this.pagination.size;

              this.pagination.size = this.pageSize
              this.pagination.updateTab()
       }

       public changePageSize( pageSize: number ): void
       {
              this.currentPage = this.currentPage;
              this.pageSize = pageSize

              this.pagination.start = ( this.currentPage - 1 ) * this.pageSize;
              this.pagination.size = this.pageSize
              this.pagination.updateTab()
              this.calculateTotalPages( this.pagination.tableauUSerGet.length, this.pageSize, [] )

       }

       public calculateTotalPages( totalData: number, pageSize: number, tableData: Array<string> ): void
       {
              this.tableData = tableData;
              this.totalData = totalData;
              this.totalPages = Math.ceil( totalData / pageSize );
              this.pageNumberArray = Array.from( { length: this.totalPages }, ( v, i ) => i + 1 );
              this.serialNumberArray = Array.from( { length: totalData }, ( v, i ) => i + 1 );

              this.calculatePageSelection(); // Recalculer les sélections de pages
       }

       private calculatePageSelection(): void
       {
              this.pageSelection = Array.from( { length: this.totalPages }, ( v, i ) => ( {
                     skip: i * this.pageSize,
                     limit: this.pageSize, // La limite devrait être pageSize
              } ) );
       }
}
