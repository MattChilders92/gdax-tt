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
import WebSocket = require('ws');
import IServerOptions = WebSocket.IServerOptions;
import Server = WebSocket.Server;
import { LiveOrderbook } from '../core/LiveOrderbook';
import * as Commands from './WSCommands';
import { Command } from './WSCommands';
import { ExchangeFeed } from '../exchanges/ExchangeFeed';
import { TickerMessage } from '../core/Messages';
import { Trigger } from '../core/Triggers';
export declare const serverOptions: IServerOptions;
export declare function dataFeedFactory(): Server;
export interface ExchangeConnection {
    feed: ExchangeFeed;
    products: string[];
    tickerTriggers: {
        [product: string]: Trigger<TickerMessage>;
    };
    liveBooks: {
        [product: string]: LiveOrderbook;
    };
}
export declare class DataFeed {
    private readonly socket;
    private readonly exchanges;
    constructor(socket: WebSocket);
    handleIncomingCommand(msg: Command): void;
    send(msg: Command): void;
    close(): void;
    attachToExchange(msg: Commands.AttachCommand): void;
    getConnectedExchange(cmd: Commands.ExchangeCommand): ExchangeConnection;
    getLiveBook(cmd: Commands.OrderbookCommand): LiveOrderbook;
    private subscribeToProduct;
    private unsubscribeFromProduct;
    private initExchange;
    private sendTicker;
    private sendOrderbookState;
}
