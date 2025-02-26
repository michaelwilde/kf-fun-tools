const output = document.getElementById('output');
const input = document.getElementById('input');
const terminal = document.getElementById('terminal');
const canvas = document.getElementById('game-canvas');
const prompt = document.getElementById('prompt');
const cursor = document.getElementById('cursor');
const inputWrapper = document.getElementById('input-wrapper');

let isHacked = false;

// ROYGBIV colors
const roybgivColors = [
  '#FF0000', // Red
  '#FFA500', // Orange
  '#FFFF00', // Yellow
  '#00FF00', // Green
  '#0000FF', // Blue
  '#4B0082', // Indigo
  '#EE82EE'  // Violet
];

input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const command = input.value.trim().toLowerCase();
    processCommand(command);
    input.value = '';
    updateCursorPosition();
  }
});

input.addEventListener('input', updateCursorPosition);

function updateCursorPosition() {
  const charWidth = 10.8;
  const textLength = input.value.length;
  cursor.style.left = `${textLength * charWidth}px`;
}

function applyPrideTheme() {
  terminal.style.background = '#000';
  terminal.style.color = '#fff'; // Base color, overridden by ROYGBIV
  prompt.style.color = roybgivColors[0]; // Prompt gets Red
  input.style.color = roybgivColors[1]; // Input gets Orange
  cursor.style.background = roybgivColors[2]; // Cursor gets Yellow
  canvas.style.borderColor = '#fff';

  // Apply ROYGBIV to existing output lines
  const outputLines = output.querySelectorAll('div');
  outputLines.forEach((line, index) => {
    line.style.color = roybgivColors[(index + 3) % 7]; // Start at Green (3rd color) for responses
  });
}

