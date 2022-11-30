import { Router, RouterModule, Routes} from '@angular/router';
import { NgModule } from '@angular/core';
import { ArticulosComponent } from './articulos/articulos.component';
import { InicioComponent } from './inicio/inicio.component';
import { ArticuloDetalleComponent } from './articulo-detalle/articulo-detalle.component';
import { LoginComponent } from './login/login.component';

const rutas : Routes = [
    {
        path: 'articulos', 
        component: ArticulosComponent
    },
    {
        path: 'inicio', 
        component: InicioComponent
    },
    {
        path: 'detalle/:id',
        component: ArticuloDetalleComponent 
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        redirectTo: '/articulos', 
        pathMatch: 'full'
    }
]

@NgModule({
    imports: [ RouterModule.forRoot(rutas)], 
    exports: [RouterModule]
})
export class AppRoutingModule {}