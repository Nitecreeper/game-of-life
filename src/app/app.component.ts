import { Component, OnInit } from '@angular/core';
import { Board } from './models/board.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public title: string = 'Game Of Life';

  public numCols: number;
  public numRows: number;
  public generation: number;
  public gameStatus: number; // -1: no empieza | 0: Activo | 1: Pausado
  
  public arrNumCols: number[];
  public arrNumRows: number[];

  public board: Board;

  constructor(){
    this.numCols = 40;
    this.numRows = 40;
    this.generation = 0;
    this.gameStatus = 0;

    this.arrNumCols = Array.from({length: this.numCols}, (v,k)=> k);
    this.arrNumRows = Array.from({length: this.numRows}, (v,k)=> k);

    this.board = new Board(this.numCols, this.numRows);
  }

  ngOnInit(): void {
    
    setInterval(() => {
      if(this.gameStatus === 0){
        this.board.checkBoard();
        this.generation++;
      }
    }, 100);
    
  }

  onClick(pRow: number, pCol: number){
    this.board.changeStatus(pRow,pCol);
    console.log(pRow,pCol);
    
  }

  onClickPausar() {
    this.gameStatus = this.gameStatus === 0 ? 1: 0;
  }
  
}
