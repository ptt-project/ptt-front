// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getSummarySellHappyPoint = (
  happyPointAmount: number,
  rateBahtPerHappyPoint: number,
  feeRate: number
) => {
  const bahtAmount: number = happyPointAmount * rateBahtPerHappyPoint
  const vatAmount: number = bahtAmount * (feeRate / 100)
  const totalAmount: number = bahtAmount - vatAmount

  return {
    happyPointAmount,
    rateBahtPerHappyPoint,
    bahtAmount,
    vatAmount,
    totalAmount
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getSummaryTransferHappyPoint = (happyPointAmount: number, feeRate: number) => {
  const feePoint: number = happyPointAmount * (feeRate / 100)
  const totalPoint: number = happyPointAmount - feePoint

  return {
    happyPointAmount,
    feePoint,
    totalPoint
  }
}
