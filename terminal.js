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

function applyPrideTheme() {
  terminal.style.background = '#000';
  terminal.style.color = '#fff';
  applyRainbowText(header.querySelector('a'), 'Kloudfuse OS Version 3.3');
  applyRainbowText(prompt, isHacked ? 'root@kloudfuse> ' : 'kloudfuse> ');
  input.style.color = roybgivColors[0]; // Start with light red for input
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
  switch (cmd) {
    case 'help':
    case 'man kloudfuse':
      response = 'Commands: whoami, about, hack, joke, explore, theme [dark/light/neon/pride], clear, game, joshua' + (isHacked ? ', exit' : '');
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
        applyRainbowText(hackOutput, hackText);
        terminal.scrollTop = terminal.scrollHeight;
      }, 300);
      setTimeout(() => {
        clearInterval(hackInterval);
        const grantedDiv = document.createElement('div');
        applyRainbowText(grantedDiv, 'ACCESS GRANTED');
        output.appendChild(grantedDiv);
        prompt.innerText = 'root@kloudfuse> ';
        isHacked = true;
        if (terminal.style.color === '#fff') {
          applyPrideTheme();
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
      const exploreDiv = document.createElement('div');
      exploreDiv.id = 'explore-output';
      applyRainbowText(exploreDiv, `Navigating to ${choice.name}...`);
      output.appendChild(exploreDiv);
      terminal.scrollTop = terminal.scrollHeight;
      setTimeout(() => {
        const tabDiv = document.createElement('div');
        applyRainbowText(tabDiv, "Opening a new tab, don’t worry terminal is still here, come back and hang out!");
        output.appendChild(tabDiv);
        window.open(choice.url, '_blank');
        if (terminal.style.color === '#fff') {
          applyPrideTheme();
        }
        terminal.scrollTop = terminal.scrollHeight;
      }, 2000);
      return;
    case 'theme dark':
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
    case 'theme light':
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
    case 'theme neon':
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
        if (terminal.style.color === '#fff') applyPrideTheme();
        else prompt.style.color = terminal.style.color;
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
      response = 'Choose a game: game brickout, game tetris, game joshua';
      break;
    case 'game joshua':
      output.innerHTML += '<div id="wargames-output">Shall we play a game?</div>';
      terminal.scrollTop = terminal.scrollHeight;
      setTimeout(() => {
        const launchDiv = document.createElement('div');
        applyRainbowText(launchDiv, 'Simulating Global Thermonuclear War...');
        output.appendChild(launchDiv);
        terminal.scrollTop = terminal.scrollHeight;
        let countdown = 5;
        const countdownInterval = setInterval(() => {
          const countDiv = document.createElement('div');
          applyRainbowText(countDiv, `Launch in ${countdown}...`);
          output.appendChild(countDiv);
          terminal.scrollTop = terminal.scrollHeight;
          countdown--;
          if (countdown < 0) {
            clearInterval(countdownInterval);
            const endDiv = document.createElement('div');
            applyRainbowText(endDiv, 'A strange game. The only winning move is not to play.');
            output.appendChild(endDiv);
            terminal.scrollTop = terminal.scrollHeight;
            setTimeout(() => {
              const chessDiv = document.createElement('div');
              applyRainbowText(chessDiv, 'How about a nice game of chess?');
              output.appendChild(chessDiv);
              terminal.scrollTop = terminal.scrollHeight;
            }, 1000);
          }
        }, 500);
      }, 1000);
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
        output.innerHTML += '<div>Gam
