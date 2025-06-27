'use strict'

// Створюємо просту інтерактивну гру: "Вгадай число"

let secret = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

const translations = {
  ua: {
    title: 'Вгадай число від 1 до 100!',
    check: 'Перевірити',
    retry: 'Спробувати ще раз',
    win: (secret, attempts) => `🎉 Вітаю, таворот! Ви вгадали число ${secret} за ${attempts} спроб.`,
    more: 'Спробуйте більше число!',
    less: 'Спробуйте менше число!',
    wrong: 'Введіть коректне число!'
  },
  pl: {
    title: 'Zgadnij liczbę od 1 do 100!',
    check: 'Sprawdź',
    retry: 'Spróbuj ponownie',
    win: (secret, attempts) => `🎉 Brawo! Zgadłeś liczbę ${secret} w ${attempts} próbach.`,
    more: 'Spróbuj większą liczbę!',
    less: 'Spróbuj mniejszą liczbę!',
    wrong: 'Wpisz poprawną liczbę!'
  }
};

let currentLang = 'ua';

function setLang(lang) {
  currentLang = lang;
  document.getElementById('game-title').textContent = translations[lang].title;
  document.getElementById('check').textContent = translations[lang].check;
  document.getElementById('pl-btn').classList.toggle('active', lang === 'pl');
  document.getElementById('ua-btn').classList.toggle('active', lang === 'ua');
  const retryBtn = document.getElementById('retry');
  if (retryBtn) retryBtn.textContent = translations[lang].retry;
  document.getElementById('result').textContent = '';
}

document.getElementById('pl-btn').onclick = () => setLang('pl');
document.getElementById('ua-btn').onclick = () => setLang('ua');

// Додаємо зміну текстів у основній логіці гри:
document.getElementById('check').onclick = function() {
  const guess = Number(document.getElementById('guess').value);
  attempts++;
  let message = '';
  if (guess === secret) {
    message = translations[currentLang].win(secret, attempts);
    document.getElementById('check').disabled = true;

    // Відтворити аплодисменти
    const audio = new Audio('applause.mp3');
    audio.play();

    // Показати картинку-приз з анімацією чорної діри
    const prizeContainer = document.getElementById('prize-container');
    prizeContainer.innerHTML = '';

    const img = document.createElement('img');
    img.src = 'prize.png';
    img.alt = 'Приз';
    img.className = 'prize-img';

    prizeContainer.appendChild(img);

    setTimeout(() => {
      img.classList.add('show');
    }, 10);

    setTimeout(() => {
      prizeContainer.innerHTML = '';
    }, 4000);

    // Додаємо кнопку "Спробувати ще раз"
    if (!document.getElementById('retry')) {
      const retryBtn = document.createElement('button');
      retryBtn.id = 'retry';
      retryBtn.textContent = translations[currentLang].retry;
      retryBtn.onclick = function() {
        secret = Math.floor(Math.random() * 100) + 1;
        attempts = 0;
        document.getElementById('check').disabled = false;
        document.getElementById('result').textContent = '';
        document.getElementById('guess').value = '';
        retryBtn.remove();
      };
      document.getElementById('result').after(retryBtn);
    }
  } else if (guess < secret) {
    message = translations[currentLang].more;
  } else if (guess > secret) {
    message = translations[currentLang].less;
  } else {
    message = translations[currentLang].wrong;
  }
  document.getElementById('result').textContent = message;
};

// Додаємо кнопки + і - тільки на мобільних пристроях
function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

const guessInput = document.getElementById('guess');
const guessRange = document.getElementById('guess-range');

if (isMobile()) {
  guessRange.style.display = '';
  guessInput.style.width = '60px';
  guessInput.value = guessRange.value = 1;

  // Слайдер → input
  guessRange.oninput = function() {
    guessInput.value = this.value;
  };
  // input → слайдер
  guessInput.oninput = function() {
    let val = parseInt(this.value, 10);
    if (isNaN(val) || val < 1) val = 1;
    if (val > 100) val = 100;
    this.value = val;
    guessRange.value = val;
  };
} else {
  guessRange.style.display = 'none';
}