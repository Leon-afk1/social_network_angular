import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrl: './image-upload.component.css'
})
export class ImageUploadComponent implements OnInit {
  @Input() imageType: string;
  imagePath: string = "http://localhost:4200/assets/";
  image = new FormData();

  constructor(private http: HttpClient){
    this.imagePath.concat(this.imageType);
  }

  ngOnInit(): void {
  }

  onFileChange(event: any){
    if(event.target.files.length > 0){
      const file = event.target.files[0];
      this.image.append('file',file);
    }
  }
  uploadImage(){
    this.http.post<File>(this.imagePath,this.image);
  }
}
