import { Injectable } from '@angular/core';
import { PhotoFireService } from './photo-fire.service';
import { Camera as CapacitorCamera, CameraResultType, CameraSource } from '@capacitor/camera';
import { map } from 'rxjs/operators';
import { UserPhoto } from 'src/app/interface/user-photo';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  public photo: any;

  constructor(private photoFire: PhotoFireService) { }

  public async addNewToGallery(uid: any) {
    // Take a photo
    const image = await CapacitorCamera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });

    // Convert the photo to base64 and save it to the DB
    this.readAsBase64(image.webPath)
      .then(result => {
        this.photoFire.addUserPhoto(uid, result);
      })
      .catch(error => {
        console.error(error);
      });
  }

  // Get photo
  public async getUserPhoto(uid: any) {
    this.photoFire.getUserPhoto(uid).snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const userPhoto: UserPhoto = {
            $key: a.key,
            data: String(a.payload.val())
          };

          return userPhoto;
        })
      )
    ).subscribe(userPhoto => {
      if (userPhoto.length) {
        this.photoFire.userPhoto = userPhoto[0];
        this.photo = userPhoto[0].data;
      }
    });
  }

  deleteUserPhoto(uid: any) {
    this.photoFire.deleteUserPhoto(uid,this.photoFire.userPhoto.$key);
  }

  private async readAsBase64(webviewPath) {
    // Fetch the photo, read as a blob, then convert to base64 format
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const response = await fetch(webviewPath!);
    const blob = await response.blob();

    return await this.convertBlobToBase64(blob) as string;
  }

  private convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });
}
