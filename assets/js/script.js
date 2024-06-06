// Initial Data

let currentQuestion = 0;
let correctAnswers = 0;

showQuestion();

// Functions

  // função para mostrar a questão 
function showQuestion () {
    if(questions[currentQuestion]){
        let q = questions[currentQuestion];

                        // Calcular progressão da barra de avanço 
        let pct = Math.floor((currentQuestion / questions.length) * 100);
                    // manipulando o DOM para a progressão da barra
        document.querySelector('.progress--bar').style.width = `${pct}%`

        document.querySelector('.scoreArea').style.display = 'none';// Esconde a score area
        document.querySelector('.questionArea').style.display = 'block';// exibe  a question area

                    // Exibir objeto/Pergunta
        document.querySelector('.question').innerHTML = q.question;
                        

            // loop para pegar as questões
            let optionsHtml = '';
            for (let i in q.options){
                optionsHtml += `<div data-op="${i}" class="option"><span>${parseInt(i) + 1}</span> ${q.options[i]}</div>`;

            }
            // Substituir o conteudo
            document.querySelector('.options').innerHTML = optionsHtml;

                    // Evento de click quando clicar nas opções
            document.querySelectorAll('.options .option').forEach(item => {
                item.addEventListener('click', optionClickEvent);
            })

    }else {
            finishQuiz();
    }
}

function optionClickEvent(e) {
    let clickedOption = parseInt(e.target.getAttribute('data-op'));
    // Verificação de resposta
    if (questions[currentQuestion].answer === clickedOption){
       // se acerta aumenta uma
        correctAnswers++;
    }




    // Aqui ele vai adicionar e  atualizar para a proxima pergunta 
    currentQuestion++;
    showQuestion();
};

                // sumir as questões e mostrar o resultado
function finishQuiz () {
                // Calculo para resultado
    let points = Math.floor((correctAnswers / questions.length) * 100);
    
    if(points < 30) {
        document.querySelector('.scoreText1').innerHTML = 'Tá ruim Em?!'; // alterar text
        document.querySelector('.scorePct').style.color = '#FF0000';//Alterar color text

    }else if (points >= 30 && points < 70){
        document.querySelector('.scoreText1').innerHTML = 'Muito bom!'; // alterar text
        document.querySelector('.scorePct').style.color = '#FFFF00';//Alterar color text

    }else if (points >= 70) {
        document.querySelector('.scoreText1').innerHTML = 'Parabéns!'; // alterar text
        document.querySelector('.scorePct').style.color = '#0D060D';//Alterar color text
    };




                                // Exibindo % e quantidade de quanto acertou
    document.querySelector('.scorePct').innerHTML = `Acertou ${points}%`;
    document.querySelector('.scoreText2').innerHTML = `Você respondeu ${questions.length} questão e acertou ${correctAnswers}.`;



    document.querySelector('.scoreArea').style.display = 'block';// Esconde a score area
    document.querySelector('.questionArea').style.display = 'none';// exibe  a question are
    document.querySelector('.progress--bar').style.width = '100%';


}
