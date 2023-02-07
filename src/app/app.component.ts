import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'dominoesAngularProject';

  dominoes = [
    { tile: "0-0", isSelected: false },
    { tile: "0-1", isSelected: false },
    { tile: "0-2", isSelected: false },
    { tile: "0-3", isSelected: false },
    { tile: "0-4", isSelected: false },
    { tile: "0-5", isSelected: false },
    { tile: "0-6", isSelected: false },
    { tile: "1-1", isSelected: false },
    { tile: "1-2", isSelected: false },
    { tile: "1-3", isSelected: false },
    { tile: "1-4", isSelected: false },
    { tile: "1-5", isSelected: false },
    { tile: "1-6", isSelected: false },
    { tile: "2-2", isSelected: false },
    { tile: "2-3", isSelected: false },
    { tile: "2-4", isSelected: false },
    { tile: "2-5", isSelected: false },
    { tile: "2-6", isSelected: false },
    { tile: "3-3", isSelected: false },
    { tile: "3-4", isSelected: false },
    { tile: "3-5", isSelected: false },
    { tile: "3-6", isSelected: false },
    { tile: "4-4", isSelected: false },
    { tile: "4-5", isSelected: false },
    { tile: "4-6", isSelected: false },
    { tile: "5-5", isSelected: false },
    { tile: "5-6", isSelected: false },
    { tile: "6-6", isSelected: false },
  ]

  hand1: any[] = []
  hand2: any[] = []
  hand3: any[] = []
  hand4: any[] = []
  playedTiles: any[] = []

  leftPlayEnd: any;
  rightPlayEnd: any;

  playLeft: boolean;

  constructor() {
    this.playLeft = false
  }

  ngOnInit() {
    this.getDominoes();
  }

  getDominoes() {
    for (let a = 0; a < 7; a++) {
      const tile1 = this.pullTiles();
      this.hand1.push({key: tile1.tile, img: `../assets/img/${tile1.tile}.png`})
      tile1.isSelected = true

      const tile2 = this.pullTiles();
      this.hand2.push({key: tile2.tile, img: `../assets/img/${tile2.tile}.png`})
      tile2.isSelected = true;

      const tile3 = this.pullTiles();
      this.hand3.push({key: tile3.tile, img: `../assets/img/${tile3.tile}.png`})
      tile3.isSelected = true

      const tile4 = this.pullTiles();
      this.hand4.push({key: tile4.tile, img: `../assets/img/${tile4.tile}.png`})
      tile4.isSelected = true;
    }

    console.log({2: this.hand2, 3: this.hand3, 4: this.hand4})

  }

  pullTiles() {
      const filteredTiles = this.dominoes.filter(x => x.isSelected === false)

      return filteredTiles[Math.floor(Math.random()*filteredTiles.length)];
  }

  playTile(tileInfo: any, index: any, hand: any[]) {
    if(!this.isValidTile(tileInfo)){
      return
    }

    this.displayOnTable(hand.at(index))
    hand.splice(index, 1)
  }

  displayOnTable(tileInfo: any) {
    if(this.playedTiles.length === 0) {
      this.leftPlayEnd = tileInfo.key.split('-')[0];
      this.rightPlayEnd = tileInfo.key.split('-')[1];
    }
    this.playedTiles.push(tileInfo)
  }

  isNonDouble(tileInfo: any) {
    const TILE_SIDES = tileInfo.key.split('-');
    return TILE_SIDES[0] !== TILE_SIDES[1];
  }

  isValidTile(tileInfo: any) {
    const TILE_SIDES = tileInfo.key.split('-');
    if(this.playedTiles.length === 0 && TILE_SIDES[0] === '6' && TILE_SIDES[1] === '6' ) {
      return true;
    }

    if(TILE_SIDES[0] === this.leftPlayEnd || TILE_SIDES[0] === this.rightPlayEnd) {
      return true;
    }

    if(TILE_SIDES[1] === this.leftPlayEnd || TILE_SIDES[1] === this.rightPlayEnd) {
      return true;
    }

    return false;
    // if playedTile length AND tile inc  leftPlayEnd or rightPlayEnd number
  }
}


