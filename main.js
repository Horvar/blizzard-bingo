import './style.css'

const list = document.querySelector('.bingo__list');

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function createHtmlListFromArray(arr) {
  const shuffledArray = shuffleArray(arr);

  for (let i = 0; i < Math.sqrt(shuffledArray.length); i++) {
    for (let j = 0; j < Math.sqrt(shuffledArray.length); j++) {
      const listItem = document.createElement('li');
      listItem.className = 'bingo__item';
      listItem.textContent = shuffledArray[i * Math.sqrt(shuffledArray.length) + j];

      gameBoard[i][j] = listItem;

      listItem.addEventListener('click', function() {
        onListItemClick(i, j);
      });

      list.appendChild(listItem);
    }
  }

  return list;
}

function increaseScore() {
  const scoreElement = document.getElementById('score');
  const currentScore = parseInt(scoreElement.textContent, 10);
  scoreElement.textContent = currentScore + 1;
}

function decreaseScore() {
  const scoreElement = document.getElementById('score');
  const currentScore = parseInt(scoreElement.textContent, 10);
  scoreElement.textContent = currentScore - 1;
}

const size = 9;
const gameBoard = [];

for (let i = 0; i < size; i++) {
  gameBoard[i] = new Array(size).fill(null);
}

const arrayOfStrings = [
  "Starcraft 3",
  "Ведущие в ЛГБТ майках",
  "HOTS открывают",
  "Тизер аддона D4 меньше 50 секунд",
  "50 минут показывают Diablo Immortal",
  "Ведущие ждут реакции – в зале тишина",
  "Анонс, от которого все охуели",
  "Еще одна мобильная игра",
  "Аддон про титанов",
  "Порты для консолей",
  "Сильвана спасает Азерот",
  "Шутки над альянсом",
  "Изера – лицо нового аддона",
  "Нервный смех ведущего",
  "Метцен выносит на сцену Хаззикостаса",
  "Артефактное оружие возвращают",
  "Аддон про ОСТРОВА",
  "Метцен заливает про возвращение к корням",
  "Новый герой овервотча – токсичный мужик",
  "Что-то спиздили из GW или FF14",
  "Тинкер с двумя спеками",
  "50 минут восхваления WoW Classic",
  "Жидкий анонс Classic+ c нихуя в комплекте",
  "Новый класс, который никто не просил",
  "Новая игра в новой вселенной",
  "Освистали анонс",
  "Близард не знают лор своей игры",
  "Джайна лицо нового аддона",
  "Анонс 10.4",
  "Аддон про войдуху",
  "Апдейт старого мира",
  "Турнир по SC2, который никто не смотрит",
  "Мифик+ забег в декорациях",
  "Декорации с колоннами рухнули в прямом эфире",
  "Драгквины вместо косплееров",
  "Метцен несет чушь со сцены",
  "Катаклизма не будет",
  "Игры в геймпасе в 24 году",
  "Какой меч?",
  "Сильвана спасает Азерот",
  "Андуин",
  "Туралион и Аллерия",
  "Вспомнили про Ирель",
  "Очередное возвращение Кадгара",
  "Иллидан",
  "Ксалатат",
  "Иридикрон",
  "Тралл",
  "Титаны плохие",
  "Обратная сторона Азерота",
  "Полеты в космос",
  "Легион вернулся",
  "Наги вернулись",
  "Лорды элементалей",
  "Хаузинг",
  "Новые спеки",
  "Бард",
  "Новая раса",
  "Перерисовка скиллов",
  "Подводная локация",
  "Морские путешествия",
  "Эфириалы",
  "Натрезимы",
  "Новая схема мироустройства",
  "Сомнительная кастомизация",
  "Драконьи полеты на всех маунтах",
  "Переработка PvP",
  "Стандартный катаклизм",
  "Альтернативный катаклизм",
  "Новый Starcraft",
  "Новый Warcraft",
  "HOTS отключают",
  "Новая песня в Hearthstone",
  "Парень в красной рубашке без красной рубашки",
  "Heathstone закрывают",
  "Артас воскрес",
  "Что-то спиздили из GW или FF14",
  "World of Warcraft 2",
  "Overwatch 3",
  "Warcraft Rumble",
  "Starcraft на мобилах"
]

createHtmlListFromArray(arrayOfStrings);

function checkForCombos() {
  for (let i = 0; i < size; i++) {
      let horizontalCombo = 0;
      let verticalCombo = 0;
      let startHComboIndex = 0;
      let startVComboIndex = 0;

      for (let j = 0; j < size; j++) {
          if (gameBoard[i][j].classList.contains('active') && !gameBoard[i][j].classList.contains('scored')) {
              if(horizontalCombo === 0) startHComboIndex = j;
              horizontalCombo++;
          } else {
              applyScoreAndUpdateClass(horizontalCombo, 'row', i, startHComboIndex);
              horizontalCombo = 0;
          }

          if (gameBoard[j][i].classList.contains('active') && !gameBoard[j][i].classList.contains('scored')) {
              if(verticalCombo === 0) startVComboIndex = j;
              verticalCombo++;
          } else {
              applyScoreAndUpdateClass(verticalCombo, 'col', i, startVComboIndex);
              verticalCombo = 0;
          }
      }

      applyScoreAndUpdateClass(horizontalCombo, 'row', i, startHComboIndex);
      applyScoreAndUpdateClass(verticalCombo, 'col', i, startVComboIndex);
  }
}

function applyScoreAndUpdateClass(comboCount, rowOrCol, index, startIndex) {
  if (comboCount >= 3) {
      const scoreElement = document.getElementById('score');
      let currentScore = parseInt(scoreElement.textContent, 10);

      currentScore += comboCount;
      scoreElement.textContent = currentScore;

      for (let i = 0; i < comboCount; i++) {
          if (rowOrCol === 'row') {
              gameBoard[index][startIndex + i].classList.add('scored');
          } else if (rowOrCol === 'col') {
              gameBoard[startIndex + i][index].classList.add('scored');
          }
      }
  }
}

function onListItemClick(i, j) {
  const listItem = gameBoard[i][j];

  if (listItem.classList.contains('active')) {
      listItem.classList.remove('active');
      decreaseScore();
  } else {
      listItem.classList.add('active');
      increaseScore();
  }

  checkForCombos();
}
