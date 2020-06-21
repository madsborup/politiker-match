export type MF = {
  biografi: string
  efternavn: string
  fornavn: string
  gruppenavnkort: string
  id: number
  navn: string
  opdateringsdato: Date
  periodeid: number
  slutdato: Date
  startdato: Date
  typeid: number
}

export type Afstemning = {
  id: number
  kommentar: string
  konklusion: string
  mødeid: number
  nummer: number
  opdateringsdato: Date
  sagstrinid: number
  typeid: number
  vedtaget: boolean
}

export type Stemme = {
  id: number
  afstemningid: number
  aktørid: number
  opdateringsdato: Date
  typeid: number
}

export type Sagstrin = {
  dato: Date
  folketingstidende: string
  folketingstidendenummer: string
  folketingstidendeurl: string
  id: number
  opdateringsdato: Date
  sagid: number
  statusid: number
  titel: string
  typeid: number
}

export type Sag = {
  afgørelse: string
  afgørelsesdato: Date
  afgørelsesresultatkode: string
  afstemningskonklusion: string
  baggrundsmateriale: string
  begrundelse: string
  deltundersagid: number
  fremsatundersagid: number
  id: number
  kategoriid: number
  lovnummer: string
  lovnummerdato: Date
  nummer: string
  nummernumerisk: string
  nummerpostfix: string
  nummerprefix: string
  offentlighedskode: string
  opdateringsdato: Date
  paragraf: string
  paragrafnummer: number
  periodeid: number
  resume: string
  retsinformationsurl: string
  rådsmødedato: Date
  statsbudgetsag: boolean
  statusid: number
  titel: string
  titelkort: string
  typeid: number
}