// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getSummarySellHappyPoint = (
  happyPointAmount: number,
  rateBahtPerHappyPoint: number
) => {
  const bahtAmount: number = happyPointAmount * rateBahtPerHappyPoint
  const vatAmount: number = bahtAmount * 0.1
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
export const getSummaryTransferHappyPoint = (happyPointAmount: number) => {
  const feePoint: number = happyPointAmount * 0.1
  const totalPoint: number = happyPointAmount - feePoint

  return {
    happyPointAmount,
    feePoint,
    totalPoint
  }
}
