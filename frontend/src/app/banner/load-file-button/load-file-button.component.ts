import {HttpClient} from '@angular/common/http';
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ChartService} from '../../services/chart.service';
import {DataService} from '../../services/data.service';
import {Subscription, interval} from 'rxjs'; 
@Component({
  selector: 'app-load-file-button',
  templateUrl: './load-file-button.component.html',
  styleUrls: ['./load-file-button.component.css']
})
export class LoadFileButtonComponent implements OnInit {

  @ViewChild('fileInput')
  fileInput!: ElementRef;

  constructor(private http: HttpClient, private dataService: DataService, private chartService: ChartService) {
    
  }
  
  subscription: Subscription = new Subscription;  
  source = interval(10000);
  
  ngOnInit(): void {
    this.subscription = this.source.subscribe(val => this.loadFileConfig());
    this.loadFileConfig();
  }

  loadFileConfig() {
    console.log("load config");
    let config = this.dataService.getStoredConfig();
    if(config) {
      this.dataService.postConfigFile(config).subscribe(
        (data) => this.chartService.notifyAboutLoadedData(data),
        (error) => alert(error.message),
      ).add(() => {
        this.fileInput.nativeElement.value = "";
      });
    } 
  }

  onFileSelected(event: any) {
    const selectedFile = <File>event.target.files[0];
    let fileReader = new FileReader();
    let postParameter;
    fileReader.onload = () => {
      postParameter = JSON.parse(<string>fileReader.result);
      this.dataService.postConfigFile(postParameter).subscribe(
        (data) => this.chartService.notifyAboutLoadedData(data),
        (error) => alert(error.message),
      ).add(() => {
        this.fileInput.nativeElement.value = "";
      });
    }
    fileReader.readAsText(selectedFile);
  }
}
