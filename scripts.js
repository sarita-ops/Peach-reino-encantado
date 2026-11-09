var tela = document.getElementById("tela");
var inicio = document.getElementById("inicio");
var fim = document.getElementById("fim");

var botaoIniciar = document.getElementById("botaoIniciar");
var botaoReiniciar = document.getElementById("botaoReiniciar");

var peach = document.getElementById("peach");
var plantinha = document.getElementById("plantinha");

var placar = document.getElementById("pontuacao");
var pontuacaoFinal = document.getElementById("pontuacaoFinal");
var cronometro = document.getElementById("cronometro");

var moedas = document.querySelectorAll(".moeda");

var pulando = false;
var pontuacao = 0;
var jogoAtivo = false;

var tempo = 60;
var intervaloCronometro;

// INICIAR O JOGO
botaoIniciar.addEventListener("click", iniciarJogo);

function iniciarJogo() {
  clearInterval(intervaloCronometro);

  inicio.style.display = "none";
  fim.style.display = "none";

  pontuacao = 0;
  tempo = 60;
  pulando = false;
  jogoAtivo = false;

  placar.textContent = "Pontos: 0";
  cronometro.textContent = "Tempo: 60";

  plantinha.style.animation = "none";

  moedas.forEach(function (moeda) {
    moeda.style.animation = "none";
    moeda.style.visibility = "visible";
  });

  plantinha.offsetHeight;

  plantinha.style.animation = "";

  moedas.forEach(function (moeda) {
    moeda.style.animation = "";
  });

  peach.classList.remove("pulo");

  tela.classList.add("jogando");
  jogoAtivo = true;

  // CRONOMETRO
  intervaloCronometro = setInterval(function () {
    if (!jogoAtivo) return;

    tempo--;

    cronometro.textContent = "Tempo: " + tempo;

    if (tempo <= 0) {
      terminarJogo();
    }
  }, 1000);
}

// PULO
document.addEventListener("keydown", function (event) {
  if (event.code === "Space" || event.code === "ArrowUp") {
    if (jogoAtivo && !pulando) {
      pulando = true;

      peach.classList.add("pulo");

      setTimeout(function () {
        peach.classList.remove("pulo");
        pulando = false;
      }, 700);
    }
  }
});

// COLISOES E COLETA DE MOEDAS
setInterval(function () {
  if (!jogoAtivo) return;

  var areaPeach = peach.getBoundingClientRect();
  var areaPlantinha = plantinha.getBoundingClientRect();

  // AREA DE COLISAO DA PEACH
  var peachEsquerda = areaPeach.left + 25;
  var peachDireita = areaPeach.right - 25;
  var peachTopo = areaPeach.top + 45;
  var peachBase = areaPeach.bottom - 10;

  // AREA DE COLISAO DA PLANTINHA
  var plantaEsquerda = areaPlantinha.left + 95;
  var plantaDireita = areaPlantinha.right - 65;
  var plantaTopo = areaPlantinha.top + 60;
  var plantaBase = areaPlantinha.bottom - 5;

  // VERIFICA A COLISAO
  var bateuNaPlantinha =
    peachDireita > plantaEsquerda &&
    peachEsquerda < plantaDireita &&
    peachBase > plantaTopo &&
    peachTopo < plantaBase;

  if (bateuNaPlantinha) {
    terminarJogo();
    return;
  }

  // COLETA DAS MOEDAS
  moedas.forEach(function (moeda) {
    if (moeda.style.visibility === "hidden") return;

    var areaMoeda = moeda.getBoundingClientRect();

    var pegouMoeda =
      peachDireita > areaMoeda.left &&
      peachEsquerda < areaMoeda.right &&
      peachBase > areaMoeda.top &&
      peachTopo < areaMoeda.bottom;

    if (pegouMoeda) {
      moeda.style.visibility = "hidden";

      pontuacao += 5;

      placar.textContent = "Pontos: " + pontuacao;
    }
  });
}, 16);

// FAZ AS MOEDAS VOLTAREM
moedas.forEach(function (moeda) {
  moeda.addEventListener("animationiteration", function () {
    moeda.style.visibility = "visible";
  });
});

// GAME OVER
function terminarJogo() {
  if (!jogoAtivo) return;

  jogoAtivo = false;

  clearInterval(intervaloCronometro);

  tela.classList.remove("jogando");

  pontuacaoFinal.textContent = "Pontuacao: " + pontuacao;

  fim.style.display = "flex";
}

// REINICIAR
botaoReiniciar.addEventListener("click", iniciarJogo);
