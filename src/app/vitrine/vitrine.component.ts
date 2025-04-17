import { Component } from '@angular/core';
import { Produto } from '../model/produto';
import { Cesta } from '../model/cesta';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vitrine',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vitrine.component.html',
  styleUrls: ['./vitrine.component.css']
})
export class VitrineComponent {
  mensagem: string = "";
  categoriaSelecionada: string = "";
  
  produtos: Produto[] = [
    {
      codigo: 1, 
      nome: "Caneta Pena Vintage – Com Tinteiro", 
      descritivo: "Elegância e tradição em cada traço. Ideal para caligrafia, journaling.", 
      valor: 29.90, 
      valorPromo: 24.90, 
      quantidade: 50,
      categoria: "escritorio",
      imagem: "https://images.unsplash.com/photo-1478641300939-0ec5188d3802?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      codigo: 2, 
      nome: "Cálamos – Caneta de Cana Clássica", 
      descritivo: "Inspirada nas tradicionais canetas feitas de cana, o Cálamos traz de volta a arte de escrever à mão com elegância. Perfeita para caligrafia e momentos especiais.", 
      valor: 45.50, 
      valorPromo: 39.90, 
      quantidade: 30,
      categoria: "escolar",
      imagem: "https://i.pinimg.com/736x/bc/56/b1/bc56b177b31a729ded3c1959bfd5d322.jpg"
    },
    {
      codigo: 3, 
      nome: "Lacre de Cera – Selagem Clássica", 
      descritivo: "Adicione um toque de elegância e exclusividade às suas cartas ou convites.", 
      valor: 49.90, 
      valorPromo: 49.90, 
      quantidade: 25,
      categoria: "escritorio",
      imagem: "https://images.unsplash.com/photo-1642069525937-ce9e8b24413a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      codigo: 4, 
      nome: "Papel Pergaminho Tradicional", 
      descritivo: "Papel de alta qualidade, ideal para caligrafia, escrita formal e documentos importantes. 50 Folhas.", 
      valor: 25.90, 
      valorPromo: 19.90, 
      quantidade: 100,
      categoria: "escritorio",
      imagem: "https://m.media-amazon.com/images/I/8155f0I1vtL._AC_UF894,1000_QL80_.jpg"
    },
    {
      codigo: 5, 
      nome: "Pincel Japonês Tradicional", 
      descritivo: "Kit com tintas, pincéis e tela para pintura.", 
      valor: 89.90, 
      valorPromo: 79.90, 
      quantidade: 15,
      categoria: "arte",
      imagem: "https://images.unsplash.com/photo-1486303954368-398fea0e72cd?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      codigo: 6, 
      nome: "Máquina de Escrever Antiga", 
      descritivo: "Adicione um toque de elegância ao seu espaço com esta máquina de escrever. Ideal para quem busca um item funcional e com design clássico, perfeita para decoração ou uso diário.", 
      valor: 319.90, 
      valorPromo: 310.00, 
      quantidade: 0,
      categoria: "escolar",
      imagem: "https://images.unsplash.com/photo-1454037439427-fdeaf232d3ce?q=80&w=1333&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
  ];

  categorias = [
    { id: "", nome: "Todas as Categorias" },
    { id: "escolar", nome: "Material Escolar" },
    { id: "escritorio", nome: "Escritório" },
    { id: "arte", nome: "Artes e Pintura" }
  ];

  constructor(private router: Router) {}

  public filtrarPorCategoria(categoria: string) {
    this.categoriaSelecionada = categoria;
  }

  public getProdutosFiltrados() {
    if (!this.categoriaSelecionada) {
      return this.produtos;
    }
    return this.produtos.filter(p => p.categoria === this.categoriaSelecionada);
  }

  public carregar(obj: Produto) {
    localStorage.setItem("produto", JSON.stringify(obj));
    this.router.navigate(['/detalhe']);
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
