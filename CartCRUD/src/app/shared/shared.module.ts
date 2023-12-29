import { NgModule } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
@NgModule({
    declarations: [
        HeaderComponent,
    ],
    imports: [
        MatCardModule,
        MatIconModule,
        MatButtonModule,
        MatBadgeModule
    ],
    exports: [
        HeaderComponent,
    ],
    providers: [],
})
export class SharedModule { }
