var database = require("../database/config");

function buscarPerguntasPorQuiz(fkQuiz) {
    const instrucao = `
        SELECT p.idPergunta, p.descricao AS pergunta, a.idAlternativa, a.resposta, a.correta
        FROM (
            SELECT idPergunta, descricao
            FROM Perguntas
            WHERE fkQuiz = ${fkQuiz}
            ORDER BY RAND()
            LIMIT 10
        ) AS p
        JOIN Alternativas a ON a.fkPergunta = p.idPergunta
        ORDER BY p.idPergunta, a.idAlternativa;
    `;
    console.log("Executando a instrução SQL:\n" + instrucao);
    return database.executar(instrucao);
}

function cadastrarPontos(idUsuario, fkQuiz, pontos, tempo) {
  const instrucao = `
    INSERT INTO Resultado (fkUsuario, fkQuiz, pontos, segundos) VALUES 
    ('${idUsuario}', '${fkQuiz}', '${pontos}', '${tempo}');
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}



module.exports = {
    buscarPerguntasPorQuiz,
    cadastrarPontos
};




