// Variáveis para guardar os dados do gráfico
let historicoTemperaturas = [];
let labelsTempo = [];
const MAX_DADOS = 10; // Quantos pontos de dados queremos mostrar no gráfico

// Configuração inicial do gráfico
const ctx = document.getElementById('graficoTemperatura').getContext('2d');
const meuGraficoTemperatura = new Chart(ctx, {
    type: 'line', // Tipo de gráfico: linha
    data: {
        labels: labelsTempo, // Eixos X (tempo)
        datasets: [{
            label: 'Temperatura (°C)', // Título da linha
            data: historicoTemperaturas, // Dados da linha
            borderColor: 'rgba(255, 99, 132, 1)', // Cor da linha (vermelho)
            backgroundColor: 'rgba(255, 99, 132, 0.2)', // Cor da área abaixo da linha
            fill: true, // Preencher a área abaixo da linha
            tension: 0.1 // Curvatura da linha
        }]
    },
    options: {
        responsive: true, // Gráfico se adapta ao tamanho da tela
        maintainAspectRatio: false, // Permite controlar a proporção (usamos o div do HTML para isso)
        scales: {
            y: {
                beginAtZero: false, // O eixo Y não começa do zero
                title: {
                    display: true,
                    text: 'Temperatura (°C)'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Tempo'
                }
            }
        }
    }
});

// Função para atualizar os dados na página e no gráfico
function atualizarDadosColmeia() {
    // Simulando dados que viriam dos seus sensores
    const temperatura = parseFloat((Math.random() * (36 - 32) + 32).toFixed(1)); // Temperatura entre 32.0 e 36.0
    const umidade = Math.floor(Math.random() * (75 - 60) + 60);     // Umidade entre 60 e 75
    const abelhas = Math.floor(Math.random() * (200 - 100) + 100);  // Contagem entre 100 e 200

    // Encontra o parágrafo da temperatura pelo ID e atualiza seu texto
    const pTemperatura = document.getElementById('temperatura-dado');
    pTemperatura.textContent = `Dados da Temperatura: ${temperatura} °C`;

    // Encontra o parágrafo da umidade pelo ID e atualiza seu texto
    const pUmidade = document.getElementById('umidade-dado');
    pUmidade.textContent = `Dados da Umidade: ${umidade} %`;

    // Encontra o parágrafo das abelhas pelo ID e atualiza seu texto
    const pAbelhas = document.getElementById('abelhas-dado');
    pAbelhas.textContent = `Entrada e Saída das abelhinhas: ${abelhas}`;

    // --- Atualização do Gráfico ---
    // Adiciona a nova temperatura ao histórico
    historicoTemperaturas.push(temperatura);

    // Adiciona um label de tempo (ex: "23:15:30")
    const agora = new Date();
    labelsTempo.push(agora.toLocaleTimeString()); // Pega a hora atual

    // Se tivermos mais dados do que o máximo desejado, removemos os mais antigos
    if (historicoTemperaturas.length > MAX_DADOS) {
        historicoTemperaturas.shift(); // Remove o primeiro elemento (o mais antigo)
        labelsTempo.shift(); // Remove o label de tempo mais antigo
    }

    // Avisa ao gráfico que os dados mudaram para ele se redesenhar
    meuGraficoTemperatura.update();

    console.log("Dados e gráfico atualizados na página!");
}

// Chama a função a cada 5000 milissegundos (ou seja, a cada 5 segundos)
setInterval(atualizarDadosColmeia, 5000);