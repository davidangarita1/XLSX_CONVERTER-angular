import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const JSON_EXTENSION = '.json';
const JSON_TYPE = 'application/json';

@Injectable({
    providedIn: 'root'
})
export class JsonService {

    constructor() { }

    public exportAsJsonFile(binarystr, jsonFileName: string): void {
        const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });
        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws);        console.log(data);
        this.saveAsJsonFile(JSON.stringify(data), jsonFileName);
    }
    private saveAsJsonFile(buffer: any, fileName: string): void {
        const data: Blob = new Blob([buffer], { type: JSON_TYPE });
        FileSaver.saveAs(data, fileName + '_' + new Date().getTime() + JSON_EXTENSION);
    }
}
