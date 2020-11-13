import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { SideBarContentComponent } from './components/side-bar-content/side-bar-content.component';
import { RouterModule } from '@angular/router';
import { AutocompletePipe } from '../../shared/pipes/autocomplete.pipe';

@NgModule({
  declarations: [HeaderComponent, SideBarComponent, SideBarContentComponent, AutocompletePipe],
  imports: [CommonModule, FontAwesomeModule, RouterModule],
  exports: [HeaderComponent, SideBarContentComponent, SideBarComponent, AutocompletePipe],
})
export class SharedModule {}
