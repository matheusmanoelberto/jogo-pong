//variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 20;
let raio = diametro / 2;

//velocidade da bolinha
let velocidadeXBolinha = 20;
let velocidadeYBolinha = 20;
let raqueteComprimento = 10;
let raqueteAltura = 90;

//variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;

//variáveis do oponente
let xRaqueteOponete = 585;
let yRaqueteOponete =150;
let velocidadeYOponente;

let colidiu = false;

//placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;

//sons do jogo
let raquetada;
let ponto;
let trilha;

//funcao erra
let chanceDeErrar =0;

function preload(){
  trilha = loadSound("audio/trilha.mp3");
  ponto = loadSound("audio/ponto.mp3");
  raquetada = loadSound("audio/raquetada.mp3")
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBolinha();
  mostraRaquete(xRaquete,yRaquete);
  movimentaMinhaRaquete();
  //verificaColisaoRaquete();
  verificaColisaoRaqueteBiblioteca(xRaquete,yRaquete);
  verificaColisaoRaqueteBiblioteca(xRaqueteOponete, yRaqueteOponete);
  mostraRaquete(xRaqueteOponete, yRaqueteOponete);
  movimentaRaqueteOponete();
  incluiPlacar();
  marcaPonto();
}

function mostraBolinha(){
  circle(xBolinha,yBolinha,diametro);
}

function movimentaBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBolinha(){
  
  if (xBolinha + raio > width || xBolinha - raio < 0){
    velocidadeXBolinha *= -1;
  }
  if(yBolinha  + raio > height  || yBolinha - raio < 0){
    velocidadeYBolinha *= -1;
  }
}

function mostraRaquete(x,y){
   rect(x,y,raqueteComprimento,raqueteAltura);
}

function movimentaMinhaRaquete(){
  if (keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
  }
}

function verificaColisaoRaquete(){
  if(xBolinha - raio < xRaquete + raqueteComprimento && yBolinha - raio < yRaquete + raqueteAltura && yBolinha + raio > yRaquete){
    velocidadeXBolinha *= -1;
    raquetada.paly();
  }
}

function verificaColisaoRaqueteBiblioteca(x, y){
  colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  if(colidiu){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function movimentaRaqueteOponete(){
  velocidadeYOponente = yBolinha - yRaqueteOponete -  raqueteComprimento / 2 - 30;
  yRaqueteOponete += velocidadeYOponente
  calculaChanceDeErrar();
  // if (keyIsDown(87)){
  //   yRaqueteOponete -= 10;
  // }
  // if (keyIsDown(83)){
  //   yRaqueteOponete += 10;
  // } 
}

function incluiPlacar(){
  stroke(255);
  textAlign(CENTER)
  textSize(16);
  fill(color(255,140,0));
  rect(150, 10 , 40, 20);
  fill(255);
  text(meusPontos, 170 , 26);
  fill(color(255,140,0));
  rect(450, 10, 40, 20)
  fill(255);
  text(pontosDoOponente, 470 , 26);
}

function marcaPonto(){
  if(xBolinha > 590 ){
    meusPontos += 1;
    ponto.play();
  }
  if(xBolinha < 10){
    pontosDoOponente += 1;
    ponto.play();
  }
}

function calculaChanceDeErrar(){
  if(pontosDoOponente >= meusPontos){
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
      cahanceDeErrar = 40
    }
  }else{
    chanceDeErrar -= 1
    if(chanceDeErrar<= 35){
      chanceDerrar = 35
    }
  }
}

function bolinhaNaoFicaPresa(){
  if(XBolinha - raio <0){
    xBolinha = 23
  }
}

