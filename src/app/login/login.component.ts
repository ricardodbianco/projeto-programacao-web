import { Component } from '@angular/core';
import { Cliente } from '../model/cliente';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public mensagem: string = "";
  public obj: Cliente = new Cliente();

  constructor(private router: Router) {}

  public fazerLogin() {
    
    const json = localStorage.getItem("cliente");
    if (json === null) {
      this.mensagem = "Cadastro do cliente não existe!";
    } else {
      const objAux = JSON.parse(json);
      if (objAux.email === this.obj.email && objAux.senha === this.obj.senha) {
        this.mensagem = "Bem-vindo, " + objAux.nome;
        
        this.router.navigate(['/']);
      } else {
        this.mensagem = "Email ou senha inválidos, verifique!";
      }
    }
  }
}
