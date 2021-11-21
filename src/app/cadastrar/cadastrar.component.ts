import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Produto } from '../Produto';
import { WebService } from '../web.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

  produto = {_id:"", title : "", price: 0.0, description: ""};
  buttonText : string = "Cadastro de produto"
  listaProdutos: Produto[] | any;

  constructor(private web : WebService, private route: ActivatedRoute, private router: Router) {
    console.log(this.produto);
    if(route.snapshot.params.id){ 
      this.buttonText = "Editar";
      this.produto._id = route.snapshot.params.id;
      this.carregarProdutoById(this.produto._id);
      //this.produto = this.getProdutoById(route.snapshot.params.id);
      console.log(this.listaProdutos);
    } else {
      this.buttonText = "Cadastro de produto";
    }
  }

  salvar() {
    if(this.produto._id){
      //salvar
      this.web.produtoUpdate(this.produto).subscribe(res => {
        if(res.ok == true) {
          alert("O update foi realizado com sucesso");
          this.router.navigate(['/listar']);
        } else {
          alert("O update não foi realizado!");
        }
      });
    } else {
      //cadastrar
      this.web.cadastrarProduto(this.produto).subscribe(res => {
        if(res.ok == true) {
          alert("O cadastro foi realizado com sucesso");
          this.router.navigate(['/listar']);
        } else {
          alert("O cadastro não foi realizado!");
        }
      });
    }
  }

  carregarProdutoById(_id : string) : void {
    this.web.getProdutos().subscribe(res => {
      console.log(res)
      this.listaProdutos = res;
      const produtoCompleto = this.listaProdutos.find((x: { _id: string; }) => x._id == _id)
      this.produto.title = produtoCompleto.title;
      this.produto.price = produtoCompleto.price;
      this.produto.description = produtoCompleto.description;
    });
  }

  ngOnInit(): void {
  }
}
