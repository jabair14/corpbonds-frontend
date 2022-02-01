export interface Bills {
    id: number,
    ticker?: string,
    name?: string,
    assetClass?: string,
    risk?: string,
    expenseRatio?: number,
    secYield?: number,
    ytd?: string,
    oneYr?: number,
    threeYr?: number,
    fiveYr?: number,
    tenYr?: number,
    sinceInception?: number,
    initialInvestment?: number,
    price?: number,
    changePrice?: number,
    changePricePercent?: number
}