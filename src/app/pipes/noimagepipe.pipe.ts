import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noimagepipe'
})
export class NoimagepipePipe implements PipeTransform {

  transform(image: any[]): string {

    if (!image) {
      return 'assets/img/noimage.png'
    } if (image.length > 0) {
      return image[0].url
    } else {
      return 'assets/img/noimage.png'
    }
  }

}
