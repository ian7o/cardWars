const deck = ["a","1","2","3","4","5","6","7","8","9","Jack","Queen","King"];

  function shufleDeck(){
      let deckShufled=[]
    for(let i=0; i<50; i++){
        let randonNmbr=(Math.floor(Math.random() * deck.length))
        let choseCard=deck[randonNmbr]
        deckShufled.push(choseCard)
    }
    return deckShufled;
  }

  function spliter(deck){
    const deckShufled = deck;

    let half = Math.ceil(deckShufled.length / 2);

    let zee = deckShufled.slice(0, half);
    let joao = deckShufled.slice(half);
    console.log("Zee deck: " + zee);
    console.log("Joao deck: " + joao)
  }

  

  console.log(spliter(shufleDeck()));