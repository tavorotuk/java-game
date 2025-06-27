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
  // Активна кнопка
  document.getElementById('pl-btn').classList.toggle('active', lang === 'pl');
  document.getElementById('ua-btn').classList.toggle('active', lang === 'ua');
  // Якщо є кнопка retry
  const retryBtn = document.getElementById('retry');
  if (retryBtn) retryBtn.textContent = translations[lang].retry;
  // Очистити результат
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

if (isMobile()) {
  const inputRow = document.querySelector('.input-row');
  const input = document.getElementById('guess');

  const decrementBtn = document.createElement('button');
  decrementBtn.type = 'button';
  decrementBtn.className = 'arrow-btn';
  decrementBtn.id = 'decrement';
  decrementBtn.textContent = '−';

  const incrementBtn = document.createElement('button');
  incrementBtn.type = 'button';
  incrementBtn.className = 'arrow-btn';
  incrementBtn.id = 'increment';
  incrementBtn.textContent = '+';

  // Додаємо кнопки одразу після input
  input.after(decrementBtn, incrementBtn);

  decrementBtn.onclick = function() {
    let value = parseInt(input.value, 10);
    if (isNaN(value) || value <= 1) {
      input.value = 1;
    } else {
      input.value = value - 1;
    }
    input.focus();
  };

  incrementBtn.onclick = function() {
    let value = parseInt(input.value, 10);
    if (isNaN(value) || value >= 100) {
      input.value = 100;
    } else {
      input.value = value + 1;
    }
    input.focus();
  };
}