function processCommand(cmd) {
  let response = '';
  switch (cmd) {
    case 'help':
      response = 'Kloudfuse OS Version 3.3\nCommands: whoami, about, hack, joke, explore, theme [dark/light/neon/pride], clear' + (isHacked ? ', exit' : '');
      break;
    case 'whoami':
      response = 'curious@kloudfuse.com';
      break;
    case 'about':
      response = 'Kloudfuse OS Version 3.3\nWe are Kloudfuse, full stack observability. Hosted by you. Managed by us. Far less expensive. Far more secure.';
      break;
    case 'hack':
      output.innerHTML += '<div id="hack-output">Hacking initiated.</div>';
      terminal.scrollTop = terminal.scrollHeight;
      let dots = 0;
      const hackInterval = setInterval(() => {
        dots++;
        document.getElementById('hack-output').innerText = 'Hacking initiated.' + '.'.repeat(dots);
        terminal.scrollTop = terminal.scrollHeight;
        if (terminal.style.color === '#fff') { // If in pride mode
          document.getElementById('hack-output').style.color = roybgivColors[(dots + 2) % 7]; // Cycle ROYGBIV
        }
      }, 300);
      setTimeout(() => {
        clearInterval(hackInterval);
        output.innerHTML += '<div>ACCESS GRANTED</div>';
        prompt.innerText = 'root@kloudfuse> ';
        isHacked = true;
        if (terminal.style.color === '#fff') { // If in pride mode
          applyPrideTheme(); // Reapply to update prompt and new line
        }
        terminal.scrollTop = terminal.scrollHeight;
      }, 3000);
      return;
    case 'joke':
      const jokes = [
        "Why don’t skeletons fight each other? They don’t have the guts.",
        "What do you call fake spaghetti? An impasta.",
        "Why don’t eggs tell jokes? They’d crack up.",
        "What’s orange and sounds like a parrot? A carrot.",
        "Why don’t programmers prefer dark mode? The light attracts bugs.",
        "What do you call cheese that isn’t yours? Nacho cheese!",
        "Why did the tomato turn red? Because it saw the salad dressing!",
        "What has 4 legs and 1 arm? A pitbull coming back from the park!",
        "Why don’t cows have money? Because the farmers milk them dry.",
        "What do you call a bear with no socks on? Barefoot.",
        "Why did the banana go to the doctor? It wasn’t peeling well.",
        "What’s brown and sticky? A stick.",
        "Why don’t programmers like nature? Too many bugs.",
        "What do you call a fish with no eyes? A fsh.",
        "Why did the math book look sad? It had too many problems.",
        "What’s a skeleton’s favorite instrument? The trom-bone.",
        "Why don’t skeletons play music? They have no organs.",
        "What do you call a sleeping bull? A bulldozer.",
        "Why did the coffee file a police report? It got mugged.",
        "What’s a pirate’s favorite letter? You’d think it’s R, but it’s the C."
      ];
      response = jokes[Math.floor(Math.random() * jokes.length)];
      break;
    case 'explore':
      const options = [
        { name: 'Platform', url: 'https://www.kloudfuse.com/capabilities/unified-observability-platform' },
        { name: 'Playground', url: 'https://playground.kloudfuse.io' },
        { name: 'Pricing', url: 'https://kloudfuse.com/pricing' }
      ];
      const randomIndex = Math.floor(Math.random() * options.length);
      const choice = options[randomIndex];
      output.innerHTML += `<div id="explore-output">Navigating to ${choice.name}...</div>`;
      terminal.scrollTop = terminal.scrollHeight;
      setTimeout(() => {
        output.innerHTML += "<div>Opening a new tab, don’t worry terminal is still here, come back and hang out!</div>";
        window.open(choice.url, '_blank');
        if (terminal.style.color === '#fff') { // If in pride mode
          applyPrideTheme(); // Reapply to color new line
        }
        terminal.scrollTop = terminal.scrollHeight;
      }, 2000);
      return;
    case 'theme dark':
      terminal.style.background = '#000';
      terminal.style.color = '#0f0';
      prompt.style.color = '#0f0';
      input.style.color = '#0f0';
      cursor.style.background = '#0f0';
      canvas.style.borderColor = '#0f0';
      output.style.color = '#0f0'; // Reset output color
      const outputLinesDark = output.querySelectorAll('div');
      outputLinesDark.forEach(line => line.style.color = '#0f0'); // Reset all lines
      response = 'Theme set to dark.';
      break;
    case 'theme light':
      terminal.style.background = '#fff';
      terminal.style.color = '#4B0082';
      prompt.style.color = '#4B0082';
      input.style.color = '#4B0082';
      cursor.style.background = '#4B0082';
      canvas.style.borderColor = '#4B0082';
      output.style.color = '#4B0082'; // Reset output color
      const outputLinesLight = output.querySelectorAll('div');
      outputLinesLight.forEach(line => line.style.color = '#4B0082'); // Reset all lines
      response = 'Theme set to light.';
      break;
    case 'theme neon':
      terminal.style.background = '#000';
      terminal.style.color = '#ff0';
      prompt.style.color = '#ff0';
      input.style.color = '#ff0';
      cursor.style.background = '#ff0';
      canvas.style.borderColor = '#ff0';
      output.style.color = '#ff0'; // Reset output color
      const outputLinesNeon = output.querySelectorAll('div');
      outputLinesNeon.forEach(line => line.style.color = '#ff0'); // Reset all lines
      response = 'Theme set to neon.';
      break;
    case 'theme pride':
      applyPrideTheme();
      response = 'Theme set to pride. 🌈';
      break;
    case 'sudo rm -rf /':
      response = 'Nice try, but I’m not THAT Linux.';
      break;
    case '42':
      response = 'The answer to life, the universe, and everything.';
      break;
    case 'clear':
      output.innerHTML = '';
      return;
    case 'exit':
      if (isHacked) {
        prompt.innerText = 'kloudfuse> ';
        isHacked = false;
        response = 'Logged out of root access.';
      } else {
        response = 'Not in root mode.';
      }
      break;
    case 'game brickout':
      startBrickoutGame();
      return;
    case 'game tetris':
      startTetrisGame();
      return;
    case 'game':
      response = 'Choose a game: game brickout, game tetris';
      break;
    default:
      response = `Command not found: ${cmd}. Type 'help' for options.`;
  }
  const responseDiv = document.createElement('div');
  responseDiv.innerHTML = response.replace('\n', '<br>');
  output.appendChild(responseDiv);
  if (terminal.style.color === '#fff') { // If in pride mode
    const outputLines = output.querySelectorAll('div');
    outputLines.forEach((line, index) => {
      line.style.color = roybgivColors[(index + 3) % 7]; // Start at Green for responses
    });
  }
  terminal.scrollTop = terminal.scrollHeight;
}

