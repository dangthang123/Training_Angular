import { NgModule } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';

import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
    ],
    imports: [
        MatCardModule,
        MatIconModule,
        MatButtonModule,
        MatBadgeModule,
        MatMenuModule,
        RouterModule,
        CommonModule
    ],
    exports: [
        HeaderComponent,
        FooterComponent
    ],
    providers: [],
})
export class SharedModule { }
