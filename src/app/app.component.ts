import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'dominoesAngularProject';

  dominoes = [
    { tile: '', isSelected: false },
  ]
  gameClosedCount = {hand1: 0, hand2: 0, hand3: 0, hand4: 0}

  hand1: any[] = [];
  hand2: any[] = [];
  hand3: any[] = [];
  hand4: any[] = [];
  playedTiles: any[] = [];
  selectedHand: any[] = [];
  selectedIndex: any = {};

  leftPlayEnd: string = '';
  rightPlayEnd: string = '';

  playLeft: boolean = false;
  pickSide: boolean = false;

  gameClosedText: string = '';
  gameClosed: boolean = false;

  minPlayTime = 1000;
  maxPlayTime = 1000;
  passCount = 0;
  turn = 0;


  constructor() {
    //TODO: linter don't allow me to declare in this fxn explicitly
    this.resetValues();
  }

  ngOnInit() {
    this.getDominoes();

    this.aiPlayTile();
  }

  getDominoes() {
    this.resetValues();
    for (let a = 0; a < 7; a++) {
      const tile1 = this.pullTiles();
      if(tile1.tile === '6-6') {
        this.turn = 1
      }
      this.hand1.push({key: tile1.tile, img: `../assets/img/${tile1.tile}.png`, reverse: false })
      tile1.isSelected = true

      const tile2 = this.pullTiles();
      if(tile2.tile === '6-6') {
        this.turn = 2
      }
      this.hand2.push({key: tile2.tile, img: `../assets/img/back.png`, reverse: false })
      tile2.isSelected = true;

      const tile3 = this.pullTiles();
      if(tile3.tile === '6-6') {
        this.turn = 3
      }
      this.hand3.push({key: tile3.tile, img: `../assets/img/back.png`, reverse: false })
      tile3.isSelected = true

      const tile4 = this.pullTiles();
      if(tile4.tile === '6-6') {
        this.turn = 4
      }
      this.hand4.push({key: tile4.tile, img: `../assets/img/back.png`, reverse: false })
      tile4.isSelected = true;
    }
  }

  pullTiles() {
      const filteredTiles = this.dominoes.filter(x => x.isSelected === false)

      return filteredTiles[Math.floor(Math.random()*filteredTiles.length)];
  }

  playTile(tileInfo: any, index: any, hand: any[], turn: number) {
    const TILE_SIDES = tileInfo.key.split('-');
    if(!this.isValidTile(tileInfo) || turn !== this.turn){
      return
    }

    if( this.isNonDouble(tileInfo) &&
        TILE_SIDES.includes(this.leftPlayEnd) &&
        TILE_SIDES.includes(this.rightPlayEnd) &&
        this.leftPlayEnd !== this.rightPlayEnd &&
        this.aiUserPlayed)
    {
          this.pickSide = true;
          this.selectedHand = hand;
          this.selectedIndex = index;
          return;
    }

    this.pickSide = false
    if(TILE_SIDES.includes(this.leftPlayEnd) ) {
      this.playLeft = true;
    } else {
      this.playLeft = false;
    }


    this.displayOnTable(hand, index)
    this.aiUserPlayed = true;

    setTimeout(() => {
      if(this.turn !== 1){
        this.aiUserPlayed = false;
        this.aiPlayTile()
      }
    }, this.thoughtInterval(this.minPlayTime, this.maxPlayTime));
  }

  displayOnTable(hand: any[], index: any) {

    let tileInfo = hand.at(index)

    const TILE_SIDES = tileInfo.key.split('-');
    if(this.playedTiles.length === 0) {
      this.leftPlayEnd = TILE_SIDES[0];
      this.rightPlayEnd = TILE_SIDES[1];
    }

    if(tileInfo.img.includes('back')) {
      tileInfo.img = `../assets/img/${tileInfo.key}.png`
    }

    if(this.playLeft) {
      tileInfo.reverse = this.isNonDouble(tileInfo) && TILE_SIDES[1] === this.leftPlayEnd
      this.leftPlayEnd = this.updatePlayEnd(tileInfo, this.leftPlayEnd)
      this.playedTiles.unshift(tileInfo)
    } else {
      tileInfo.reverse = this.isNonDouble(tileInfo) && TILE_SIDES[0] === this.rightPlayEnd
      this.rightPlayEnd = this.updatePlayEnd(tileInfo, this.rightPlayEnd)
      this.playedTiles.push(tileInfo)
    }

    hand.splice(index, 1)

    if(hand.length === 0) {
      this.closeGame(`WINNER is Player ${this.turn}`)
    } else {
      this.passCount = 0
      this.updateTurn();

      this.checkForPass();

    }

  }

  isNonDouble(tileInfo: any) {
    const TILE_SIDES = tileInfo.key.split('-');
    return TILE_SIDES[0] !== TILE_SIDES[1];
  }

  isValidTile(tileInfo: any) {
    const TILE_SIDES = tileInfo.key.split('-');

    if(this.playedTiles.length === 0
      && TILE_SIDES[0] === '6'
      && TILE_SIDES[1] === '6') {
      return true;
    }

    if(TILE_SIDES[0] === this.leftPlayEnd
      || TILE_SIDES[0] === this.rightPlayEnd) {
      return true;
    }

    if(TILE_SIDES[1] === this.leftPlayEnd
      || TILE_SIDES[1] === this.rightPlayEnd) {
      return true;
    }

    return false;
  }

  updatePlayEnd(tileInfo: any, end: any) {
    const TILE_SIDES = tileInfo.key.split('-');

    return TILE_SIDES.find((x: any) => !x.includes(end)) ?? end;
  }

  placeTile(choseLeft: boolean) {

    this.playLeft = choseLeft;
    this.pickSide = false

    this.displayOnTable(this.selectedHand, this.selectedIndex)

    setTimeout(() => {
        this.aiUserPlayed = false;
        this.aiPlayTile()
    }, this.thoughtInterval(this.minPlayTime, this.maxPlayTime));
  }

  updateTurn() {
    if (this.turn === 4) {
      this.turn = 1;
    } else {
      this.turn++;
    }
  }

  checkForPass() {
    if (this.passCount === 4) {
      this.closeGame('GAME BLOCKED.. Count points')
    } else if (this.passCount > 4) {
      return;
    }

    console.log({
      hand1: this['hand1'],
      hand2: this.hand2,
      hand3: this.hand3,
      hand4: this.hand4,
      turn: this.turn,
      pC: this.passCount
    })

    if (this.turn === 1) {
      if (this.hand1.find(x => this.isValidTile(x))) {
        return;
      } else {
        this.passCount++;
        console.log('hand1pass' + this.passCount);
        this.updateTurn();
        this.checkForPass();
      }
    }
    else if(this.turn === 2) {
      if (this.hand2.find(x => this.isValidTile(x))) {
        return;
      } else {
        this.passCount++;
        console.log('hand2pass' + this.passCount);
        this.updateTurn();
        this.checkForPass();
      }
    }
    else if (this.turn === 3) {
      if (this.hand3.find(x => this.isValidTile(x))) {
        return;
      } else {
        this.passCount++;
        console.log('hand3pass' + this.passCount);
        this.updateTurn();
        this.checkForPass();
      }
    }
    else if(this.turn === 4) {
      if (this.hand4.find(x => this.isValidTile(x))) {
        return;
      } else {
        this.passCount++;
        console.log('hand4pass' + this.passCount);
        this.updateTurn();
        this.checkForPass();
      }
    }
  }

  getClosedCount() {

    this.hand1.forEach(dom => {
      const a = +(dom.key.split('-')[0]);
      const b = +(dom.key.split('-')[1]);
      this.gameClosedCount.hand1 += a + b
    });

    this.hand2.forEach(dom => {
      const a = +(dom.key.split('-')[0]);
      const b = +(dom.key.split('-')[1]);
      this.gameClosedCount.hand2 += a + b
    });

    this.hand3.forEach(dom => {
      const a = +(dom.key.split('-')[0]);
      const b = +(dom.key.split('-')[1]);
      this.gameClosedCount.hand3 += a + b
    });

    this.hand4.forEach(dom => {
      const a = +(dom.key.split('-')[0]);
      const b = +(dom.key.split('-')[1]);
      this.gameClosedCount.hand4 += a + b
    });

  }

  closeGame(text: string) {
    this.gameClosedText = text;
    this.gameClosed = true
    return this.getClosedCount();
  }

  resetValues() {
    this.dominoes = [
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

    this.hand1 = []
    this.hand2 = []
    this.hand3 = []
    this.hand4 = []
    this.playedTiles = []

    this.leftPlayEnd = '';
    this.rightPlayEnd = '';
    this.gameClosedText = '';
    this.playLeft = false;
    this.pickSide = false;
    this.gameClosed = false;
  }

  aiUserPlayed = false;

  aiPlayTile() {
    let a: any[] = [];
    switch (this.turn) {
      case 2:
        a = this.hand2;
        break;
      case 3:
        a = this.hand3;
        break;
      default:
        a = this.hand4;
        break;
    }

    for (let index = 0; index < a.length; index++) {
      const element = a[index];
      this.playTile(element, index, a, this.turn);
      if(this.aiUserPlayed){
        break;
      }
    }

  }

  thoughtInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
}






