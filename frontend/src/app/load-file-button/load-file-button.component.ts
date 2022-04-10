import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-load-file-button',
  templateUrl: './load-file-button.component.html',
  styleUrls: ['./load-file-button.component.css']
})
export class LoadFileButtonComponent implements OnInit {

  constructor(private http: HttpClient, private dataService: DataService) { }

  ngOnInit(): void {
  }

  onFileSelected(event: any) {
    const selectedFile = <File>event.target.files[0];
    this.dataService.postConfigFile(selectedFile);
  }


}
