import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UploadWidgetConfig, UploadWidgetOnUpdateEvent, UploadWidgetResult } from '@bytescale/upload-widget';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrl: './image-upload.component.css'
})
export class ImageUploadComponent implements OnInit {
  @Input() imageURL: string | undefined;
  @Output() imageURLOutput = new EventEmitter<string>();
  
  options: UploadWidgetConfig = {
    apiKey: "public_12a1z1QR3LBQJp5gDt4159oFDHWD",
    maxFileCount: 1
  };

  onComplete = (files: UploadWidgetResult[]) => {
    this.imageURL = files[0]?.fileUrl;
    this.imageURLOutput.emit(this.imageURL);
  };

  constructor(){}

  ngOnInit(): void {
  }
}
