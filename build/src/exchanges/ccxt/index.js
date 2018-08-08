"use strict";
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ccxt = require("ccxt");
const types_1 = require("../../lib/types");
const BookBuilder_1 = require("../../lib/BookBuilder");
const errors_1 = require("../../lib/errors");
// Supported exchanges, minus those with native support
const exchanges = {
    _1broker: ['1Broker', ccxt._1broker],
    _1btcxe: ['1BTCXE', ccxt._1btcxe],
    acx: ['ACX', ccxt.acx],
    allcoin: ['Allcoin', ccxt.allcoin],
    anxpro: ['ANXPro', ccxt.anxpro],
    bibox: ['Bibox', ccxt.bibox],
    binance: ['Binance', ccxt.binance],
    bit2c: ['Bit2C', ccxt.bit2c],
    bitbank: ['bitbank', ccxt.bitbank],
    bitbay: ['BitBay', ccxt.bitbay],
    bitfinex: ['Bitfinex', ccxt.bitfinex],
    bitfinex2: ['Bitfinex', ccxt.bitfinex2],
    bitflyer: ['bitFlyer', ccxt.bitflyer],
    bithumb: ['Bithumb', ccxt.bithumb],
    bitlish: ['Bitlish', ccxt.bitlish],
    bitmarket: ['BitMarket', ccxt.bitmarket],
    bitmex: ['BitMEX', ccxt.bitmex],
    bitso: ['Bitso', ccxt.bitso],
    bitstamp: ['Bitstamp', ccxt.bitstamp],
    bitstamp1: ['Bitstamp', ccxt.bitstamp1],
    bittrex: ['Bittrex', ccxt.bittrex],
    bitz: ['Bit-Z', ccxt.bitz],
    bl3p: ['BL3P', ccxt.bl3p],
    bleutrade: ['Bleutrade', ccxt.bleutrade],
    braziliex: ['Braziliex', ccxt.braziliex],
    btcbox: ['BtcBox', ccxt.btcbox],
    btcchina: ['BTCChina', ccxt.btcchina],
    btcexchange: ['BTCExchange', ccxt.btcexchange],
    btcmarkets: ['BTC', ccxt.btcmarkets],
    btctradeim: ['BtcTrade.im', ccxt.btctradeim],
    btctradeua: ['BTC', ccxt.btctradeua],
    btcturk: ['BTCTurk', ccxt.btcturk],
    btcx: ['BTCX', ccxt.btcx],
    bxinth: ['BX.in.th', ccxt.bxinth],
    ccex: ['C-CEX', ccxt.ccex],
    cex: ['CEX.IO', ccxt.cex],
    chbtc: ['CHBTC', ccxt.chbtc],
    chilebit: ['ChileBit', ccxt.chilebit],
    cobinhood: ['COBINHOOD', ccxt.cobinhood],
    coincheck: ['coincheck', ccxt.coincheck],
    coinegg: ['CoinEgg', ccxt.coinegg],
    coinex: ['CoinEx', ccxt.coinex],
    coinexchange: ['CoinExchange', ccxt.coinexchange],
    coinfloor: ['coinfloor', ccxt.coinfloor],
    coingi: ['Coingi', ccxt.coingi],
    coinmarketcap: ['CoinMarketCap', ccxt.coinmarketcap],
    coinmate: ['CoinMate', ccxt.coinmate],
    coinnest: ['coinnest', ccxt.coinnest],
    coinone: ['CoinOne', ccxt.coinone],
    coinsecure: ['Coinsecure', ccxt.coinsecure],
    coinspot: ['CoinSpot', ccxt.coinspot],
    coolcoin: ['CoolCoin', ccxt.coolcoin],
    cryptopia: ['Cryptopia', ccxt.cryptopia],
    dsx: ['DSX', ccxt.dsx],
    ethfinex: ['Ethfinex', ccxt.ethfinex],
    exmo: ['EXMO', ccxt.exmo],
    exx: ['EXX', ccxt.exx],
    flowbtc: ['flowBTC', ccxt.flowbtc],
    foxbit: ['FoxBit', ccxt.foxbit],
    fybse: ['FYB-SE', ccxt.fybse],
    fybsg: ['FYB-SG', ccxt.fybsg],
    gatecoin: ['Gatecoin', ccxt.gatecoin],
    gateio: ['Gate.io', ccxt.gateio],
    // gdax: ['GDAX', ccxt.gdax],
    gemini: ['Gemini', ccxt.gemini],
    getbtc: ['GetBTC', ccxt.getbtc],
    hadax: ['HADAX', ccxt.hadax],
    hitbtc: ['HitBTC', ccxt.hitbtc],
    hitbtc2: ['HitBTC', ccxt.hitbtc2],
    huobi: ['Huobi', ccxt.huobi],
    huobicny: ['Huobi', ccxt.huobicny],
    huobipro: ['Huobi', ccxt.huobipro],
    ice3x: ['ICE3X', ccxt.ice3x],
    independentreserve: ['Independent', ccxt.independentreserve],
    indodax: ['INDODAX', ccxt.indodax],
    itbit: ['itBit', ccxt.itbit],
    jubi: ['jubi.com', ccxt.jubi],
    kraken: ['Kraken', ccxt.kraken],
    kucoin: ['Kucoin', ccxt.kucoin],
    kuna: ['Kuna', ccxt.kuna],
    lakebtc: ['LakeBTC', ccxt.lakebtc],
    lbank: ['LBank', ccxt.lbank],
    liqui: ['Liqui', ccxt.liqui],
    livecoin: ['LiveCoin', ccxt.livecoin],
    luno: ['luno', ccxt.luno],
    lykke: ['Lykke', ccxt.lykke],
    mercado: ['Mercado', ccxt.mercado],
    mixcoins: ['MixCoins', ccxt.mixcoins],
    negociecoins: ['NegocieCoins', ccxt.negociecoins],
    nova: ['Novaexchange', ccxt.nova],
    okcoincny: ['OKCoin', ccxt.okcoincny],
    okcoinusd: ['OKCoin', ccxt.okcoinusd],
    okex: ['OKEX', ccxt.okex],
    paymium: ['Paymium', ccxt.paymium],
    poloniex: ['Poloniex', ccxt.poloniex],
    qryptos: ['QRYPTOS', ccxt.qryptos],
    quadrigacx: ['QuadrigaCX', ccxt.quadrigacx],
    quoinex: ['QUOINEX', ccxt.quoinex],
    southxchange: ['SouthXchange', ccxt.southxchange],
    surbitcoin: ['SurBitcoin', ccxt.surbitcoin],
    therock: ['TheRockTrading', ccxt.therock],
    tidex: ['Tidex', ccxt.tidex],
    urdubit: ['UrduBit', ccxt.urdubit],
    vaultoro: ['Vaultoro', ccxt.vaultoro],
    vbtc: ['VBTC', ccxt.vbtc],
    virwox: ['VirWoX', ccxt.virwox],
    wex: ['WEX', ccxt.wex],
    xbtce: ['xBTCe', ccxt.xbtce],
    yobit: ['YoBit', ccxt.yobit],
    yunbi: ['YUNBI', ccxt.yunbi],
    zaif: ['Zaif', ccxt.zaif],
    zb: ['ZB', ccxt.zb],
};
class CCXTExchangeWrapper {
    static createExchange(name, auth, logger, opts = {}) {
        const [owner, exchange] = exchanges[name];
        const upName = name.toUpperCase();
        const key = auth.key || process.env[`${upName}_KEY`];
        const secret = auth.secret || process.env[`${upName}_SECRET`];
        const password = opts.passphrase || process.env[`${upName}_PASSPHRASE`];
        const uid = opts.uid || process.env[`${upName}_UID`];
        const options = Object.assign(opts, { apiKey: key, secret: secret, uid: uid, password: password });
        const ccxtInstance = new exchange(options);
        return new CCXTExchangeWrapper(owner, options, ccxtInstance, logger);
    }
    static supportedExchanges() {
        return Object.keys(exchanges);
    }
    static supportedExchangeNames() {
        const result = [];
        for (const x in exchanges) {
            result.push(exchanges[x][0]);
        }
        return result;
    }
    static getGDAXSymbol(m) {
        return `${m.base}-${m.quote}`;
    }
    constructor(owner, opts, ccxtInstance, logger) {
        this.owner = owner;
        this.instance = ccxtInstance;
        this.options = opts;
        this.logger = logger;
    }
    log(level, msg, meta) {
        if (!this.logger) {
            return;
        }
        this.logger.log(level, msg, meta);
    }
    getSourceSymbol(gdaxProduct) {
        const [base, quote] = gdaxProduct.split('-');
        return this.instance.loadMarkets(false).then((markets) => {
            for (const id in markets) {
                const m = markets[id];
                if (m.base === base && m.quote === quote) {
                    return m.symbol;
                }
            }
            return null;
        }).catch((err) => rejectWithError(`Error loading symbols for ${gdaxProduct} on ${this.instance.name} (CCXT)`, err));
    }
    loadProducts() {
        return this.instance.loadMarkets(true).then((markets) => {
            if (!markets) {
                return [];
            }
            const result = [];
            for (const id in markets) {
                const m = markets[id];
                const product = {
                    id: CCXTExchangeWrapper.getGDAXSymbol(m),
                    sourceId: m.id,
                    baseCurrency: m.base,
                    quoteCurrency: m.quote,
                    baseMinSize: m.info && (m.info.min || m.info.minimum_order_size),
                    baseMaxSize: m.info && (m.info.max || m.info.maximum_order_size),
                    quoteIncrement: m.info && (m.info.quote_increment || m.info.step),
                    sourceData: m.info
                };
                result.push(product);
            }
            return result;
        }).catch((err) => rejectWithError(`Error loading products on ${this.instance.name} (CCXT)`, err));
    }
    loadMidMarketPrice(gdaxProduct) {
        return this.loadTicker(gdaxProduct).then((t) => {
            if (!(t && t.ask && t.bid)) {
                return Promise.reject(new errors_1.HTTPError(`Error loading ticker for ${gdaxProduct} from ${this.instance.name} (CCXT)`, { status: 200, body: t }));
            }
            return Promise.resolve(t.bid.plus(t.ask).div(2));
        });
    }
    loadOrderbook(gdaxProduct) {
        return this.getSourceSymbol(gdaxProduct).then((id) => {
            return this.instance.fetchOrderBook(id);
        }).then((ccxtBook) => {
            const book = new BookBuilder_1.BookBuilder(this.logger);
            const addSide = (side, orders) => {
                orders.forEach((o) => {
                    if (!Array.isArray(o) || o.length !== 2) {
                        return;
                    }
                    const order = {
                        price: types_1.Big(o[0]),
                        size: types_1.Big(o[1]),
                        side: side,
                        id: String(o[0])
                    };
                    book.add(order);
                });
            };
            addSide('buy', ccxtBook.bids);
            addSide('sell', ccxtBook.asks);
            return book;
        }).catch((err) => rejectWithError(`Error loading order book for ${gdaxProduct} on ${this.instance.name} (CCXT)`, err));
    }
    loadTicker(gdaxProduct) {
        return this.getSourceSymbol(gdaxProduct).then((id) => {
            return this.instance.fetchTicker(id);
        }).then((ticker) => {
            if (!ticker) {
                return null;
            }
            const t = {
                productId: gdaxProduct,
                price: types_1.ZERO,
                time: new Date(ticker.timestamp),
                ask: types_1.Big(ticker.bid),
                bid: types_1.Big(ticker.ask),
                volume: types_1.Big(ticker.baseVolume)
            };
            return t;
        }).catch((err) => rejectWithError(`Error loading ticker for ${gdaxProduct} on ${this.instance.name} (CCXT)`, err));
    }
    loadCandles(options) {
        const product = options.gdaxProduct;
        if (!product) {
            return Promise.reject(new Error('No product ID provided to loadCandles'));
        }
        if (!this.instance.hasFetchOHLCV) {
            return Promise.reject(new Error(`${this.instance.name} does not support candles`));
        }
        return this.getSourceSymbol(product).then((id) => {
            return this.instance.fetchOHLCV(id, options.interval);
        }).then((data) => {
            const candles = data.map((d) => {
                return {
                    timestamp: new Date(d[0]),
                    open: types_1.Big(d[1]),
                    high: types_1.Big(d[2]),
                    low: types_1.Big(d[3]),
                    close: types_1.Big(d[4]),
                    volume: types_1.Big(d[5])
                };
            });
            return candles;
        }).catch((err) => rejectWithError(`Error loading candles for ${product} on ${this.instance.name} (CCXT)`, err));
    }
    placeOrder(order) {
        return this.getSourceSymbol(order.productId).then((id) => {
            if (!id) {
                return null;
            }
            const args = Object.assign({ postOnly: order.postOnly, funds: order.funds, clientId: order.clientId }, order.extra);
            return this.instance.createOrder(id, order.orderType, order.side, order.size.toString(), order.price.toString(), args).then((res) => {
                const result = {
                    productId: order.productId,
                    price: types_1.Big(order.price),
                    size: types_1.Big(order.size),
                    side: order.side,
                    id: res.id,
                    time: new Date(),
                    extra: res.info,
                    status: 'active'
                };
                return result;
            }).catch((err) => rejectWithError(`Error placing order for ${order.productId} on ${this.instance.name} (CCXT)`, err));
        });
    }
    cancelOrder(_id) {
        return Promise.reject(new Error('Not implemented yet'));
    }
    cancelAllOrders(_gdaxProduct) {
        return Promise.reject(new Error('Not implemented yet'));
    }
    loadOrder(_id) {
        return Promise.reject(new Error('Not implemented yet'));
    }
    loadAllOrders(_gdaxProduct) {
        return Promise.reject(new Error('Not implemented yet'));
    }
    loadBalances() {
        if (!this.options.apiKey) {
            return Promise.reject(new Error('An API key is required to make this call'));
        }
        return this.instance.fetchBalance().then((balances) => {
            if (!balances) {
                return null;
            }
            const result = { default: {} };
            for (const cur in balances) {
                if (cur === 'info') {
                    continue;
                }
                const total = balances[cur].total;
                const available = balances[cur].free;
                result.default[cur] = {
                    balance: isFinite(total) ? types_1.Big(total) : null,
                    available: isFinite(available) ? types_1.Big(available) : null
                };
            }
            return result;
        }).catch((err) => rejectWithError(`Error loading balances on ${this.instance.name} (CCXT)`, err));
    }
    requestCryptoAddress(_cur) {
        return Promise.reject(new Error('Not implemented yet'));
    }
    requestTransfer(_request) {
        return Promise.reject(new Error('Not implemented yet'));
    }
    requestWithdrawal(_request) {
        return Promise.reject(new Error('Not implemented yet'));
    }
    transfer(_cur, _amount, _from, _to, _options) {
        return Promise.reject(new Error('Not implemented yet'));
    }
    /**
     * Attempts to fetch historical trade data from the exchange and return it in
     */
    fetchHistTrades(symbol, since, limit, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const sourceSymbol = yield this.getSourceSymbol(symbol);
            try {
                const rawTrades = yield this.instance.fetchTrades(sourceSymbol, since, limit, params);
                return rawTrades.map(({ id, timestamp, symbol: productId, side, price, amount }) => ({
                    type: 'trade',
                    time: new Date(timestamp),
                    productId,
                    side,
                    tradeId: id,
                    price: price.toString(),
                    size: amount.toString(),
                }));
            }
            catch (err) {
                return rejectWithError(`Error trade history for ${symbol} on ${this.instance.name} (CCXT)`, err);
            }
        });
    }
    fetchOHLCV(symbol, timeframe, since, limit, params) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.instance.hasFetchOHLCV) {
                return Promise.reject(new errors_1.GTTError(`${this.instance.name} does not support candles`));
            }
            const sourceSymbol = yield this.getSourceSymbol(symbol);
            try {
                return yield this.instance.fetchOHLCV(sourceSymbol, timeframe, since, limit, params);
            }
            catch (err) {
                return rejectWithError(`Error loading candles for ${symbol} on ${this.instance.name} (CCXT)`, err);
            }
        });
    }
}
exports.default = CCXTExchangeWrapper;
function rejectWithError(msg, error) {
    const err = new errors_1.GTTError(`${error.constructor.name}: ${msg}`, error);
    return Promise.reject(err);
}
//# sourceMappingURL=index.js.map