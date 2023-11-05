export interface WithdrawalOptions extends Record<string, boolean> {
  infrequentlyUsed: boolean
  lotsOfBugs: boolean
  useOtherServices: boolean
  feeIsExpensive: boolean
  createNewAccount: boolean
  etc: boolean
}
