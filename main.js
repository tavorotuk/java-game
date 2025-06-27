'use strict'

// Створюємо просту інтерактивну гру: "Вгадай число"

let secret = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

document.getElementById('check').onclick = function() {
  const guess = Number(document.getElementById('guess').value);
  attempts++;
  let message = '';
  if (guess === secret) {
    message = `🎉 Вітаю, таворот! Ви вгадали число ${secret} за ${attempts} спроб.`;
    document.getElementById('check').disabled = true;

    // Відтворити аплодисменти
    const audio = new Audio('applause.mp3');
    audio.play();

    // Показати картинку-приз з анімацією чорної діри
    const prizeContainer = document.getElementById('prize-container');
    prizeContainer.innerHTML = ''; // Очистити попередню картинку, якщо була

    const img = document.createElement('img');
    img.src = 'prize.png'; // Покладіть свою картинку-приз у цю ж папку
    img.alt = 'Приз';
    img.className = 'prize-img';

    prizeContainer.appendChild(img);

    // Запускаємо анімацію
    setTimeout(() => {
      img.classList.add('show');
    }, 10);

    // Прибрати картинку після завершення анімації (1с з'явлення + 2с показ + 1с зникнення = 4с)
    setTimeout(() => {
      if (img.parentNode) img.parentNode.removeChild(img);
    }, 4000);

    // Додаємо кнопку "Спробувати ще раз"
    if (!document.getElementById('retry')) {
      const retryBtn = document.createElement('button');
      retryBtn.id = 'retry';
      retryBtn.textContent = 'Спробувати ще раз';
      retryBtn.onclick = function() {
        // Скидаємо гру
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
    message = 'Спробуйте більше число!';
  } else if (guess > secret) {
    message = 'Спробуйте менше число!';
  } else {
    message = 'Введіть коректне число!';
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