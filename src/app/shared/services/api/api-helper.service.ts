import { Injectable } from '@angular/core';

import { saveAs } from 'file-saver/FileSaver';
import mime from 'mime-types';
import * as _ from 'lodash';

import { ApiHelper } from '../../helpers/api-helper';
import { environment } from '../../../../environments/environment';
import { ApiService } from './api.service';

@Injectable()
export class ApiHelperService {

  static getApiUrl(path: string) {
    return this.generateUrlWithPath(environment.apiBaseUrl, path);
  }

  static getSpaApiUrl(path: string) {
    return this.generateUrlWithPath(environment.apiSpaBaseUrl, path);
  }

  static getDomainUrl(path: string) {
    return this.generateUrlWithPath(environment.domainUrl, path);
  }

  static generateUrlWithPath(url: string, path: string) {
    return `${_.trimEnd(url, '/')}/${_.trim(path, '/')}`;
  }

  static downloadFile(apiService: ApiService, downloadUrl: string, filename?: string) {
    apiService.download(downloadUrl).subscribe(
      (blob) => {
        if (!filename) {
          filename = `download_${Math.floor(Date.now() / 1000)}.${mime.extension(blob.type)}`;
        }
        saveAs(blob, filename);
      },
      (err) => {
        ApiHelper.displayGenericErrorMessage(err, 'Unknown error occurred trying to download the file.');
      }
    );
  }
}
