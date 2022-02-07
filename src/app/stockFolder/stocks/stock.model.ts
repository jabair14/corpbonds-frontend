export interface Stock {
    id:number,
    symbol: string,
    name: string,
    country: string,
    ipoYear: number,
    dynamicInfo?: {
        id: number,
        lastSale: number,
        netChange: number,
        percentChange: number
        marketCap: number,
        volume:number,
    }
}