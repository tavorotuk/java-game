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

document.getElementById('decrement').onclick = function() {
  const input = document.getElementById('guess');
  let value = Number(input.value) || 1;
  if (value > 1) input.value = value - 1;
};

document.getElementById('increment').onclick = function() {
  const input = document.getElementById('guess');
  let value = Number(input.value) || 1;
  if (value < 100) input.value = value + 1;
};