// Brickout Game
function startBrickoutGame() {
  output.innerHTML = '<div>Starting Brickout... Use ← and → keys to move the paddle! Esc or Ctrl-C to exit.</div>';
  if (terminal.style.color === '#fff') { // If in pride mode
    applyPrideTheme();
  }
  canvas.style.display = 'block';
  input.disabled = true;

  const ctx = canvas.getContext('2d');
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  const WIDTH = canvas.width;
  const HEIGHT = canvas.height;

  let ball = { x: WIDTH / 2, y: HEIGHT - 30, dx: 8, dy: -8, radius: 10 };
  let paddle = { x: WIDTH / 2 - 50, y: HEIGHT - 20, width: 100, height: 10, speed: 7 };
  let bricks = [];
  const brickRowCount = 6;
  const brickColumnCount = Math.floor(WIDTH / 110);
  const brickWidth = 100;
  const brickHeight = 30;
  const brickPadding = 10;
  const brickOffsetTop = 30;
  const brickOffsetLeft = (WIDTH - (brickColumnCount * (brickWidth + brickPadding) - brickPadding)) / 2;

  for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++) {
      bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
  }

  let rightPressed = false;
  let leftPressed = false;
  document.addEventListener('keydown', keyDownHandler);
  document.addEventListener('keyup', keyUpHandler);

  function keyDownHandler(e) {
    if (e.key === 'ArrowRight') rightPressed = true;
    else if (e.key === 'ArrowLeft') leftPressed = true;
    if (e.key === 'Escape' || (e.ctrlKey && e.key === 'c')) {
      endGame();
      output.innerHTML = '';
    }
  }
  function keyUpHandler(e) {
    if (e.key === 'ArrowRight') rightPressed = false;
    else if (e.key === 'ArrowLeft') leftPressed = false;
  }

  function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = '#808080';
    ctx.fill();
    ctx.closePath();
  }

  function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddle.x, paddle.y, paddle.width, paddle.height);
    ctx.fillStyle = '#8B4513';
    ctx.fill();
    ctx.closePath();
  }

  function drawBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
      for (let r = 0; r < brickRowCount; r++) {
        if (bricks[c][r].status === 1) {
          const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
          const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
          bricks[c][r].x = brickX;
          bricks[c][r].y = brickY;
          ctx.fillStyle = '#8B4513';
          ctx.fillRect(brickX, brickY, brickWidth, brickHeight);
          ctx.strokeStyle = '#D2B48C';
          ctx.lineWidth = 2;
          ctx.strokeRect(brickX, brickY, brickWidth, brickHeight);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
          ctx.fillRect(brickX, brickY, brickWidth - 4, 4);
          ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
          ctx.fillRect(brickX, brickY + brickHeight - 4, brickWidth - 4, 4);
        }
      }
    }
  }

  function collisionDetection() {
    for (let c = 0; c < brickColumnCount; c++) {
      for (let r = 0; r < brickRowCount; r++) {
        const b = bricks[c][r];
        if (b.status === 1) {
          if (ball.x > b.x && ball.x < b.x + brickWidth && ball.y > b.y && ball.y < b.y + brickHeight) {
            ball.dy = -ball.dy;
            b.status = 0;
          }
        }
      }
    }
  }

  function draw() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    drawBricks();
    drawBall();
    drawPaddle();
    collisionDetection();

    if (ball.x + ball.dx > WIDTH - ball.radius || ball.x + ball.dx < ball.radius) ball.dx = -ball.dx;
    if (ball.y + ball.dy < ball.radius) ball.dy = -ball.dy;
    else if (ball.y + ball.dy > paddle.y - ball.radius) {
      if (ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
        ball.dy = -ball.dy;
        ball.y = paddle.y - ball.radius;
      } else if (ball.y + ball.dy > HEIGHT - ball.radius) {
        output.innerHTML += '<div>Game Over! Type anything to continue.</div>';
        if (terminal.style.color === '#fff') applyPrideTheme();
        endGame();
        return;
      }
    }
    ball.x += ball.dx;
    ball.y += ball.dy;

    if (rightPressed && paddle.x < WIDTH - paddle.width) paddle.x += paddle.speed;
    if (leftPressed && paddle.x > 0) paddle.x -= paddle.speed;

    requestAnimationFrame(draw);
  }

  function endGame() {
    canvas.style.display = 'none';
    input.disabled = false;
    input.focus();
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    document.removeEventListener('keydown', keyDownHandler);
    document.removeEventListener('keyup', keyUpHandler);
  }

  draw();
}

