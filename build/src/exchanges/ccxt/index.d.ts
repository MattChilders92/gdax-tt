/**********************************************************************************************************************
 * @license                                                                                                           *
 * Copyright 2017 Coinbase, Inc.                                                                                      *
 *                                                                                                                    *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance     *
 * with the License. You may obtain a copy of the License at                                                          *
 *                                                                                                                    *
 * http://www.apache.org/licenses/LICENSE-2.0                                                                         *
 *                                                                                                                    *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on*
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the                 *
 * License for the specific language governing permissions and limitations under the License.                         *
 **********************************************************************************************************************/
import * as ccxt from 'ccxt';
import { Candle, CandleRequestOptions, Product, PublicExchangeAPI, Ticker } from '../PublicExchangeAPI';
import { AuthenticatedExchangeAPI, Balances } from '../AuthenticatedExchangeAPI';
import { CryptoAddress, ExchangeTransferAPI, TransferRequest, TransferResult, WithdrawalRequest } from '../ExchangeTransferAPI';
import { ExchangeAuthConfig } from '../AuthConfig';
import { BigJS } from '../../lib/types';
import { BookBuilder } from '../../lib/BookBuilder';
import { PlaceOrderMessage, TradeMessage } from '../../core/Messages';
import { LiveOrder } from '../../lib/Orderbook';
import { Logger } from '../../utils/Logger';
export default class CCXTExchangeWrapper implements PublicExchangeAPI, AuthenticatedExchangeAPI, ExchangeTransferAPI {
    static createExchange(name: string, auth: ExchangeAuthConfig, logger: Logger, opts?: any): CCXTExchangeWrapper;
    static supportedExchanges(): string[];
    static supportedExchangeNames(): string[];
    static getGDAXSymbol(m: ccxt.Market): string;
    readonly owner: string;
    private readonly instance;
    private readonly options;
    private readonly logger;
    constructor(owner: string, opts: any, ccxtInstance: ccxt.Exchange, logger: Logger);
    log(level: string, msg: string, meta?: any): void;
    getSourceSymbol(gdaxProduct: string): Promise<string>;
    loadProducts(): Promise<Product[]>;
    loadMidMarketPrice(gdaxProduct: string): Promise<BigJS>;
    loadOrderbook(gdaxProduct: string): Promise<BookBuilder>;
    loadTicker(gdaxProduct: string): Promise<Ticker>;
    loadCandles(options: CandleRequestOptions): Promise<Candle[]>;
    placeOrder(order: PlaceOrderMessage): Promise<LiveOrder>;
    cancelOrder(_id: string): Promise<string>;
    cancelAllOrders(_gdaxProduct?: string): Promise<string[]>;
    loadOrder(_id: string): Promise<LiveOrder>;
    loadAllOrders(_gdaxProduct?: string): Promise<LiveOrder[]>;
    loadBalances(): Promise<Balances>;
    requestCryptoAddress(_cur: string): Promise<CryptoAddress>;
    requestTransfer(_request: TransferRequest): Promise<TransferResult>;
    requestWithdrawal(_request: WithdrawalRequest): Promise<TransferResult>;
    transfer(_cur: string, _amount: BigJS, _from: string, _to: string, _options: any): Promise<TransferResult>;
    /**
     * Attempts to fetch historical trade data from the exchange and return it in
     */
    fetchHistTrades(symbol: string, since?: number, limit?: number, params?: {}): Promise<TradeMessage[]>;
    fetchOHLCV(symbol: string, timeframe?: string, since?: number, limit?: number, params?: any): Promise<ccxt.OHLCV[] | null>;
}
