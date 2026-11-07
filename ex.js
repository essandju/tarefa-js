/* =====================================================
   EXERCÍCIOS DE JS - exercicios.js
   Exercícios 1 e 3 a 15 (o 2 está em exercicio2.html)
   ===================================================== */

/* ---------- Funções auxiliares ---------- */

// Verifica se um número é primo (usado no exercício 1)
function ehPrimo(n) {
  if (!Number.isInteger(n) || n < 2) return false;
  for (let i = 2; i * i <= n; i++) {
    if (n % i === 0) return false;
  }
  return true;
}

// Embaralha os elementos de uma lista (usado nos exercícios 7 e 8)
function embaralhar(lista) {
  const copia = [...lista];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

/* ---------- Exercício 1 ----------
   Recebe números via prompt até serem digitados 3 negativos iguais.
   Mostra: qtd de primos, quíntuplo da qtd de neutros (0) e soma dos negativos. */
function ex1() {
  let qtdPrimos = 0;
  let qtdNeutros = 0;
  let somaNegativos = 0;
  const contagemNegativos = {};
  let continuar = true;

  while (continuar) {
    const entrada = prompt("Digite um número:");
    if (entrada === null) break;

    const num = Number(entrada);
    if (entrada.trim() === "" || isNaN(num)) {
      alert("Valor inválido, tente de novo.");
      continue;
    }

    if (ehPrimo(num)) qtdPrimos++;
    if (num === 0) qtdNeutros++;

    if (num < 0) {
      somaNegativos += num;
      contagemNegativos[num] = (contagemNegativos[num] || 0) + 1;
      if (contagemNegativos[num] === 3) continuar = false;
    }
  }

  alert(
    `Quantidade de primos: ${qtdPrimos}\n` +
    `Quíntuplo da quantidade de neutros: ${qtdNeutros * 5}\n` +
    `Soma dos negativos: ${somaNegativos}`
  );
}

/* ---------- Exercício 3 ----------
   Números separados por ponto e vírgula: soma e factorial da soma. */
function ex3() {
  const entrada = prompt("Digite números separados por ponto e vírgula (ex.: 1;2;3):");
  if (entrada === null) return;

  const numeros = entrada.split(";").map(s => Number(s.trim()));
  if (numeros.some(n => isNaN(n))) {
    alert("Entrada inválida.");
    return;
  }

  const soma = numeros.reduce((acc, n) => acc + n, 0);

  if (!Number.isInteger(soma) || soma < 0) {
    alert(`Soma = ${soma}. O factorial só existe para inteiros não negativos.`);
    return;
  }

  let fatorial = 1n;
  for (let i = 2n; i <= BigInt(soma); i++) fatorial *= i;

  alert(`Soma = ${soma}\nFactorial de ${soma} = ${fatorial}`);
}

/* ---------- Exercício 4 ----------
   Função que recebe dois números via prompt e mostra a soma num alert. */
function somarDoisNumeros() {
  const a = Number(prompt("Primeiro número:"));
  const b = Number(prompt("Segundo número:"));
  alert(`${a} + ${b} = ${a + b}`);
}

function ex4() {
  somarDoisNumeros();
}

/* ---------- Exercício 5 ----------
   Recebe vários números: pares num vetor, ímpares noutro. */
function ex5() {
  const entrada = prompt("Digite vários números separados por ponto e vírgula:");
  if (entrada === null) return;

  const numeros = entrada.split(";").map(s => Number(s.trim())).filter(n => !isNaN(n));
  const pares = [];
  const impares = [];

  for (const n of numeros) {
    if (n % 2 === 0) pares.push(n);
    else impares.push(n);
  }

  alert(`Pares: [${pares.join(", ")}]\nÍmpares: [${impares.join(", ")}]`);
}

/* ---------- Exercício 6 ----------
   FizzBuzz de 1 a 100. */
function ex6() {
  const saida = [];
  for (let i = 1; i <= 100; i++) {
    if (i % 15 === 0) saida.push("FizzBuzz");
    else if (i % 3 === 0) saida.push("Fizz");
    else if (i % 5 === 0) saida.push("Buzz");
    else saida.push(i);
  }
  console.log(saida.join("\n"));
  alert(saida.join(" | "));
}

/* ---------- Exercício 7 ----------
   De uma palavra, gerar outras 5 (embaralhando as letras). */
function ex7() {
  const palavra = prompt("Digite uma palavra:");
  if (!palavra) return;

  const geradas = new Set();
  let tentativas = 0;
  while (geradas.size < 5 && tentativas < 500) {
    const nova = embaralhar(palavra.split("")).join("");
    if (nova !== palavra) geradas.add(nova);
    tentativas++;
  }

  alert(`Palavras geradas a partir de "${palavra}":\n` + [...geradas].join("\n"));
}

/* ---------- Exercício 8 ----------
   De uma frase, gerar outras 5 (embaralhando as palavras). */
function ex8() {
  const frase = prompt("Digite uma frase:");
  if (!frase) return;

  const palavras = frase.trim().split(/\s+/);
  const geradas = new Set();
  let tentativas = 0;
  while (geradas.size < 5 && tentativas < 500) {
    const nova = embaralhar(palavras).join(" ");
    if (nova !== frase.trim()) geradas.add(nova);
    tentativas++;
  }

  if (geradas.size === 0) {
    alert("Não é possível gerar frases diferentes com essas palavras.");
    return;
  }
  alert("Frases geradas:\n" + [...geradas].join("\n"));
}

/* ---------- Exercício 9 ----------
   Número palíndromo (lê-se igual nos dois sentidos). */
function ex9() {
  const entrada = prompt("Digite um número:");
  if (entrada === null) return;

  const texto = entrada.trim();
  if (texto === "" || isNaN(Number(texto))) {
    alert("Digite apenas um número válido.");
    return;
  }

  const invertido = texto.split("").reverse().join("");
  alert(texto === invertido
    ? `${texto} é palíndromo.`
    : `${texto} não é palíndromo.`);
}

/* ---------- Exercício 10 ----------
   Conta as vogais de um nome e sublinha-as.
   O alert não sublinha, então o resultado é escrito na página com <u>. */
function ex10() {
  const nome = prompt("Digite um nome (ex.: Miguel Manuel):");
  if (!nome) return;

  const ehVogal = /[aeiouáàâãéêíóôõú]/i;
  let total = 0;
  let html = "";

  for (const letra of nome) {
    if (ehVogal.test(letra)) {
      total++;
      html += `<u>${letra}</u>`;
    } else {
      html += letra;
    }
  }

  document.body.insertAdjacentHTML(
    "beforeend",
    `<p>${html}<br>Total de vogais: ${total}</p>`
  );
}

/* ---------- Exercício 11 ----------
   Intercala minúsculas e maiúsculas (posições ímpares em maiúscula,
   contando também os espaços): "seja autodidata." -> "sEjA AuToDiDaTa." */
function ex11() {
  const frase = prompt("Digite uma frase em minúsculas:");
  if (!frase) return;

  let resultado = "";
  for (let i = 0; i < frase.length; i++) {
    resultado += i % 2 === 1 ? frase[i].toUpperCase() : frase[i].toLowerCase();
  }
  alert(resultado);
}

/* ---------- Exercício 12 ----------
   Palavras do texto em ordem alfabética. */
function ex12() {
  const texto = prompt("Digite um texto:");
  if (!texto) return;

  const ordenadas = texto
    .trim()
    .split(/\s+/)
    .sort((a, b) => a.localeCompare(b, "pt", { sensitivity: "base" }));

  alert(ordenadas.join(" "));
}

/* ---------- Exercício 13 ----------
   Texto invertido: "Luís" -> "síuL". */
function ex13() {
  const texto = prompt("Digite um texto:");
  if (!texto) return;
  alert([...texto].reverse().join(""));
}

/* ---------- Exercício 14 ----------
   Remove todas as vogais do texto. */
function ex14() {
  const texto = prompt("Digite um texto:");
  if (!texto) return;
  alert(texto.replace(/[aeiouáàâãéêíóôõú]/gi, ""));
}

/* ---------- Exercício 15 ----------
   Lê 15 inteiros, divide todos pelo maior valor e mostra o vetor. */
function ex15() {
  const vetor = [];

  for (let i = 0; i < 15; i++) {
    const n = parseInt(prompt(`Digite o inteiro da posição ${i + 1} de 15:`), 10);
    if (isNaN(n)) {
      alert("Valor inválido. Reinicie o exercício.");
      return;
    }
    vetor.push(n);
  }

  const maior = Math.max(...vetor);
  if (maior === 0) {
    alert("O maior valor é 0, não é possível dividir.");
    return;
  }

  const resultado = vetor.map(n => n / maior);
  alert("Vetor após a divisão:\n" + resultado.map(n => n.toFixed(2)).join(", "));
}