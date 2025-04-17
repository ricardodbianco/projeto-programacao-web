import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Produto } from '../model/produto';
import { Cesta } from '../model/cesta';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-detalhe',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './detalhe.component.html',
  styleUrls: ['./detalhe.component.css']
})
export class DetalheComponent {
  public obj: Produto = new Produto();
  public mensagem: string = "";

  constructor(private router: Router) {
    const json = localStorage.getItem("produto");
    if (json === null) {
      this.mensagem = "Produto não encontrado! Verifique.";
    } else {
      this.obj = JSON.parse(json);
    }
  }

  public comprar(obj: Produto) {
    let temp = new Cesta();
    const json = localStorage.getItem("cesta");
    if (json !== null) temp = JSON.parse(json);
  
    temp.itens.push(obj);
    temp.total = temp.total + (obj.valorPromo < obj.valor ? obj.valorPromo : obj.valor);

    localStorage.setItem("cesta", JSON.stringify(temp));

    this.router.navigate(['/cesta']);
  }
}
