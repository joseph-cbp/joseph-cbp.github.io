const firstColor = document.querySelector('.black');
firstColor.style.backgroundColor = 'black';
const getColor = document.getElementsByClassName('color');
const buttonColors = document.getElementById('button-random-color');
const arrSavePalette = [0, 1, 2, 3];
const arrSaveBoard = [];
const alternatives = document.getElementsByClassName('color');
const pixelBoardColor = document.getElementsByClassName('pixel');

for (let index = 0; index < 25; index += 1) {
  arrSaveBoard[index] = 'white';
}

const numberToColor = () => Math.floor(Math.random() * 255);
const generateColor = () => {
  console.log('entrei no gerador');
  for (let index = 1; index < getColor.length; index += 1) {
    const textColor = `rgb(${numberToColor()},${numberToColor()},${numberToColor()})`;
    getColor[index].style.backgroundColor = textColor;
    if (getColor[index].style.backgroundColor === 'rgb(255, 255, 255)') {
      index -= 1;
    }
  }
};
generateColor();

// criar página de 25x25 px (requisito 6 e 7)
const pixelBoard = document.querySelector('#pixel-board');
const createBoard = () => {
  for (let index = 0; index < 25; index += 1) {
    const newPixel = document.createElement('div');
    newPixel.classList.add('pixel');
    pixelBoard.appendChild(newPixel);
  }
};
createBoard();

// Salvar no localStorage (requisito 5 e 12)
function saveToLocalStorage() {
  for (let index = 1; index < getColor.length; index += 1) {
    const saveTo = getColor[index].style.backgroundColor;
    arrSavePalette[index] = saveTo;
  }
  localStorage.setItem('colorPalette', JSON.stringify(arrSavePalette));
}

const initialRenderingPalette = () => {
  if (localStorage.getItem('colorPalette') === null) {
    saveToLocalStorage();
  } else {
    const colorPalette = JSON.parse(localStorage.getItem('colorPalette'));
    for (let index = 1; index < getColor.length; index += 1) {
      getColor[index].style.backgroundColor = colorPalette[index];
    }
  }
};

const initialRenderingBoard = () => {
  if (localStorage.getItem('pixelBoard') === null) {
    localStorage.setItem('pixelBoard', JSON.stringify(arrSaveBoard));
  } else {
    const colorBoard = JSON.parse(localStorage.getItem('pixelBoard'));
    for (let index = 0; index < pixelBoardColor.length; index += 1) {
      pixelBoardColor[index].style.backgroundColor = colorBoard[index];
    }
  }
};
initialRenderingPalette();
initialRenderingBoard();

buttonColors.addEventListener('click', generateColor);
buttonColors.addEventListener('click', saveToLocalStorage);

//  SELECIONAR COR e PINTAR

for (let index = 0; index < alternatives.length; index += 1) {
  alternatives[index].addEventListener('click', (event) => {
    const selectedColor = document.querySelector('.selected');
    if (selectedColor) {
      selectedColor.classList.remove('selected');
    }
    event.target.classList.add('selected');
  });
}

for (let index = 0; index < pixelBoardColor.length; index += 1) {
  pixelBoardColor[index].addEventListener('click', (event) => {
    const selectedColor = document.querySelector('.selected');
    const eventTarget = event.target;
    eventTarget.style.backgroundColor = selectedColor.style.backgroundColor;
    //  ADICIONAR NO LOCALSTORAGE
    const arrToChange = JSON.parse(localStorage.getItem('pixelBoard'));
    arrToChange[index] = eventTarget.style.backgroundColor;
    localStorage.setItem('pixelBoard', JSON.stringify(arrToChange));
  });
}

//  LIMPAR BOARD

const clearButton = document.querySelector('#clear-board');
const clearFunction = () => {
  for (let index = 0; index < pixelBoardColor.length; index += 1) {
    pixelBoardColor[index].style.backgroundColor = 'white';
  }
  localStorage.setItem('pixelBoard', JSON.stringify(arrSaveBoard));
};
clearButton.addEventListener('click', clearFunction);
