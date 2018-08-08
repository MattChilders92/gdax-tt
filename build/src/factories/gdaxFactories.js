"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
const GDAXFeed_1 = require("../exchanges/gdax/GDAXFeed");
const GDAXExchangeAPI_1 = require("../exchanges/gdax/GDAXExchangeAPI");
const ExchangeFeed_1 = require("../exchanges/ExchangeFeed");
let publicAPIInstance;
function getAuthFromEnv() {
    const env = process.env;
    if (env.GDAX_KEY && env.GDAX_SECRET && env.GDAX_PASSPHRASE) {
        return {
            key: env.GDAX_KEY,
            secret: env.GDAX_SECRET,
            passphrase: env.GDAX_PASSPHRASE
        };
    }
    else {
        return null;
    }
}
/**
 * A convenience function that returns a GDAXExchangeAPI instance for accessing REST methods conveniently. If API
 * key details are found in the GDAX_KEY etc. envars, they will be used
 */
function DefaultAPI(logger) {
    if (!publicAPIInstance) {
        publicAPIInstance = new GDAXExchangeAPI_1.GDAXExchangeAPI({
            logger: logger,
            apiUrl: GDAXExchangeAPI_1.GDAX_API_URL,
            auth: getAuthFromEnv()
        });
    }
    return publicAPIInstance;
}
exports.DefaultAPI = DefaultAPI;
/**
 * Convenience function to connect to and subscribe to the given channels
 * @param options {object} Any options from GDAXConfig will be accepted
 * @param products {string[]} An array of products to subscribe to
 */
function getSubscribedFeeds(options, products) {
    const config = {
        wsUrl: options.wsUrl || GDAXFeed_1.GDAX_WS_FEED,
        auth: options.auth,
        logger: options.logger,
        apiUrl: options.apiUrl || GDAXExchangeAPI_1.GDAX_API_URL,
        channels: options.channels || null
    };
    const feed = ExchangeFeed_1.getFeed(GDAXFeed_1.GDAXFeed, config);
    if (feed.isConnected()) {
        return feed.subscribe(products).then(() => {
            return feed;
        });
    }
    return new Promise((resolve) => {
        if (!feed.isConnecting) {
            feed.reconnect(50);
        }
        feed.once('websocket-open', () => {
            feed.subscribe(products).then(() => {
                return resolve(feed);
            });
        });
    });
}
exports.getSubscribedFeeds = getSubscribedFeeds;
/**
 * This is a straightforward wrapper around getSubscribedFeeds using the Factory pattern with the most commonly used
 * defaults. For customised feeds, use getSubscribedFeeds instead.
 *
 * It is assumed that your API keys are stored in the GDAX_KEY, GDAX_SECRET and GDAX_PASSPHRASE envars
 */
function FeedFactory(logger, productIDs, auth) {
    auth = auth || getAuthFromEnv();
    // Use the GDAX API to get, and subscribe to all the endpoints
    let productPromise;
    if (productIDs) {
        productPromise = Promise.resolve(productIDs);
    }
    else {
        productPromise = DefaultAPI(logger)
            .loadProducts()
            .then((products) => {
            const ids = products.map((p) => p.id);
            return ids;
        });
    }
    return productPromise.then((productIds) => {
        return getSubscribedFeeds({ auth: auth, logger: logger }, productIds);
    }).catch((err) => {
        if (logger) {
            logger.error(err);
        }
        else {
            console.error(err);
        }
        return null;
    });
}
exports.FeedFactory = FeedFactory;
//# sourceMappingURL=gdaxFactories.js.map