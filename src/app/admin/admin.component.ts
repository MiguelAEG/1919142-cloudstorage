import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Articulo } from '../articulo.model';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { SafeUrl} from "@angular/platform-browser";
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  private coleccionFirebase: AngularFirestoreCollection<Articulo>;
  articulosFirebase: Observable<Articulo[]>;

  constructor(private aFirestore:AngularFirestore, private builder: FormBuilder,private storage: AngularFireStorage,private alertController: AlertController) { 
    this.coleccionFirebase = aFirestore.collection<Articulo>('articulos');
    this.articulosFirebase = this.coleccionFirebase.valueChanges();


  }

  ngOnInit(): void {
  }
  objeto= {} as Articulo;
  image: string | SafeUrl ='assets/imagenes/articulos/articulo1.jpg';
  archivo : any;

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Listo!!',
      message: 'El producto ha sido subido correctamente',
      buttons: ['OK'],
    })
    await alert.present();
  }
  agregarArticulo(articulo: Articulo){
    this.coleccionFirebase.add(articulo);
  }

  onFileChanged(event:any) {
    this.objeto.imagen="assets/imagenes/articulos/"+event.target.files[0].name;
    this.archivo=event.target.files[0];
    this.updateImage(event);
    }

  articuloSubmit(){
    this.uploadFile(this.archivo);
    this.agregarArticulo(this.objeto);
    this.presentAlert();
  }

  updateImage(event:any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
          this.image = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
  }
  }

  uploadFile(archivo:any) {
    const file = archivo;
    const filePath = 'assets/imagenes/articulos/' + archivo.name;
    const task = this.storage.upload(filePath, file);
  };

  }
