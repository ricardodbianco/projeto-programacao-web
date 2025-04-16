import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { Produto } from '../model/produto';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Cesta } from '../model/cesta';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vitrine',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vitrine.component.html',
  styleUrl: './vitrine.component.css'
})
export class VitrineComponent implements OnInit {
  mensagem: String = "";
  categoriaSelecionada: String = "";
  private isBrowser: boolean;
  
  produtos: Produto[] = [
    {
      codigo: 1, 
      nome: "Caderno Universitário", 
      descritivo: "Caderno universitário capa dura 10 matérias 200 folhas", 
      valor: 29.90, 
      valorPromo: 24.90, 
      quantidade: 50,
      categoria: "escolar",
      imagem: "https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=2070"
    },
    {
      codigo: 2, 
      nome: "Estojo Completo", 
      descritivo: "Estojo escolar completo com 30 itens", 
      valor: 45.50, 
      valorPromo: 39.90, 
      quantidade: 30,
      categoria: "escolar",
      imagem: "https://images.unsplash.com/photo-1576613109753-27804de2cba8?q=80&w=2070"
    },
    {
      codigo: 3, 
      nome: "Caneta Esferográfica", 
      descritivo: "Caixa com 50 canetas esferográficas azuis", 
      valor: 49.90, 
      valorPromo: 49.90, 
      quantidade: 25,
      categoria: "escritorio",
      imagem: "https://images.unsplash.com/photo-1574359155811-def4d7f39a4e?q=80&w=1974"
    },
    {
      codigo: 4, 
      nome: "Papel Sulfite A4", 
      descritivo: "Resma com 500 folhas de papel sulfite A4", 
      valor: 25.90, 
      valorPromo: 19.90, 
      quantidade: 100,
      categoria: "escritorio",
      imagem: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1973"
    },
    {
      codigo: 5, 
      nome: "Kit Pintura Artística", 
      descritivo: "Kit com tintas, pincéis e tela para pintura", 
      valor: 89.90, 
      valorPromo: 79.90, 
      quantidade: 15,
      categoria: "arte",
      imagem: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2071"
    },
    {
      codigo: 6, 
      nome: "Mochila Escolar", 
      descritivo: "Mochila escolar resistente com vários compartimentos", 
      valor: 119.90, 
      valorPromo: 99.90, 
      quantidade: 0,
      categoria: "escolar",
      imagem: "https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=2072"
    }
  ];

  categorias = [
    { id: "", nome: "Todas as Categorias" },
    { id: "escolar", nome: "Material Escolar" },
    { id: "escritorio", nome: "Escritório" },
    { id: "arte", nome: "Artes e Pintura" }
  ];

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private router: Router
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    // Inicializações caso necessário
  }

  public filtrarPorCategoria(categoria: String) {
    this.categoriaSelecionada = categoria;
  }

  public getProdutosFiltrados() {
    if (!this.categoriaSelecionada) {
      return this.produtos;
    }
    return this.produtos.filter(p => p.categoria === this.categoriaSelecionada);
  }

  public carregar(obj: Produto) {
    if (this.isBrowser) {
      localStorage.setItem("produto", JSON.stringify(obj));
      this.router.navigate(['/detalhe']);
    } else {
      console.log('Navegação para detalhes do produto', obj.codigo);
    }
  }

  public comprar(obj: Produto) {
    if (this.isBrowser) {
      let temp = new Cesta();
      let json = localStorage.getItem("cesta");
      if (json != null) temp = JSON.parse(json);
      temp.itens.push(obj);
      temp.total = temp.total + (obj.valorPromo < obj.valor ? obj.valorPromo : obj.valor);
      localStorage.setItem("cesta", JSON.stringify(temp));
      this.router.navigate(['/cesta']);
    } else {
      console.log('Adicionando produto à cesta', obj.codigo);
    }
  }
}
