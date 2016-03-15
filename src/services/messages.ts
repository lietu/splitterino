export class Message {
  content: String;
  type: String;
  id: String;
  element: HTMLElement;
  removed: boolean;

  constructor(content: String, type: String = "info", autohide: Number = 5000) {
    this.content = content;
    this.type = type;
    this.id = messageManager.add(this);
    this.removed = false;

    setTimeout(this.dismiss.bind(this), autohide);
  }

  public dismiss() {
    if (this.removed) {
      return;
    }

    this.element.classList.add("removing");

    this.element.addEventListener("transitionend", function () {
      messageManager.remove(this.id);
      this.removed = true;
    }.bind(this));
  }
}

class MessageManager {
  nextId: number;
  messages: Message[];

  constructor() {
    console.log("MessageManager.construct");
    this.nextId = 1;
    this.messages = [];
  }

  public add(message: Message): String {
    let id = `message-${this.nextId}`;

    this.nextId += 1;
    this.messages.push(message);

    return id;
  }

  public remove(id: String) {
    for (let i = 0, count = this.messages.length; i < count; i += 1) {
      if (this.messages[i].id === id) {
        this.messages.splice(i, 1);
        return;
      }
    }
  }
}

let messageManager: MessageManager = new MessageManager();

(<any>window).messageManager = messageManager;

export {
  messageManager
}
