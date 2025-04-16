import { Component, PLATFORM_ID, Inject } from '@angular/core';
import { Cliente } from '../model/cliente';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public mensagem: String = "";
  public obj: Cliente = new Cliente();
  private isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private router: Router
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  public fazerLogin() {
    if (!this.isBrowser) {
      this.mensagem = "Login não disponível no modo servidor";
      return;
    }

    let json = localStorage.getItem("cliente");
    if (json == null) {
      this.mensagem = "Cadastro do cliente não existe!";
    } else {
      let objAux = JSON.parse(json);
      if (objAux.email == this.obj.email && 
          objAux.senha == this.obj.senha) {
        this.mensagem = "Bem vindo, " + objAux.nome;
        
        // Redirecionar imediatamente para a página principal após login
        this.router.navigate(['/']);
      } else {
        this.mensagem = "Email ou senha inválidos, verifique!";
      }
    }
  }
}
