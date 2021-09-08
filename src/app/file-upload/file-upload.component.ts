import { Component, OnInit } from '@angular/core';
import { ExcelService } from '../services/excel.service';
import { JsonService } from '../services/json.service';

@Component({
    selector: 'app-file-upload',
    templateUrl: './file-upload.component.html',
    styleUrls: ['./file-upload.component.scss']
})

export class FileUploadComponent implements OnInit {

    // Variable to store shortLink from api response
    shortLink: string = "";
    loading: boolean = false; // Flag variable
    file_json: File = null; // Variable to store file
    file_xlsx: File = null;
    file_Name_json: string = "";
    file_Name_xlsx: string = "";
    fileUJ: any;
    fileUX: any;
    buttonEN: boolean = false;

    // Inject service
    constructor(
      private excelService: ExcelService,
      private jsonService: JsonService
      ) { }

    ngOnInit(): void {
    }

    // On file Select
    uploadJson(event) {
        if (event.target.files.length > 0) {
            this.file_json = event.target.files[0];
            this.file_Name_json = this.file_json.name.split('.')[0];
            this.buttonEN = true;
        } else {
            this.buttonEN = false;
        }
    }

    uploadXlsx(event) {
        if (event.target.files.length > 0) {
            this.file_xlsx = event.target.files[0];
            this.file_Name_xlsx = this.file_xlsx.name.split('.')[0];
            this.buttonEN = true;
        } else {
            this.buttonEN = false;
        }
  }

    createExcel() {
        this.loading = true;
        const fileReader = new FileReader();
        fileReader.readAsText(this.file_json, "UTF-8");
        fileReader.onload = () => {
            this.fileUJ = JSON.parse(JSON.stringify(fileReader.result));
            this.excelService.exportAsExcelFile(JSON.parse(this.fileUJ), this.file_Name_json);
            this.loading = false;
        }
        fileReader.onerror = (error) => {
            console.log(error);
        }
    }
    createJSON() {
        this.loading = true;
        const fileReader = new FileReader();
        fileReader.readAsBinaryString(this.file_xlsx);
        fileReader.onload = (e: any) => {
            const binarystr: string = e.target.result;
            this.jsonService.exportAsJsonFile(binarystr, this.file_Name_xlsx);
            this.loading = false;
        }
        fileReader.onerror = (error) => {
            console.log(error);
        }
    }
}
