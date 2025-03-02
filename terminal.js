const output = document.getElementById('output');
const input = document.getElementById('input');
const terminal = document.getElementById('terminal');
const canvas = document.getElementById('game-canvas');
const prompt = document.getElementById('prompt');
const cursor = document.getElementById('cursor');
const inputWrapper = document.getElementById('input-wrapper');
const header = document.getElementById('header');

let isHacked = false;

// Lighter ROYGBIV colors
const roybgivColors = [
  '#FF6666', // Light Red
  '#FFCC66', // Light Orange
  '#FFFF99', // Light Yellow
  '#66FF66', // Light Green
  '#66CCFF', // Light Blue
  '#9999FF', // Light Indigo
  '#FF99FF'  // Light Violet
];

// Auto-trigger help after 30 seconds
window.addEventListener('load', () => {
  setTimeout(() => {
    const autoMessageDiv = document.createElement('div');
    autoMessageDiv.textContent = "ok, i'll help. lets ask for help";
    output.appendChild(autoMessageDiv);
    terminal.scrollTop = terminal.scrollHeight;
    processCommand('help');
  }, 30000); // 30 seconds
});

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

function applyRainbowText(element, text) {
  element.innerHTML = '';
  for (let i = 0; i < text.length; i++) {
    const span = document.createElement('span');
    span.textContent = text[i];
    span.style.color = roybgivColors[i % 7];
    element.appendChild(span);
  }
}

function applyCharityTheme() {
  terminal.style.background = '#000';
  terminal.style.color = '#fff';
  applyRainbowText(header.querySelector('a'), 'Kloudfuse OS Version 3.3');
  applyRainbowText(prompt, isHacked ? 'root@kloudfuse> ' : 'kloudfuse> ');
  input.style.color = roybgivColors[0]; // Light red for input
  cursor.style.background = roybgivColors[0];
  canvas.style.borderColor = '#fff';

  const outputLines = output.querySelectorAll('div');
  outputLines.forEach((line) => {
    const text = line.textContent;
    line.innerHTML = '';
    applyRainbowText(line, text);
  });
}

