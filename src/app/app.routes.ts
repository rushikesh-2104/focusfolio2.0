import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Gallery } from './features/gallery/gallery';
import { About } from './features/about/about';

export const routes: Routes = [
    {path:"",component:Home},
    {path:"gallery",component:Gallery},
    {path:"about",component:About}
];
