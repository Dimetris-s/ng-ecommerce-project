import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { AccordionModule } from 'primeng/accordion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './shared/nav/nav.component';
import { ProductsModule } from '@dmtrsprod/products';
import { UiModule } from '@dmtrsprod/ui';

const routes: Routes = [
    {
        path: '',
        component: HomePageComponent
    },
    {
        path: 'products',
        component: ProductListComponent
    }
];

@NgModule({
    declarations: [
        AppComponent,
        HomePageComponent,
        ProductListComponent,
        HeaderComponent,
        FooterComponent,
        NavComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes),
        AccordionModule,
        BrowserAnimationsModule,
        ProductsModule,
        UiModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
