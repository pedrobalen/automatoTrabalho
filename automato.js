const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const estados = {
  inicial: 'inicial', //q0
  meio: 'meio',       //q1
  final: 'final'      //q2
};

const estadoInicial = estados.inicial;
const estadosFinais = new Set([estados.final]);

const transicao = {
  'inicial': { 'a': 'meio', 'b': 'inicial' },
  'meio': { 'a': 'meio', 'b': 'final' },
  'final': { 'a': 'meio', 'b': 'inicial' }
};

const alfabeto = ['a', 'b'];

function processarEntrada(entrada) {
  let estadoAtual = estadoInicial;
  for (let simbolo of entrada) {
    if (!alfabeto.includes(simbolo)) {
      console.log(`Símbolo inválido: ${simbolo}`);
      return false;
    }
    estadoAtual = transicao[estadoAtual][simbolo];
  }
  return estadosFinais.has(estadoAtual);
}

function solicitarEntrada() {
  rl.question('Digite uma entrada para testar se aceita sufixo ab: ', (entrada) => {
    if (entrada === '') {
      rl.close();
    } else {
      const resultado = processarEntrada(entrada);
      console.log(`Entrada: "${entrada}", Aceita: ${resultado}`);
      solicitarEntrada();
    }
  });
}

solicitarEntrada();
