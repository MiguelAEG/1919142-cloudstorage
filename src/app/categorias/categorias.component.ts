import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AgregarCarritoService } from '../agregar-carrito.service';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';

import { Articulo } from '../articulo.model';


import { AngularFireStorage } from '@angular/fire/compat/storage';
@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

   observaVar = of(1, 2, 3); //Todos los valores por los que pasa esta variable

  obserVaCambios  = {
    next: (x: number) => {
      console.log('Cambios en x ' +  x);
    }
  }



  categoria: string = this.ruta.snapshot.params['categoria'];


  //private articulosCollection: AngularFirestoreCollection<Articulo>;
  //arts: Observable<Articulo[]>; 


  private coleccionFirebase: AngularFirestoreCollection<Articulo>;
  articulosFirebase: Observable<Articulo[]>;
  articuloDoc: any;


  //private test: AngularFirestoreCollection<Articulo>;

  constructor(
    private router: Router,
    private carritoService : AgregarCarritoService,
    private aFirestore: AngularFirestore,
    private aFireStorage: AngularFireStorage,
    private ruta: ActivatedRoute
  ) {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false; 
    this.coleccionFirebase = this.aFirestore.collection<Articulo>('articulos');
    this.articulosFirebase = this.coleccionFirebase.valueChanges({idField: 'id'});
    this.articulosFirebase.subscribe(res => {

      console.log(res);

    })
    this.articuloDoc = this.aFirestore.doc<Articulo>('/articulos/1');
    
    //this.articulosCollection = this.af.collection<Articulo>('articulos');
    //this.arts = this.articulosCollection.valueChanges();


    const ref = this.aFireStorage.storage;
  }

  articulosColeccionFb: Articulo[] = [];
  

  ngOnInit(): void {
        console.log(this.categoria);


    /* console.log(this.coleccionFirebase.valueChanges({idField: 'id'}).subscribe(res => {
      this.articulosColeccionFb = res;
    })); */
   
  }

  ngOnDestroy() {
    this.articulosColeccionFb = [];
  }

  cargarFotos(){

  }


  porcentaje$ : Observable<number>;
  progress : number | undefined;
  subirFoto(event: any){
    //Sube foto del input de File
    const archivo: File = event.target.files[0];
    console.log(archivo.name);

    const pathArchivo = `${archivo.name}` // ${this.articulo} // necesitamos un folder por articulo


    const task = this.aFireStorage.upload(pathArchivo, archivo);

     task.percentageChanges().subscribe(res => {
      this.progress = res;
     });

    //this.progress = porcentaje$;

   /*  setInterval(() => {
      this.progress += 0.01;
      if (this.progress > 1) {
        setTimeout(() => {
          this.progress = 0;
        }, 1000);
      }
    }, 50); */

    task.snapshotChanges().subscribe();
  }

 
  

  carro: number = 0;

  @Output() agregarAcarrito =  new EventEmitter();

  agregarCarrito(articulo : any){
    this.carro++;
    this.agregarAcarrito.emit(this.carro);

    this.carritoService.testService();
  }
}
