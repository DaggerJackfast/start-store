import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SupportChatService } from "../support-chat.service";

@Component({
  selector: "app-support-chat",
  templateUrl: "./support-chat.component.html",
  styleUrls: ["./support-chat.component.css"]
})
export class SupportChatComponent implements OnInit {
  messages: string[];
  supportChatForm: FormGroup;
  constructor(
    private supportChatService: SupportChatService,
    private formBuilder: FormBuilder
  ) {
    this.messages = [];
    this.supportChatForm = this.formBuilder.group({
      message: ["", [Validators.required]]
    });
    this.supportChatService.onConnect();
  }
  onSubmit(supportFormValue: any) {
    const { message } = supportFormValue;
    this.supportChatService.sendMessage(message);
    this.reset();
  }
  private reset() {
    this.supportChatForm.reset();
  }
  ngOnInit() {
    this.supportChatService.getAllMessages().subscribe((messages: string[]) => {
      this.messages = messages;
    });
    this.supportChatService.listenMessage().subscribe((message: string) => {
      this.messages.push(message);
    });
  }
  ngOnDestroy() {
    this.supportChatService.reset();
  }
}
