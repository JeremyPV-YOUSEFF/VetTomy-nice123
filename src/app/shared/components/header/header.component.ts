import { Component, OnInit } from '@angular/core';
import { IMenuIcon, MenuIcon } from './menu-mockup';
import { IMenu, Menu } from './mockup';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgClass } from '@angular/common';
import { AuthenticationService } from '../../services/authentication.service';
import { routes } from '../../../app.routes';
import publicRouting from '../../../public/public-routing';

@Component({
  selector: 'shared-header',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  styles: ``
})
export class HeaderComponent implements OnInit {

  public iconMenus : IMenuIcon[] = MenuIcon
  public Menus : IMenu[] = Menu
  public menuItems = publicRouting
    .map(x => x.children ?? [])
    .flat() /* Unir los arreglos */
    .filter( route => route && route.path)
    .filter( route => !route.path?.includes(':'))
    .filter( route => !['review','shoppingCart','checkout','**'].some(x => route.path?.includes(x)) )

  constructor(
    private auth :  AuthenticationService
  ) {}

  ngOnInit(): void {
    this.recieveData
  }

  get recieveData() {
    return this.auth.profileData
  }

  onChangePage():void{
    window.scrollTo(0,0)
  }

}
