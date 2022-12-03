import { Router, RouterModule, Routes} from '@angular/router';
import { NgModule } from '@angular/core';
import { ArticulosComponent } from './articulos/articulos.component';
import { InicioComponent } from './inicio/inicio.component';
import { ArticuloDetalleComponent } from './articulo-detalle/articulo-detalle.component';
import { LoginComponent } from './login/login.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { AdminComponent } from './admin/admin.component';
import { RegisterComponent } from './register/register.component';


const rutas : Routes = [
    {
        path: 'articulos', 
        component: ArticulosComponent
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
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'categoria/:categoria',
        component: CategoriasComponent
    },
  
    {
        path: 'admin',
        component: AdminComponent
    },
]

@NgModule({
    imports: [ RouterModule.forRoot(rutas)], 
    exports: [RouterModule]
})
export class AppRoutingModule {}