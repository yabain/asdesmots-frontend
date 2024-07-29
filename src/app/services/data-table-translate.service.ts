import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class DataTableTranslateService {
  
  dtOptions: any = {};
  
  constructor(private translate: TranslateService) {
    this.translate.onLangChange.subscribe(() => {
      this.updateDataTableLanguage();
    });
    this.updateDataTableLanguage();
  }
  updateDataTableLanguage() {
    this.translate.get('DATA_TABLE').subscribe(translations => {
      this.dtOptions = {
        language: {
          search: translations.SEARCH,
          lengthMenu: translations.LENGTH_MENU,
          zeroRecords: translations.ZERO_RECORDS,
          info: translations.INFO,
          infoEmpty: translations.INFO_EMPTY,
          infoFiltered: translations.INFO_FILTERED,
          loadingRecords: translations.LOADING_RECORDS,
          processing: translations.PROCESSING,
          paginate: {
            first: translations.FIRST,
            last: translations.LAST,
            next: translations.NEXT,
            previous: translations.PREVIOUS
          }
        }
      }
    })
  }
}