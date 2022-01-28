export interface Fund {
    id: number,
    symbol: string,
    name: string,
    inceptionDate?: Date,
    categoryOne?: string,
    categoryTwo?: string,
    categoryThree?: string,
    marketCap?: Text,
    currentDividendYield?: Text,
    historicalAverageDividendYield?: Text,
    everageFactor?: number,
    averageVolume?: Text,
    action?: string
}