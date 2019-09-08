import { observable, decorate } from "mobx";

class ImageUpload {
  imageName;
}

decorate(ImageUpload, {
  imageName: observable
});

export default new ImageUpload();
