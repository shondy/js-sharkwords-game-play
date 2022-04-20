fetch('/random-word.json')
  .then(responce=>responce.json())
  .then((responceData) => {
    startGame(responceData.word)
  });

//   startGame(responceData.word)