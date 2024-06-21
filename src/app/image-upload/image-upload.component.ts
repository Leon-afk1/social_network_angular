import { Component, Input, OnInit } from '@angular/core';
import { UploadWidgetConfig, UploadWidgetOnUpdateEvent, UploadWidgetResult } from '@bytescale/upload-widget';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrl: './image-upload.component.css'
})
export class ImageUploadComponent implements OnInit {
  @Input() imageURL: string | undefined;
  
  options: UploadWidgetConfig = {
    apiKey: "public_12a1z1QR3LBQJp5gDt4159oFDHWD",
    maxFileCount: 1
  };
  
  onComplete = (files: UploadWidgetResult[]) => {
    this.imageURL = files[0]?.fileUrl;
  };

  constructor(){}

  ngOnInit(): void {
  }
}
