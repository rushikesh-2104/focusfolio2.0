import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Gallery } from './features/gallery/gallery';

export const routes: Routes = [
    {path:"",component:Home},
    {path:"gallery",component:Gallery}
];
