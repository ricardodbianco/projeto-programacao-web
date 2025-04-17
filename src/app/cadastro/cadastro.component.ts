import { Component } from '@angular/core';
import { Cliente } from '../model/cliente';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {
  public obj: Cliente = new Cliente();
  public mensagem: String = "";
  public confirmaSenha: string = "";
  public autorizaEnvio: boolean = false;

  constructor(private router: Router) {}

  //código numérico único 
  private gerarCodigoUnico(): number {
    const agora = new Date();
    return Math.floor(agora.getTime() / 1000);
  }

  public gravar() {
    // Valida se as senhas coincidem
    if (this.obj.senha !== this.confirmaSenha) {
      this.mensagem = "As senhas não coincidem!";
      return;
    }

    // Verifica email existente
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
    
    console.log("Cliente a ser cadastrado:", this.obj);
    
    localStorage.setItem("cliente", JSON.stringify(this.obj));
    this.mensagem = "Cliente cadastrado com sucesso!";
    
    // Redirecionar após 2 segundos
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 2000);
  }
}
