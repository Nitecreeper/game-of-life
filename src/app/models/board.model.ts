export class Board{

    private board: number[][];

    constructor(pWidth: number, pHeight: number){

        this.board = [];

        this.fillBoard(pWidth, pHeight);
        
    }

    private fillBoard(pWidth: number, pHeight: number): void {

        for (let c = 0; c < pWidth; c++) {
            this.board[c] = [];
            for (let f = 0; f < pHeight; f++) {
                this.board[c][f] = 0;          
            }
        }

    }

    public status(coordX: number, coordY: number): number {
        return this.board[coordX][coordY];
    }

    public changeStatus(coordX: number, coordY: number): void {
        this.board[coordX][coordY] = this.board[coordX][coordY] === 0 ? 1 : 0;
    }

    public checkBoard(): void {

        let tmpBoard: number[][] = [];

        for (let c = 0; c < this.board.length; c++) {
            tmpBoard[c] = [];
            for (let f = 0; f < this.board[c].length; f++) {
                tmpBoard[c].push(this.checkRules(c,f));      
            }
        }

        this.board = [...tmpBoard];
    }

    public checkRules(coordX: number, coordY: number): number {

        const width: number = this.board.length;
        const height: number = this.board[0].length;

        const xMenos: number = (coordX - 1 < 0) ? (width - 1) : (coordX - 1);
        const xMas: number = (coordX + 1 >= width) ? 0 : (coordX + 1);

        const yMenos: number = (coordY - 1 < 0) ? (height - 1) : (coordY - 1);
        const yMas: number = (coordY + 1 >= height) ? 0 : (coordY + 1);

        const currentStatus: number = this.board[coordX][coordY];

        const vecinos: number = 
            this.board[xMenos][yMenos]  +
            this.board[xMenos][coordY]  +
            this.board[xMenos][yMas]    +
            this.board[coordX][yMenos]  +
            this.board[coordX][yMas]    +
            this.board[xMas][yMenos]    +
            this.board[xMas][coordY]    +
            this.board[xMas][yMas];

        if(currentStatus === 1 && (vecinos === 2 || vecinos === 3)) {
            return 1;
        }

        if(currentStatus === 0 && vecinos === 3){
            return 1;
        }

        return 0;
    }
}