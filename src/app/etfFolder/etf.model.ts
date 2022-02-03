export interface ETF {
  id?: number;
  fund_long_name?: string;
  fund_category?: string;
  fund_family?: string;
  fund_symbol?: string;
  exchange_code?: string;
  exchange_name?: string;
  avg_vol_3month?: number;
  avg_vol_10day?: number;
  total_net_assets?: number;
  day50_moving_average?: number;
  week52_high?: number;
  week52_high_change?: number;
  week52_high_change_perc?: number;
  week52_low?: number;
  week52_low_change?: number;
  week52_low_change_perc?: number;
  investment_strategy?: string;
  fund_yield?: number;
  inception_date?: string;
  fund_annual_report_net_expense_ratio?: number;
  top10_holdings_total_assets?: number;
  fund_return_ytd?: number;
  category_return_ytd?: number;
}

