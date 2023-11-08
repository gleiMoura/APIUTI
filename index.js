import express from "express";
import cors from 'cors';
import axios from 'axios';
import melhorHospital from "./script.js";


const app = express(); //cria uma instância para usarmos o express
const port = 5000; //criamos uma porta para que o servidor fique conectado ao usarmos ele

const internacoes = [];

let hospitais = [
    {
        nome: "Hospital São Lucas",
        latitude: "-26.2361999",
        longitude: "-52.6968487",
        especializacao: "cardiologia",
        vagas: 3
    },
    {
        nome: "Unimed atendimentos",
        latitude: "-26.2304119",
        longitude: "-52.6772864",
        especializacao: "fraturas",
        vagas: 2
    },
    {
        nome: "Policlínica de Pato Branco",
        latitude: "-26.2285972",
        longitude: "-52.6879917",
        especializacao: "neurologia",
        vagas: 1
    }
]

app.use(express.json()); //garante que possamos converter json quando enviarmos para o servidor
app.use(cors()); // garante que não teremos problemas de cors no envio de nossas requisições

app.listen(port, () => {
    console.log(`Servidor está conectado na porta ${port}`)
}); // esse código conecta a porta ao nosso servidor. Agora, podemos fazer requisições para este app usando a porta 5000

app.get("/pegarDadosDeLocalizacao", async (req, res) => {
    const { latitude, longitude, especialidade, relato, nome, idade } = req.body;

    const dadosDeViagem = [];

    if (latitude && longitude) {
        for (const hospital of hospitais) {
            const url = `https://api.distancematrix.ai/maps/api/distancematrix/json?origins=${latitude},${longitude}&destinations=${hospital.latitude},${hospital.longitude}&key=fJGhlMn224umfTJPOHLrneYhWVVzWxe9QdtYaXkStDiZgJPD39ON96LdO3y0YADa`;

            try {
                const response = await axios.get(url);
                const data = response.data;

                const enderecoDestino = data.destination_addresses[0];
                const enderecoOrigem = data.origin_addresses[0];
                const distancia = data.rows[0].elements[0].distance;
                const tempo = data.rows[0].elements[0].duration;


                const dados = { enderecoDestino, enderecoOrigem, distancia, tempo, vagas: hospital.vagas, especializacao: hospital.especializacao, relato, nome, idade };
                dadosDeViagem.push(dados);
            } catch (error) {
                console.error("Erro na solicitação à API:", error);
            }
        }
    }

    const hospitalEncontrado = melhorHospital(dadosDeViagem, especialidade)

    res.status(200).send(hospitalEncontrado)
});

app.post("/encaminharPaciente", (req, res) => {
    const {dados} = req.body;

    const hospitaisAtualizados = hospitais.map(hospital => {
        if(hospital.especializacao === dados.especializacao){
            return {...hospital, vagas: vagas - 1}
        }
    });

    hospitais = hospitaisAtualizados;

    internacoes.push(dados)

    res.status(201).send(hospitais)
});

app.get("/pegarInternacoes", (req, res) => {
    if(internacoes.length > 0) {
        res.status(200).send(internacoes)
    }else{
        res.status(400).send("Não há internações no momento");
    }
})




