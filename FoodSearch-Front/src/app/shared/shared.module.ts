import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ModalTextComponent } from './components/modal-text/modal-text.component';
import { MaterialModule } from './modules/material/material.module';


@NgModule({
 imports:      [ CommonModule, MaterialModule ],
 declarations: [ ModalTextComponent ],
 exports:      [ ModalTextComponent, MaterialModule ]
})
export class SharedModule { }