// Tetris Game
function startTetrisGame() {
  output.innerHTML = '<div>Starting Tetris... Use ← → to move, ↑ to rotate, ↓ to drop! Esc or Ctrl-C to exit.</div>';
  if (terminal.style.color === '#fff') applyPrideTheme();
  canvas.style.display = 'block';
  input.disabled = true;

  const ctx = canvas.getContext('2d');
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  const WIDTH = canvas.width;
  const HEIGHT = canvas.height;
  const gridSize = 20;
  const cols = 20;
  const playWidth = cols * gridSize;
  const rows = Math.floor(HEIGHT / gridSize) - 4;
  const offsetX = (WIDTH - playWidth) / 2;
  const board = Array(rows).fill().map(() => Array(cols).fill(0));

  const shapes = [
    [[1, 1, 1, 1]], // I
    [[1, 1], [1, 1]], // O
    [[1, 1, 1], [0, 1, 0]], // T
    [[1, 1, 1], [1, 0, 0]], // L
    [[1, 1, 1], [0, 0, 1]] // J
  ];
  const colors = ['#00FFFF', '#FFFF00', '#FF00FF', '#FFA500', '#0000FF'];

  let currentShape = randomShape();
  let currentX = Math.floor(cols / 2) - Math.floor(currentShape[0].length / 2);
  let currentY = -currentShape.length;

  function randomShape() {
    const index = Math.floor(Math.random() * shapes.length);
    return shapes[index].map(row => [...row]);
  }

  function drawBoard() {
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (board[r][c]) {
          ctx.fillStyle = board[r][c];
          ctx.fillRect(offsetX + c * gridSize, (r + 4) * gridSize, gridSize - 1, gridSize - 1);
        }
      }
    }
  }

  function drawShape() {
    for (let r = 0; r < currentShape.length; r++) {
      for (let c = 0; c < currentShape[r].length; c++) {
        if (currentShape[r][c] && currentY + r >= 0) {
          ctx.fillStyle = colors[shapes.indexOf(shapes.find(s => s.toString() === currentShape.toString()))];
          ctx.fillRect(offsetX + (currentX + c) * gridSize, (currentY + r + 4) * gridSize, gridSize - 1, gridSize - 1);
        }
      }
    }
  }

  function drawBackgroundAndLogo() {
    ctx.fillStyle = '#1A3C1A';
    ctx.fillRect(0, 0, offsetX, HEIGHT);
    ctx.fillRect(offsetX + playWidth, 0, offsetX, HEIGHT);
    ctx.fillStyle = '#000000';
    ctx.fillRect(offsetX, 0, playWidth, HEIGHT);
    ctx.fillStyle = '#0f0';
    ctx.font = 'bold 40px Roboto Mono';
    ctx.textAlign = 'center';
    ctx.shadowColor = '#00FF00';
    ctx.shadowBlur = 5;
    ctx.shadowOffsetX = 3;
    ctx.shadowOffsetY = 3;
    ctx.fillText('KLOUDFUSE', WIDTH / 2, gridSize * 3);
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.fillRect(offsetX, gridSize * 0.25, playWidth, 10);
    ctx.fillRect(offsetX, gridSize * 4, playWidth, 10);
  }

  function drawGameOverModal() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillRect(offsetX, HEIGHT / 2 - 50, playWidth, 100);
    ctx.strokeStyle = '#0f0';
    ctx.lineWidth = 2;
    ctx.strokeRect(offsetX, HEIGHT / 2 - 50, playWidth, 100);
    ctx.fillStyle = '#0f0';
    ctx.font = 'bold 30px Roboto Mono';
    ctx.textAlign = 'center';
    ctx.fillText('GAME OVER', WIDTH / 2, HEIGHT / 2 + 10);
  }

  function collide(x, y, shape) {
    for (let r = 0; r < shape.length; r++) {
      for (let c = 0; c < shape[r].length; c++) {
        if (shape[r][c]) {
          const newX = x + c;
          const newY = y + r;
          if (newX < 0 || newX >= cols || newY >= rows || (newY >= 0 && board[newY][newX])) {
            return true;
          }
        }
      }
    }
    return false;
  }

  function merge() {
    for (let r = 0; r < currentShape.length; r++) {
      for (let c = 0; c < currentShape[r].length; c++) {
        if (currentShape[r][c] && currentY + r >= 0) {
          board[currentY + r][currentX + c] = colors[shapes.indexOf(shapes.find(s => s.toString() === currentShape.toString()))];
        }
      }
    }
  }

  function clearLines() {
    for (let r = rows - 1; r >= 0; r--) {
      if (board[r].every(cell => cell)) {
        board.splice(r, 1);
        board.unshift(Array(cols).fill(0));
      }
    }
  }

  function rotateShape() {
    const rotated = currentShape[0].map((_, index) => currentShape.map(row => row[index]).reverse());
    if (!collide(currentX, currentY, rotated)) {
      currentShape = rotated;
    }
  }

  let dropCounter = 0;
  const dropInterval = 30;

  document.addEventListener('keydown', keyDownHandler);
  document.addEventListener('keyup', keyUpHandler);

  let leftPressed = false;
  let rightPressed = false;
  let downPressed = false;
  function keyDownHandler(e) {
    if (e.key === 'ArrowLeft') leftPressed = true;
    else if (e.key === 'ArrowRight') rightPressed = true;
    else if (e.key === 'ArrowDown') downPressed = true;
    else if (e.key === 'ArrowUp' && !e.repeat) rotateShape();
    if (e.key === 'Escape' || (e.ctrlKey && e.key === 'c')) {
      drawGameOverModal();
      setTimeout(() => {
        endGame();
        output.innerHTML = '';
      }, 1000);
    }
  }
  function keyUpHandler(e) {
    if (e.key === 'ArrowLeft') leftPressed = false;
    else if (e.key === 'ArrowRight') rightPressed = false;
    else if (e.key === 'ArrowDown') downPressed = false;
  }

  function draw() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    drawBackgroundAndLogo();
    drawBoard();
    drawShape();

    dropCounter++;
    if (dropCounter >= dropInterval || downPressed) {
      if (!collide(currentX, currentY + 1, currentShape)) {
        currentY++;
      } else if (currentY < 0) {
        // Shape still above play area
      } else {
        merge();
        clearLines();
        currentShape = randomShape();
        currentX = Math.floor(cols / 2) - Math.floor(currentShape[0].length / 2);
        currentY = -currentShape.length;
        if (collide(currentX, currentY, currentShape)) {
          drawGameOverModal();
          setTimeout(() => {
            endGame();
            output.innerHTML = '<div>Game Over! Type anything to continue.</div>';
            if (terminal.style.color === '#fff') applyPrideTheme();
          }, 1000);
          return;
        }
      }
      dropCounter = 0;
    }

    if (leftPressed && !collide(currentX - 1, currentY, currentShape)) currentX--;
    if (rightPressed && !collide(currentX + 1, currentY, currentShape)) currentX++;

    requestAnimationFrame(draw);
  }

  function endGame() {
    canvas.style.display = 'none';
    input.disabled = false;
    input.focus();
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    document.removeEventListener('keydown', keyDownHandler);
    document.removeEventListener('keyup', keyUpHandler);
  }

  draw();
}
