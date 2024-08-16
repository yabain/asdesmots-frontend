import { Pipe, PipeTransform } from '@angular/core';
import { ArcardeService } from '../../../arcarde/services/arcarde.service';

@Pipe({
  name: 'getParentName'
})
export class GetParentNamePipe implements PipeTransform {
  constructor(private arcardeService: ArcardeService)
  {}

   transform(idParentCompet: string): string {    
    if(idParentCompet){
        const index = this.arcardeService.listUnderCompetion.findIndex((under)=> under._id === idParentCompet);
        if(index != -1){
            return this.arcardeService.listUnderCompetion[index].name;
        }
        return '';
      }

    return '';
  }
}
