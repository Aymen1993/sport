import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gender'
})
export class GenderPipe implements PipeTransform {

  transform(gender:any): any {
    let result="";
    if (gender==0) {
      result="Mr";
    } else if (gender==1){
      result="Mme";
    }
    return result;
  }
}
