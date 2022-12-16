import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'dominoesAngularProject';

  dominoes = [
    { tile: "0:0", isSelected: false },
    { tile: "0:1", isSelected: false },
    { tile: "0:2", isSelected: false },
    { tile: "0:3", isSelected: false },
    { tile: "0:4", isSelected: false },
    { tile: "0:5", isSelected: false },
    { tile: "0:6", isSelected: false },
    { tile: "1:1", isSelected: false },
    { tile: "1:2", isSelected: false },
    { tile: "1:3", isSelected: false },
    { tile: "1:4", isSelected: false },
    { tile: "1:5", isSelected: false },
    { tile: "1:5", isSelected: false },
    { tile: "2:2", isSelected: false },
    { tile: "2:3", isSelected: false },
    { tile: "2:4", isSelected: false },
    { tile: "2:5", isSelected: false },
    { tile: "2:6", isSelected: false },
    { tile: "3:3", isSelected: false },
    { tile: "3:4", isSelected: false },
    { tile: "3:5", isSelected: false },
    { tile: "3:6", isSelected: false },
    { tile: "4:4", isSelected: false },
    { tile: "4:5", isSelected: false },
    { tile: "4:6", isSelected: false },
    { tile: "5:5", isSelected: false },
    { tile: "5:6", isSelected: false },
    { tile: "6:6", isSelected: false },
  ]

  hand1: string[] = []
  hand2: string[] = []
  hand3: string[] = []
  hand4: string[] = []

  ngOnInit() {
    this.getDominoes();
  }

  getDominoes() {
    for (let a = 0; a < 7; a++) {
      const tile1 = this.pullTiles();
      this.hand1.push(tile1.tile)
      tile1.isSelected = true

      const tile2 = this.pullTiles();
      this.hand2.push(tile2.tile)
      tile2.isSelected = true;

      const tile3 = this.pullTiles();
      this.hand3.push(tile3.tile)
      tile3.isSelected = true

      const tile4 = this.pullTiles();
      this.hand4.push(tile4.tile)
      tile4.isSelected = true;
    }

    console.log(this.hand1, this.hand2, this.hand3, this.hand4);
    console.log(this.dominoes)

  }

  pullTiles() {
      const filteredTiles = this.dominoes.filter(x => x.isSelected === false)

      return filteredTiles[Math.floor(Math.random()*filteredTiles.length)];
  }

}
