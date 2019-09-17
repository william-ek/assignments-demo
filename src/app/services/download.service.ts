import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  constructor() { }

  downloadFile(content: string, fileName: string) {
    this.saveToFileSystem(content, fileName);
  }

  saveToFileSystem(fileData: any, fileName: string) {
    const dateNow = new Date().toISOString();
    const filename = fileName;
    const blob = new Blob([fileData], { type: 'text/plain' });
    saveAs(blob, filename);
  }
}
