import { Component, PLATFORM_ID, Inject } from '@angular/core'; // Permite identificar se o código está sendo executado no navegador ou no servidor (SSR)
import { Cliente } from '../model/cliente';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {
  public obj: Cliente = new Cliente();
  public mensagem: String = "";
  public confirmaSenha: string = "";
  public autorizaEnvio: boolean = false;
  private isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private router: Router
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  // Método para gerar um código numérico único para o cadastro
  private gerarCodigoUnico(): number {
    // Geração simples baseada na data e hora atual
    const agora = new Date();
    return Math.floor(agora.getTime() / 1000); // Timestamp em segundos como código
  }

  public gravar() {
    // Validar se as senhas coincidem
    if (this.obj.senha !== this.confirmaSenha) {
      this.mensagem = "As senhas não coincidem!";
      return;
    }
    
    if (this.isBrowser) {
      // Verificar se o email já existe
      const clienteExistente = localStorage.getItem("cliente");
      if (clienteExistente) {
        const cliente = JSON.parse(clienteExistente);
        if (cliente.email === this.obj.email) {
          this.mensagem = "Este email já está cadastrado!";
          return;
        }
      }

      // Definir o código automaticamente
      this.obj.codigo = this.gerarCodigoUnico();
      
      // Definir a data de cadastro
      this.obj.dataCadastro = new Date();
      
      // Definir se autoriza envio baseado no checkbox
      this.obj.autorizo = this.autorizaEnvio;
      
      console.log("Cliente a ser cadastrado:", this.obj);
      
      localStorage.setItem("cliente", JSON.stringify(this.obj));
      this.mensagem = "Cliente cadastrado com sucesso!";
      
      // Redirecionar após 2 segundos
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000);
    } else {
      this.mensagem = "Cadastro não disponível no modo servidor";
    }
  }
}
