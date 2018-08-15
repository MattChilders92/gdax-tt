/***************************************************************************************************************************
 * @license                                                                                                                *
 * Copyright 2017 Coinbase, Inc.                                                                                           *
 *                                                                                                                         *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance          *
 * with the License. You may obtain a copy of the License at                                                               *
 *                                                                                                                         *
 * http://www.apache.org/licenses/LICENSE-2.0                                                                              *
 *                                                                                                                         *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on     *
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the                      *
 * License for the specific language governing permissions and limitations under the License.                              *
 ***************************************************************************************************************************/
import { Candle, CandleRequestOptions, Product, PublicExchangeAPI, Ticker } from '../PublicExchangeAPI';
import { AuthenticatedExchangeAPI, Balances } from '../AuthenticatedExchangeAPI';
import { BookBuilder } from '../../lib/BookBuilder';
import { BigJS } from '../../lib/types';
import { PlaceOrderMessage } from '../../core/Messages';
import { LiveOrder } from '../../lib/Orderbook';
import { CryptoAddress, ExchangeTransferAPI, TransferRequest, TransferResult, WithdrawalRequest } from '../ExchangeTransferAPI';
import { AuthCallOptions, AuthHeaders, GDAXConfig, OrderbookEndpointParams } from './GDAXInterfaces';
import { CoinbaseAccount } from 'gdax';
import request = require('superagent');
import Response = request.Response;
export declare const GDAX_API_URL = "https://api.gdax.com";
export declare class GDAXExchangeAPI implements PublicExchangeAPI, AuthenticatedExchangeAPI, ExchangeTransferAPI {
    readonly owner: string;
    readonly quoteCurrency: string;
    readonly baseCurrency: string;
    private coinbaseAccounts;
    private readonly _apiURL;
    private readonly publicClient;
    private readonly authClient;
    private readonly auth;
    private readonly logger;
    constructor(options: GDAXConfig);
    readonly apiURL: string;
    log(level: string, message: string, meta?: any): void;
    loadProducts(): Promise<Product[]>;
    loadMidMarketPrice(product: string): Promise<BigJS>;
    loadOrderbook(product: string): Promise<BookBuilder>;
    loadFullOrderbook(product: string): Promise<BookBuilder>;
    loadGDAXOrderbook(options: OrderbookEndpointParams): Promise<any>;
    loadTicker(product: string): Promise<Ticker>;
    loadCandles(options: CandleRequestOptions): Promise<Candle[]>;
    aggregateBook(body: any): BookBuilder;
    placeOrder(order: PlaceOrderMessage): Promise<LiveOrder>;
    cancelOrder(id: string): Promise<string>;
    cancelAllOrders(product?: string): Promise<string[]>;
    loadOrder(id: string): Promise<LiveOrder>;
    loadAllOrders(product?: string): Promise<LiveOrder[]>;
    loadBalances(): Promise<Balances>;
    authCall(method: string, path: string, opts: AuthCallOptions): Promise<Response>;
    getSignature(method: string, relativeURI: string, body: string): AuthHeaders;
    handleResponse<T>(req: Promise<Response>, _meta: any): Promise<T>;
    checkAuth(): Promise<void>;
    requestCryptoAddress(cur: string): Promise<CryptoAddress>;
    requestTransfer(req: TransferRequest): Promise<TransferResult>;
    requestWithdrawal(req: WithdrawalRequest): Promise<TransferResult>;
    loadCoinbaseAccounts(force: boolean): Promise<CoinbaseAccount[]>;
    coinbaseTransfer(isDeposit: boolean, amount: BigJS, currency: string): Promise<TransferResult>;
    /**
     * Return a promise for a Coinbase account associated with a given currency. Rejects the promise if the account does not exist
     */
    loadCoinbaseAccount(currency: string, force: boolean): Promise<CoinbaseAccount>;
    private buildBook;
    private loadNextOrders;
}
