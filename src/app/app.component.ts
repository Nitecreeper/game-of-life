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
  public buttonStatus: string;
  
  public arrNumCols: number[];
  public arrNumRows: number[];

  public board: Board;
  public aliveCells: number;

  constructor(){
    this.numCols = 40;
    this.numRows = 40;
    this.generation = 0;
    this.gameStatus = 1;
    this.buttonStatus = 'Paused';

    this.arrNumCols = Array.from({length: this.numCols}, (v,k)=> k);
    this.arrNumRows = Array.from({length: this.numRows}, (v,k)=> k);

    this.board = new Board(this.numCols, this.numRows);
    this.aliveCells = this.board.aliveCells();
  }

  public ngOnInit(): void {
    
    setInterval(() => {
      if(this.gameStatus === 0){
        this.board.checkBoard();
        this.generation++;
        this.checkAliveCells();
      }
    }, 100);
    
  }

  public onClick(pRow: number, pCol: number): void {
    this.board.changeStatus(pRow,pCol);
    console.log(pRow,pCol);
    this.checkAliveCells();
  }

  public onClickPausar(): void {
    // this.gameStatus = this.gameStatus === 0 ? 1: 0;

    if(this.gameStatus === 0){
      this.gameStatus = 1;
      this.buttonStatus = 'Paused'
    } else {
      this.gameStatus = 0;
      this.buttonStatus = 'Running';
    }
  }

  public onClickReset(): void{
    this.board.clearBoard();
    this.checkAliveCells();
    this.generation = 0;
  }

  private checkAliveCells(): void{
    this.aliveCells = this.board.aliveCells();
  }
  
}
