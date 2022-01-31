export interface Bond {
    id: any,
    bondSymbol?: string,
    issuerName?: string,
    interestRate?: number,
    maturityDate?: Date,
    faceValue?: number,
    underlying?: string,
    altSymbol?: string,
    suffix?: string,
    issueType?: string,
    bypassClearance?: string,
    currencyCode?: string,
    flat?: string,
    bankrupt?: string,
    exchange?: string
}