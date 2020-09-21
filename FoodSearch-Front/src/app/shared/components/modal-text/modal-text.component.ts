import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-text',
  templateUrl: './modal-text.component.html',
  styleUrls: ['./modal-text.component.scss']
})
export class ModalTextComponent implements OnInit {


  public title : string;
  public text : string;
  public button : string;


  constructor(@Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
      this.title = this.data.title;
      this.text = this.data.text;
      this.button = this.data.button;

  }

}
