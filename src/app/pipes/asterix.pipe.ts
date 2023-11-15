import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'asterix'
})
export class AsterixPipe implements PipeTransform {
  transform(ch: string) {
    let result = "";
    let T = ['a', 'e', 'y', 'u', 'i', 'o'];
    for (let i = 0; i < ch.length; i++) {
      let intermdiate = ch[i];
      for (let j = 0; j < T.length; j++) {
        if (ch[i].toLowerCase() == T[j]) {
          intermdiate = "*";
          break;
        }
      }
      result += intermdiate;
    }
    return result;
  }

}
