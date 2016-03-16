export class Confirmer {
  visible: boolean;
  message: String;
  resolve: () => void;
  reject: () => void;
  listenToGlobalEvents: boolean;

  constructor() {
    this.listenToGlobalEvents = false;
    this.setupGlobaListeners();
    this.reset();
  }

  public ask(message: String): Promise<void> {
    this.reset();
    this.message = message;
    return new Promise<void>(this.promiseHandler.bind(this))
  }

  public promiseHandler(resolve: () => void, reject: () => void) {
    this.resolve = resolve;
    this.reject = reject;
    this.showDialog();
  }

  public onYes() {
    this.hideDialog();
    this.resolve();
  }

  public onNo() {
    this.hideDialog();
    this.reject();
  }

  private reset() {
    this.visible = false;
    this.message = "";
    this.resolve = undefined;
    this.reject = undefined;
  }

  private showDialog() {
    this.visible = true;
    this.enableGlobalListeners();
  }

  private hideDialog() {
    this.visible = false;
    this.disableGlobalListeners();
  }

  private setupGlobaListeners() {
    window.addEventListener("keyup", this.onKeyUp.bind(this), true);
  }

  private enableGlobalListeners() {
    this.listenToGlobalEvents = true;
  }

  private disableGlobalListeners() {
    this.listenToGlobalEvents = false;
  }

  private onKeyUp(event: KeyboardEvent) {
    if (this.listenToGlobalEvents) {
      if (event.keyCode === 13) { // Enter
        this.onYes();
      } else if (event.keyCode === 27) { // ESC
        this.onNo();
      }
    }
  }

}

let confirmer = new Confirmer();

export {
  confirmer
}
