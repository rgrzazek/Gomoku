import Board from './Board';
const minRows = 5;
const minCols = 5;

type inputs = {
  rows: number,
  cols: number
}

function resetGame(): void {
  const input = validate();
  board.reset(input.rows, input.cols);
}

function validate(): inputs {
  let rows: number = parseInt((<HTMLInputElement>document.getElementById("rows"))?.value);
  let cols: number = parseInt((<HTMLInputElement>document.getElementById("cols"))?.value);

  if (!rows || rows<minRows) rows = minRows;
  if (!cols || cols<minCols) cols = minCols;
  return {
    rows: rows, 
    cols: cols
  };
}

const board: Board = new Board();
document.getElementById("game")?.append(board.element);
document.getElementById("resetButton")?.addEventListener("click", resetGame);
