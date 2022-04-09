import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-load-file-button',
  templateUrl: './load-file-button.component.html',
  styleUrls: ['./load-file-button.component.css']
})
export class LoadFileButtonComponent implements OnInit {

  selectedFile: File = null;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
    console.log("Loaded file");
    console.log(this.selectedFile);
    this.onUpload();
  }


  onUpload() {
    const fd = new FormData();
    fd.append('config', this.selectedFile, this.selectedFile.name);
    // TODO: add backend endpoint
    /* 
    this.http.post('localhost:8080/postconfig', fd, {
      reportProgress: true,
      observe: 'events'
    })
    .subscribe(res => {
      console.log(res)
    })
    */
    console.log("Upload successful")
  }


}
