export default function melhorHospital(array, especialidade) {
    const hospitaisDisponiveis = array
      .filter(hospital => hospital.vagas > 0);
  
    if (hospitaisDisponiveis.length === 0) {
      return null; // Nenhum hospital com vagas disponíveis
    }
  
    let hospitalMenorTempo = hospitaisDisponiveis.reduce((min, hospital) => {
      return hospital.tempo.value < min.tempo.value ? hospital : min;
    });
  
    const hospitalComMesmaEspecialidade = hospitaisDisponiveis
      .find(hospital => hospital.especializacao === especialidade);
  
    if (hospitalComMesmaEspecialidade) {
      if (hospitalComMesmaEspecialidade.tempo.value - hospitalMenorTempo.tempo.value <= 300) {
        return hospitalComMesmaEspecialidade;
      }
    }
  
    return [hospitalMenorTempo, hospitalComMesmaEspecialidade];
  }
  