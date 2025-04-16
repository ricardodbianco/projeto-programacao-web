import { Routes } from '@angular/router';
import { CadastroComponent } from './cadastro/cadastro.component';
import { LoginComponent } from './login/login.component';
import { ContatoComponent } from './contato/contato.component';
import { VitrineComponent } from './vitrine/vitrine.component';
import { DetalheComponent } from './detalhe/detalhe.component';
import { CestaComponent } from './cesta/cesta.component';

export const routes: Routes = [
    {path:"cadastro", component:CadastroComponent},
    {path:"login", component:LoginComponent},
    {path:"contato", component:ContatoComponent},
    {path:"", component:VitrineComponent},
    {path:"detalhe", component:DetalheComponent},
    {path:"cesta", component:CestaComponent}
];
