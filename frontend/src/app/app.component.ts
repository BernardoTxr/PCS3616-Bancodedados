import { Component } from '@angular/core';
import { ProdutoService } from './produto.service';

@Component({ selector: 'app-root', templateUrl: './app.component.html' })
export class AppComponent {
  produtos: any[] = [];

  constructor(private produtoService: ProdutoService) {}

  carregarProdutos() {
    this.produtoService.getProdutos().subscribe(data => this.produtos = data);
  }
}