/* eslint-disable @typescript-eslint/no-explicit-any */

import { Injectable } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { log } from 'console';
import { BehaviorSubject } from 'rxjs';
import { User } from '../entities/user';
@Injectable( {
       providedIn: 'root',
} )
export class PaginationService
{


       newData = false
       start = 0;
       size = 12;

       tableauUSerGet = []
       tableauUSerToshow: any[] = []
       tableauUSerToshowConvert: any
       pageSize = 12;
       limit = 12;
       skip = 0;
       limitGeneral = 12;
       skipGeneral = 0;

       tablePageSize: BehaviorSubject<tablePageSize> =
              new BehaviorSubject<tablePageSize>( { skip: this.skip, limit: this.limit, pageSize: this.pageSize } );

       calculatePageSize: BehaviorSubject<pageSizeCal> =
              new BehaviorSubject<pageSizeCal>( {
                     totalData: 0,
                     pageSize: 12,
                     tableData: [],
                     tableData2: [],
                     serialNumberArray: [],
              } );
       changePagesize: BehaviorSubject<pageSize> = new BehaviorSubject<pageSize>( {
              pageSize: this.pageSize,
       } );

       paginateArray( array: any[], start: number, size: number )
       {
              start = Number( start );
              size = Number( size );
              // Vérifie si le point de départ est valide
              if ( start < 0 || start >= array.length )
              {
                     this.tableauUSerToshow = [];
              }


              let total = start + size
              for ( let i = start; i < total; i++ )
              {


                     console.log( 'depbut', i, 'fin', total )

              }
              // Utilise slice pour retourner la portion du tableau désirée
              this.tableauUSerToshow = array.slice( start, total );
              // console.log( 'user get', this.tableauUSerGet )
              // console.log( 'start', start, 'taille', size )
              // console.log( 'valeur a retourner', this.tableauUSerToshow );
       }




       updateTab()
       {

              this.tableauUSerToshow = []
              console.log( 'paggginationnnnnnnnnnmnnnnnnnnnnnnnnnnnn', this.start )
              this.paginateArray( this.tableauUSerGet, this.start, this.size )
       }

}
export interface pageSelection
{
       skip: number;
       limit: number;
}
export interface tablePageSize
{
       skip: number;
       limit: number;
       pageSize: number;
}
export interface pageSizeCal
{
       totalData: number;
       pageSize: number;
       tableData: Array<any>;
       tableData2: Array<any>;
       serialNumberArray: Array<number>;
}



export interface pageSize
{
       pageSize: number;
}
