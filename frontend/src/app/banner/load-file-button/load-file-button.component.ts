import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ChartService } from '../../services/chart.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-load-file-button',
  templateUrl: './load-file-button.component.html',
  styleUrls: ['./load-file-button.component.css']
})
export class LoadFileButtonComponent implements OnInit {

  @ViewChild('fileInput')
  fileInput!: ElementRef;

  constructor(private http: HttpClient, private dataService: DataService, private chartService: ChartService, private router: Router) {
  }

  ngOnInit(): void {
  }

  onFileSelected(event: any) {
    const selectedFile = <File>event.target.files[0];
    let fileReader = new FileReader();
    let postParameter;
    fileReader.onload = () => {
      postParameter = JSON.parse(<string>fileReader.result);
      this.dataService.postConfigFile(postParameter).subscribe(
        (data) => this.chartService.notifyAboutLoadedData(data),
        (error) => {
          console.log(error); alert(error.message); this.router.navigate(
            ['fileError'])
        },
      ).add(() => {
        this.fileInput.nativeElement.value = "";
      });
    }
    fileReader.readAsText(selectedFile);
  }
}