function processCommand(cmd) {
  let response = '';
  const [command, arg] = cmd.split(' ');

  switch (command) {
    case 'help':
    case 'man':
      response = 'Commands: whoami, about, hack, joke, explore, theme, clear, game, refine' + (isHacked ? ', exit' : '');
      break;
    case '?':
    case 'about':
      response = 'We are Kloudfuse, full stack observability. Hosted by you. Managed by us. Far less expensive. Far more secure.';
      break;
    case 'whoami':
      response = 'curious@kloudfuse.com';
      break;
    case 'hack':
      output.innerHTML += '<div id="hack-output">Hacking initiated.</div>';
      terminal.scrollTop = terminal.scrollHeight;
      let dots = 0;
      const hackInterval = setInterval(() => {
        dots++;
        const hackText = 'Hacking initiated.' + '.'.repeat(dots);
        const hackOutput = document.getElementById('hack-output');
        hackOutput.innerHTML = '';
        if (terminal.style.color === '#fff') {
          applyRainbowText(hackOutput, hackText);
        } else {
          hackOutput.textContent = hackText;
        }
        terminal.scrollTop = terminal.scrollHeight;
      }, 300);
      setTimeout(() => {
        clearInterval(hackInterval);
        const grantedDiv = document.createElement('div');
        if (terminal.style.color === '#fff') {
          applyRainbowText(grantedDiv, 'ACCESS GRANTED');
        } else {
          grantedDiv.textContent = 'ACCESS GRANTED';
        }
        output.appendChild(grantedDiv);
        prompt.innerText = 'root@kloudfuse> ';
        isHacked = true;
        if (terminal.style.color === '#fff') {
          applyCharityTheme();
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
      const exploreOptions = {
        'platform': { name: 'Platform', url: 'https://www.kloudfuse.com/capabilities/unified-observability-platform' },
        'playground': { name: 'Playground', url: 'https://playground.kloudfuse.io' },
        'customers': { name: 'Customers', url: 'https://www.kloudfuse.com/customers' },
        'people': { name: 'People', url: 'https://www.kloudfuse.com/company' },
        'blogs': { name: 'Blogs', url: 'https://www.kloudfuse.com/blog' },
        'videos': { name: 'Videos', url: 'https://youtube.com/@kloudfuse/videos' },
        'docs': { name: 'Docs', url: 'https://docs.kloudfuse.com' }
      };
      if (arg && exploreOptions[arg]) {
        const choice = exploreOptions[arg];
        const exploreDiv = document.createElement('div');
        exploreDiv.id = 'explore-output';
        if (terminal.style.color === '#fff') {
          applyRainbowText(exploreDiv, `Navigating to ${choice.name}...`);
        } else {
          exploreDiv.textContent = `Navigating to ${choice.name}...`;
        }
        output.appendChild(exploreDiv);
        terminal.scrollTop = terminal.scrollHeight;
        setTimeout(() => {
          const tabDiv = document.createElement('div');
          if (terminal.style.color === '#fff') {
            applyRainbowText(tabDiv, "Opening a new tab, don’t worry terminal is still here, come back and hang out!");
          } else {
            tabDiv.textContent = "Opening a new tab, don’t worry terminal is still here, come back and hang out!";
          }
          output.appendChild(tabDiv);
          window.open(choice.url, '_blank');
          if (terminal.style.color === '#fff') {
            applyCharityTheme();
          }
          terminal.scrollTop = terminal.scrollHeight;
        }, 2000);
      } else {
        response = 'Usage: explore [platform/playground/customers/people/blogs/videos/docs]';
      }
      break;
    case 'theme':
      switch (arg) {
        case 'dark':
          terminal.style.background = '#000';
          terminal.style.color = '#0f0';
          header.style.color = '#0f0';
          header.querySelector('a').innerHTML = 'Kloudfuse OS Version 3.3';
          header.querySelector('a').style.color = '#0f0';
          prompt.innerHTML = isHacked ? 'root@kloudfuse> ' : 'kloudfuse> ';
          prompt.style.color = '#0f0';
          input.style.color = '#0f0';
          cursor.style.background = '#0f0';
          canvas.style.borderColor = '#0f0';
          output.style.color = '#0f0';
          const outputLinesDark = output.querySelectorAll('div');
          outputLinesDark.forEach(line => {
            line.innerHTML = line.textContent;
            line.style.color = '#0f0';
          });
          response = 'Theme set to dark.';
          break;
        case 'light':
          terminal.style.background = '#fff';
          terminal.style.color = '#4B0082';
          header.style.color = '#4B0082';
          header.querySelector('a').innerHTML = 'Kloudfuse OS Version 3.3';
          header.querySelector('a').style.color = '#4B0082';
          prompt.innerHTML = isHacked ? 'root@kloudfuse> ' : 'kloudfuse> ';
          prompt.style.color = '#4B0082';
          input.style.color = '#4B0082';
          cursor.style.background = '#4B0082';
          canvas.style.borderColor = '#4B0082';
          output.style.color = '#4B0082';
          const outputLinesLight = output.querySelectorAll('div');
          outputLinesLight.forEach(line => {
            line.innerHTML = line.textContent;
            line.style.color = '#4B0082';
          });
          response = 'Theme set to light.';
          break;
        case 'neon':
          terminal.style.background = '#000';
          terminal.style.color = '#ff0';
          header.style.color = '#ff0';
          header.querySelector('a').innerHTML = 'Kloudfuse OS Version 3.3';
          header.querySelector('a').style.color = '#ff0';
          prompt.innerHTML = isHacked ? 'root@kloudfuse> ' : 'kloudfuse> ';
          prompt.style.color = '#ff0';
          input.style.color = '#ff0';
          cursor.style.background = '#ff0';
          canvas.style.borderColor = '#ff0';
          output.style.color = '#ff0';
          const outputLinesNeon = output.querySelectorAll('div');
          outputLinesNeon.forEach(line => {
            line.innerHTML = line.textContent;
            line.style.color = '#ff0';
          });
          response = 'Theme set to neon.';
          break;
        case 'charity':
          applyCharityTheme();
          response = 'Theme set to charity. 🌈';
          break;
        default:
          response = 'Usage: theme [dark/light/neon/charity]';
      }
      break;
    case 'sudo':
      if (cmd === 'sudo rm -rf /') {
        response = 'Nice try, but I’m not THAT Linux.';
      } else {
        response = `Command not found: ${cmd}. Type 'help' for options.`;
      }
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
        if (terminal.style.color === '#fff') applyCharityTheme();
        else prompt.style.color = terminal.style.color;
      } else {
        response = 'Not in root mode.';
      }
      break;
    case 'game':
      if (!arg) {
        response = 'Choose a game: game brickout, game tetris, game joshua';
      } else {
        switch (arg) {
          case 'brickout':
            startBrickoutGame();
            return;
          case 'tetris':
            startTetrisGame();
            return;
          case 'joshua':
            output.innerHTML += '<div id="wargames-output"></div>';
            const wargamesOutput = document.getElementById('wargames-output');
            if (terminal.style.color === '#fff') {
              applyRainbowText(wargamesOutput, 'Shall we play a game?');
            } else {
              wargamesOutput.textContent = 'Shall we play a game?';
            }
            terminal.scrollTop = terminal.scrollHeight;
            setTimeout(() => {
              const launchDiv = document.createElement('div');
              if (terminal.style.color === '#fff') {
                applyRainbowText(launchDiv, 'Simulating Global Thermonuclear War...');
              } else {
                launchDiv.textContent = 'Simulating Global Thermonuclear War...';
              }
              output.appendChild(launchDiv);
              terminal.scrollTop = terminal.scrollHeight;
              let countdown = 5;
              const countdownInterval = setInterval(() => {
                const countDiv = document.createElement('div');
                if (terminal.style.color === '#fff') {
                  applyRainbowText(countDiv, `Launch in ${countdown}...`);
                } else {
                  countDiv.textContent = `Launch in ${countdown}...`;
                }
                output.appendChild(countDiv);
                terminal.scrollTop = terminal.scrollHeight;
                countdown--;
                if (countdown < 0) {
                  clearInterval(countdownInterval);
                  const endDiv = document.createElement('div');
                  if (terminal.style.color === '#fff') {
                    applyRainbowText(endDiv, 'A strange game. The only winning move is not to play.');
                  } else {
                    endDiv.textContent = 'A strange game. The only winning move is not to play.';
                  }
                  output.appendChild(endDiv);
                  terminal.scrollTop = terminal.scrollHeight;
                  setTimeout(() => {
                    const chessDiv = document.createElement('div');
                    if (terminal.style.color === '#fff') {
                      applyRainbowText(chessDiv, 'How about a nice game of chess?');
                    } else {
                      chessDiv.textContent = 'How about a nice game of chess?';
                    }
                    output.appendChild(chessDiv);
                    terminal.scrollTop = terminal.scrollHeight;
                  }, 1000);
                }
              }, 500);
            }, 1000);
            return;
          default:
            response = `Unknown game: ${arg}. Choose: game brickout, game tetris, game joshua`;
        }
      }
      break;
    case 'refine':
      startMDRGame();
      return;
    default:
      response = `Command not found: ${cmd}. Type 'help' for options.`;
  }
  const responseDiv = document.createElement('div');
  if (terminal.style.color === '#fff') {
    applyRainbowText(responseDiv, response.replace('\n', '<br>'));
  } else {
    responseDiv.innerHTML = response.replace('\n', '<br>');
  }
  output.appendChild(responseDiv);
  terminal.scrollTop = terminal.scrollHeight;
}

// Brickout Game
function startBrickoutGame() {
  output.innerHTML = '<div>Starting Brickout... Use ← and → keys to move the paddle! Esc or Ctrl-C to exit.</div>';
  if (terminal.style.color === '#fff') {
    const brickoutDiv = output.lastChild;
    applyRainbowText(brickoutDiv, brickoutDiv.textContent);
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
        if (terminal.style.color === '#fff') {
          const gameOverDiv = output.lastChild;
          applyRainbowText(gameOverDiv, gameOverDiv.textContent);
        }
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
  output.innerHTML = '<div>Starting Tetris... Use ← and → keys to move, ↑ to rotate, ↓ to drop! Esc or Ctrl-C to exit.</div>';
  if (terminal.style.color === '#fff') {
    const tetrisDiv = output.lastChild;
    applyRainbowText(tetrisDiv, tetrisDiv.textContent);
  }
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
            if (terminal.style.color === '#fff') {
              const gameOverDiv = output.lastChild;
              applyRainbowText(gameOverDiv, gameOverDiv.textContent);
            }
          }, 1000);
          return;
        }
      }
      dropCounter = 0;
    }

    if (leftPressed && !collide(currentX - 1, currentY, currentShape)) currentX--;
    if (rightPressed && !collide(currentX + 1, currentY, currentShape)) currentX--;

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

