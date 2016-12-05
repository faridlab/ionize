import { Injectable } from '@angular/core';
import {Model} from './model';
import 'rxjs/add/operator/map';

// FIXME: this line below is another model sample, remove if you do not need this
@Injectable()
export class ExampleModel extends Model {
  id: number;
  surah: number;
  ayah: number;
  verse: string;
  type: string;
  translation: string;
  transliteration: string;
}
