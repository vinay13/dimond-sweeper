import { Component , OnInit,ViewEncapsulation} from '@angular/core';
import { JSON } from 'json3';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{

  title = 'diamond-sweeper';
  board_row: number = 8;
  board_col: number = 8;
  diamondCount: number = 0;
  state;
  arrowRowIndex = 0;
  arrowColIndex = 0;
  setState;
  gameover = false;

constructor(){
  this.state = {
    originaldata : [ 
        ["unknown", "unknown", "unknown", "unknown", "unknown", "unknown", "unknown", "unknown"],
        ["unknown", "unknown", "unknown", "unknown", "unknown", "unknown", "unknown", "unknown"],
        ["unknown", "unknown", "unknown", "unknown", "unknown", "unknown", "unknown", "unknown"],
        ["unknown", "unknown", "unknown", "unknown", "unknown", "unknown", "unknown", "unknown"],
        ["unknown", "unknown", "unknown", "unknown", "unknown", "unknown", "unknown", "unknown"],
        ["unknown", "unknown", "unknown", "unknown", "unknown", "unknown", "unknown", "unknown"],
        ["unknown", "unknown", "unknown", "unknown", "unknown", "unknown", "unknown", "unknown"],
        ["unknown", "unknown", "unknown", "unknown", "unknown", "unknown", "unknown", "unknown"]
    ],
    data : [ 
        ["unknown", "unknown", "unknown", "unknown", "unknown", "unknown", "diamond", "unknown"],
        ["unknown", "unknown", "unknown", "unknown", "unknown", "unknown", "unknown", "unknown"],
        ["unknown", "diamond", "diamond", "unknown", "diamond", "unknown", "unknown", "unknown"],
        ["unknown", "", "unknown", "unknown", "unknown", "unknown", "unknown", "unknown"],
        ["unknown", "unknown", "diamond", "unknown", "unknown", "", "arrow", "unknown"],
        ["diamond", "arrow", "unknown", "", "unknown", "", "unknown", "unknown"],
        ["unknown", "unknown", "unknown", "unknown", "diamond", "unknown", "unknown", "unknown"],
        ["unknown", "arrow", "diamond", "unknown", "unknown", "unknown", "", "unknown"]
    ],
    points: 64
   
};
}

onClick(rowIndex, colIndex,b) {
    console.log('rowIndex', rowIndex);
    console.log('colIndex',colIndex);
    this.updateHint( this.arrowRowIndex,this.arrowColIndex);
    if(!(this.state.data[rowIndex][colIndex] == "diamond") && !(this.state.data[rowIndex][colIndex] == "arrow")){
        
        this.state.originaldata[rowIndex][colIndex] = "";
        this.state.points = this.state.points - 1;

    }

    if(this.state.data[rowIndex][colIndex] == "diamond"){
        
        this.state.originaldata[rowIndex][colIndex] = "diamond";
        this.diamondCount = this.diamondCount + 1;
        this.completed();
                     
    }

    if(this.state.data[rowIndex][colIndex] == "arrow"){
        
        this.state.originaldata[rowIndex][colIndex] = "arrow";
        this.state.points = this.state.points - 1;
        this.arrowRowIndex = rowIndex;
        this.arrowColIndex = colIndex;
    }

    console.log('onclickkk data',this.state.originaldata[rowIndex][colIndex]);
  
}

completed() {
  if(this.diamondCount == 8){
      alert('completed');
      this.saveGame();
  }
  return true
}

saveGame(){
    localStorage.setItem('saveGame',this.state);  
}

loadGame(){
    this.state = localStorage.getItem('saveGame');
    this.state = JSON.parse(this.state);
    this.state.originaldata = this.state.originaldata;
}

updateHint(rowIndex,colIndex){
    if(this.state.data[rowIndex][colIndex] == "arrow"){
        this.state.originaldata[rowIndex][colIndex] = "";
    }

}

ngOnInit() {
  
}
  
  
}
