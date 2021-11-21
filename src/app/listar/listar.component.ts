import { Component, OnInit } from '@angular/core';
import { Produto } from '../Produto';
import { WebService } from '../web.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {

  listaProdutos: Produto[] | any;

  constructor(private web : WebService) { }

  carregarProdutos() : void {
    this.web.getProdutos().subscribe(res => {
      console.log(res)
      this.listaProdutos = res;
    });
  }

  deleteProduto(_id: string) : any{
    console.log(_id)
    this.web.deleteProduto(_id).subscribe(res => {
      if(res.ok == true) {
        alert("A deleção foi realizado com sucesso");
        this.carregarProdutos();
      } else {
        alert("O deleção não foi realizado!");
      }
    });
  }

  ngOnInit(): void {
    this.carregarProdutos();
  }

}

