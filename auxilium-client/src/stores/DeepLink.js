import { observable, decorate } from "mobx";

class DeepLink {
  idChosen;
}

decorate(DeepLink, {
  idChosen: observable
});

export default new DeepLink();
