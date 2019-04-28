export const enum Sorte {
  MEDIUM = 'MEDIUM',
  SPRIZIG = 'SPRIZIG',
  STILL = 'STILL',
  ACE = 'ACE',
  APFELSCHORLE = 'APFELSCHORLE'
}

export interface IKasten {
  id?: number;
  sorte?: Sorte;
  bestellungStandort?: string;
  bestellungId?: number;
}

export class Kasten implements IKasten {
  constructor(public id?: number, public sorte?: Sorte, public bestellungStandort?: string, public bestellungId?: number) {}
}
