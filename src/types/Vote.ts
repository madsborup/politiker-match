export type VoteType = 'for' | 'imod'

export type Vote = {
  afstemningsid: number
  type: VoteType
}