import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'studentTitle'
})

export class StudentTitlePipe implements PipeTransform {
  transform(value: string, gender: string): string {
    if (gender == "M") {
      return 'Mr.' + value;
    }
    else if (gender == "F") {
      return 'Ms.' + value;
    }
    else {
      return 'Mx.' + value;
    }
  }

}