// Macrodata Refinement (MDR) Game
function startMDRGame() {
  output.innerHTML = '<div>Starting Macrodata Refinement... Click a number, then a bin to sort! Esc or Ctrl-C to exit.</div>';
  if (terminal.style.color === '#fff') {
    const mdrDiv = output.lastChild;
    applyRainbowText(mdrDiv, mdrDiv.textContent);
  }
  canvas.style.display = 'block';
  input.disabled = true;

  const ctx = canvas.getContext('2d');
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  const WIDTH = canvas.width;
  const HEIGHT = canvas.height;

  const gridSize = 40;
  const gridRows = 5;
  const gridCols = 5;
  const gridWidth = gridCols * gridSize;
  const gridHeight = gridRows * gridSize;
  const gridX = (WIDTH - gridWidth) / 2;
  const gridY = HEIGHT / 4;

  const binWidth = 60;
  const binHeight = 80;
  const binCount = 5;
  const binsX = (WIDTH - (binWidth * binCount)) / 2;
  const binsY = gridY + gridHeight + 50;

  const fileNames = ['Tumwater', 'Cairns', 'Culpepper', 'Dranesville', 'Cold Harbor'];
  const fileName = fileNames[Math.floor(Math.random() * fileNames.length)];

  let numbers = Array(gridRows).fill().map(() => Array(gridCols).fill().map(() => Math.floor(Math.random() * 10)));
  let selectedNumber = null;
  const bins = Array(binCount).fill().map(() => ({
    wo: 0, fc: 0, dr: 0, ma: 0 // Woe, Frolic, Dread, Malice progress
  }));

  function getTotalProgress(bin) {
    return bin.wo + bin.fc + bin.dr + bin.ma;
  }

  canvas.addEventListener('click', handleClick);

  function handleClick(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Check if clicked a number
    for (let r = 0; r < gridRows; r++) {
      for (let c = 0; c < gridCols; c++) {
        const numX = gridX + c * gridSize;
        const numY = gridY + r * gridSize;
        if (x >= numX && x < numX + gridSize && y >= numY && y < numY + gridSize) {
          selectedNumber = { r, c };
          return;
        }
      }
    }

    // Check if clicked a bin
    if (selectedNumber) {
      for (let i = 0; i < binCount; i++) {
        const binX = binsX + i * binWidth;
        const binY = binsY;
        if (x >= binX && x < binX + binWidth && y >= binY && y < binY + binHeight) {
          const bin = bins[i];
          const temper = ['wo', 'fc', 'dr', 'ma'][Math.floor(Math.random() * 4)];
          bin[temper] += Math.floor(Math.random() * 20) + 10; // Random progress boost
          numbers[selectedNumber.r][selectedNumber.c] = Math.floor(Math.random() * 10); // Replace sorted number
          selectedNumber = null;
          if (getTotalProgress(bin) >= 100) {
            output.innerHTML += '<div>File refinement complete! Type anything to continue.</div>';
            if (terminal.style.color === '#fff') {
              const completeDiv = output.lastChild;
              applyRainbowText(completeDiv, completeDiv.textContent);
            }
            endGame();
          }
          return;
        }
      }
    }
  }

  document.addEventListener('keydown', keyDownHandler);
  document.addEventListener('keyup', keyUpHandler);

  function keyDownHandler(e) {
    if (e.key === 'Escape' || (e.ctrlKey && e.key === 'c')) {
      endGame();
      output.innerHTML = '';
    }
  }
  function keyUpHandler(e) {}

  function draw() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    // Draw file name and progress
    ctx.fillStyle = '#fff';
    ctx.font = '18px Roboto Mono';
    ctx.textAlign = 'center';
    ctx.fillText(`File: ${fileName}`, WIDTH / 2, 50);
    const totalProgress = bins.reduce((sum, bin) => sum + getTotalProgress(bin), 0) / (binCount * 100) * 100;
    ctx.fillText(`${Math.floor(totalProgress)}%`, WIDTH / 2, 80);

    // Draw number grid
    for (let r = 0; r < gridRows; r++) {
      for (let c = 0; c < gridCols; c++) {
        const x = gridX + c * gridSize;
        const y = gridY + r * gridSize;
        ctx.strokeStyle = '#0f0';
        ctx.lineWidth = 1;
        ctx.strokeRect(x, y, gridSize, gridSize);
        ctx.fillStyle = selectedNumber && selectedNumber.r === r && selectedNumber.c === c ? '#ff0' : '#fff';
        ctx.font = '18px Roboto Mono';
        ctx.textAlign = 'center';
        ctx.fillText(numbers[r][c], x + gridSize / 2, y + gridSize / 2 + 6);
      }
    }

    // Draw bins
    for (let i = 0; i < binCount; i++) {
      const x = binsX + i * binWidth;
      const y = binsY;
      ctx.strokeStyle = '#0f0';
      ctx.strokeRect(x, y, binWidth, binHeight);
      ctx.fillStyle = '#fff';
      ctx.font = '14px Roboto Mono';
      ctx.textAlign = 'center';
      ctx.fillText(`0${i + 1}`, x + binWidth / 2, y + 15);

      const bin = bins[i];
      const barWidth = binWidth - 10;
      const barHeight = 10;
      ctx.fillStyle = '#FF6666'; // WO
      ctx.fillRect(x + 5, y + 25, Math.min(bin.wo, 100) / 100 * barWidth, barHeight);
      ctx.fillStyle = '#FFCC66'; // FC
      ctx.fillRect(x + 5, y + 40, Math.min(bin.fc, 100) / 100 * barWidth, barHeight);
      ctx.fillStyle = '#66FF66'; // DR
      ctx.fillRect(x + 5, y + 55, Math.min(bin.dr, 100) / 100 * barWidth, barHeight);
      ctx.fillStyle = '#66CCFF'; // MA
      ctx.fillRect(x + 5, y + 70, Math.min(bin.ma, 100) / 100 * barWidth, barHeight);

      ctx.fillStyle = '#fff';
      ctx.font = '10px Roboto Mono';
      ctx.fillText('WO', x + 5, y + 34);
      ctx.fillText('FC', x + 5, y + 49);
      ctx.fillText('DR', x + 5, y + 64);
      ctx.fillText('MA', x + 5, y + 79);
    }

    requestAnimationFrame(draw);
  }

  function endGame() {
    canvas.style.display = 'none';
    input.disabled = false;
    input.focus();
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    canvas.removeEventListener('click', handleClick);
    document.removeEventListener('keydown', keyDownHandler);
    document.removeEventListener('keyup', keyUpHandler);
  }

  draw();
}