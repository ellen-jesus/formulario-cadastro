import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  constructor() { }

  // Método para exibir/ocultar o sidebar ao clicar no botão de login
  toggleSidebar() {
    this.sidenav.toggle();
  }
}
