import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ChartService } from '../services/chart.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-load-file-button',
  templateUrl: './load-file-button.component.html',
  styleUrls: ['./load-file-button.component.css']
})
export class LoadFileButtonComponent implements OnInit {

  constructor(private http: HttpClient, private dataService: DataService, private chartService: ChartService) { }

  ngOnInit(): void {
  }

  onFileSelected(event: any) {
    const selectedFile = <File> event.target.files[0];
    let fileReader = new FileReader();
    var postParameter;
    fileReader.onload = (e) => {
      console.log(fileReader.result);
      postParameter = JSON.parse(<string> fileReader.result);
      this.dataService.postConfigFile(postParameter).subscribe(
        _ => this.dataService.getChartsData()
          .subscribe(data => { this.chartService.notifyAboutLoadedData(data) }));;
    }
    fileReader.readAsText(selectedFile);
    
    console.log(postParameter);

    
  }


}
