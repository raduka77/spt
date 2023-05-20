const formatCoach = async coach => {
  let coachName;
  if (coach === 'undefined' || coach == null) {
    coachName = 'n/a';
  }
  if (coach.includes('Guardiola')) {
    coachName = 'Pep Guardiola';
  } else if (coach.includes('Bruno Miguel Silva do')) {
    coachName = 'Bruno Lage';
  } else if (coach.includes('Mikel Arteta Amatriain')) {
    coachName = 'Mikel Arteta';
  } else if (coach.includes('Ernesto Valverde Tejedor')) {
    coachName = 'Ernesto Valverde';
  } else if (coach.includes('Diego Pablo Simeone')) {
    coachName = 'Diego Simeone';
  } else if (coach.includes('Unai Emery Etxegoien')) {
    coachName = 'Unai Emery';
  } else if (coach.includes('Francisco Javier Rodríguez Vílchez')) {
    coachName = 'Francisco Rodríguez';
  } else if (coach.includes('Julen Lopetegui Argote')) {
    coachName = 'Julen Lopetegui';
  } else if (coach.includes('Javier Aguirre Onaindía')) {
    coachName = 'Javier Aguirre';
  } else if (coach.includes('Joan Francesc Ferrer Sicilia')) {
    coachName = 'Rubi';
  } else if (coach.includes('Imanol Alguacil Barrenetxea')) {
    coachName = 'Imanol Alguacil';
  } else if (coach.includes('Diego Martínez Penas')) {
    coachName = 'Diego Martínez';
  } else if (coach.includes('Manuel Luis Pellegrini Ripamonti')) {
    coachName = 'Manuel Pellegrini';
  } else if (coach.includes('Juan José Rojo Martín')) {
    coachName = 'José Rojo Martín';
  } else if (coach.includes('Miguel Ángel Sánchez Muñoz')) {
    coachName = 'Míchel';
  } else if (coach.includes('Ivan Gennaro Gattuso')) {
    coachName = 'Gennaro Gattuso';
  } else if (coach.includes('Xavier Hernández Creus')) {
    coachName = 'Xavi';
  } else if (coach.includes('José Mario Felix dos Santos Mourinho')) {
    coachName = 'José Mourinho';
  } else if (coach.includes('Francisco José López Fernández')) {
    coachName = 'Paco López';
  } else if (coach.includes('José Ángel Ziganda Lacunza')) {
    coachName = 'José Ángel Ziganda';
  } else if (coach.includes('Joseba Imanol Idiakez Barkaiztegui')) {
    coachName = 'Imanol Idiakez';
  } else if (coach.includes('Francisco Javier García Pimienta')) {
    coachName = 'García Pimienta';
  } else if (coach.includes('Joseba Andoni Etxeberria Lizardi')) {
    coachName = 'Joseba Etxeberria';
  } else if (coach.includes('Luis Miguel Carrión Delgado')) {
    coachName = 'Luis Carrión';
  } else {
    coachName = coach; // all values assign coach
  }

  return coachName;
};

export { formatCoach };
