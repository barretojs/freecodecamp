import {
  NestInterceptor,
  Injectable,
  FileInterceptor,
  ExecutionContext,
} from '@nestjs/common';
import * as multer from 'multer';
import { Observable } from 'rxjs';

@Injectable()
export class FileMetadataInterceptor implements NestInterceptor {
  constructor() {}

  async intercept(context: ExecutionContext, call$: Observable<any>) {
    const fileIntConst = FileInterceptor('upfile', {
      storage: multer.diskStorage({
        destination: function(req, file, cb) {
          cb(null, `./`);
        },
        filename: function(req, file, cb) {
          cb(null, `elon.png`);
        },
      }),
    });

    const fileInt = new fileIntConst();

    return fileInt.intercept(context, call$);
  }
}
