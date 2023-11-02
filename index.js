import express from "express";
import cors from 'cors';

const app = express(); //cria uma instância para usarmos o express
const port = 5000; //criamos uma porta para que o servidor fique conectado ao usarmos ele

//As tarefas devem vir na forma de objeto contendo:
//exemplo de tarefa
const primeiraTarefa = {
    id: 1,
    nome: "Estudar para a prova",
    proprietario: "joão pessoa",
    dataInicio: "2023-10-28",
    dataTermino: "2023-11-19"
}

let tarefas = [primeiraTarefa];

app.use(express.json()); //garante que possamos converter json quando enviarmos para o servidor
app.use(cors()); // garante que não teremos problemas de cors no envio de nossas requisições

app.listen(port, () => {
    console.log(`Servidor está conectado na porta ${port}`)
}); // esse código conecta a porta ao nosso servidor. Agora, podemos fazer requisições para este app usando a porta 5000

