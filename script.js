export default function melhorHospital(array, especialidade) {
    const hospitaisDisponiveis = array
      .filter(hospital => hospital.vagas > 0);
  
    if (hospitaisDisponiveis.length === 0) {
      return null; // Nenhum hospital com vagas disponíveis
    }
  
    hospitaisDisponiveis.sort((a, b) => {
      // Ordena pelo tempo, se for igual, prioriza a especialização desejada
      if (a.tempo.value === b.tempo.value) {
        if (a.especializacao === especialidade) {
          return -1; // A prioridade é para a especialização desejada
        } else if (b.especializacao === especialidade) {
          return 1; // A prioridade é para a especialização desejada
        }
      }
      return a.tempo.value - b.tempo.value;
    });
  
    return hospitaisDisponiveis[0];
  }