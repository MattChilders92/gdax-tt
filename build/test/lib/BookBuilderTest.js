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
const BookBuilder_1 = require("../../src/lib/BookBuilder");
const assert = require("assert");
const sides_1 = require("../../src/lib/sides");
const types_1 = require("../../src/lib/types");
const Logger_1 = require("../../src/utils/Logger");
describe('BookBuilder:', () => {
    describe('Empty instance', () => {
        let book = null;
        beforeEach(() => {
            book = new BookBuilder_1.BookBuilder(Logger_1.NullLogger);
        });
        it('has zero total size', () => {
            assert.equal(+book.asksTotal, 0);
            assert.equal(+book.bidsTotal, 0);
            assert.equal(+book.asksValueTotal, 0);
            assert.equal(+book.bidsValueTotal, 0);
            assert.equal(book.numAsks, 0);
            assert.equal(book.numBids, 0);
        });
        it('has a zero state', () => {
            const state = book.state();
            assert.ok(state.sequence <= 0);
            assert.deepEqual(state.bids, []);
            assert.deepEqual(state.asks, []);
            assert.deepEqual(state.orderPool, {});
        });
        it('returns null for best bid/ask', () => {
            assert.equal(book.highestBid, null);
            assert.equal(book.lowestAsk, null);
        });
        it('ordersForValue returns empty list', () => {
            let orders = book.ordersForValue('buy', -1, types_1.Big(1), false);
            assert.deepEqual(orders, []);
            orders = book.ordersForValue('sell', -1, types_1.Big(1), false);
            assert.deepEqual(orders, []);
            orders = book.ordersForValue('buy', -1, types_1.Big(1), true);
            assert.deepEqual(orders, []);
            orders = book.ordersForValue('sell', -1, types_1.Big(1), true);
            assert.deepEqual(orders, []);
        });
        it('hasOrder returns false', () => {
            assert.equal(book.hasOrder('111'), false);
        });
    });
    describe('maintains an orderbook', () => {
        let book = null;
        let randomBook = null;
        const BOOK_SIZE = 1000;
        before(() => {
            book = new BookBuilder_1.BookBuilder(Logger_1.NullLogger);
            randomBook = generateRandomBook(BOOK_SIZE);
            randomBook.orders.forEach((order) => {
                book.add(order);
            });
        });
        it('adds orders', () => {
            assert.ok(book.bidsTotal.eq(randomBook.totalBids), 'totalBids');
            assert.ok(book.asksTotal.eq(randomBook.totalAsks), 'totalAsks');
            assert.ok(book.bidsValueTotal.eq(randomBook.totalBidValue), 'totalBidsValue');
            assert.ok(book.asksValueTotal.eq(randomBook.totalAsksValue), 'totalAsksValue');
            assert.equal(Object.keys(book.orderPool).length, BOOK_SIZE);
        });
        it('Every order in the levels is linked on the order pool', () => {
            let count = 0;
            sides_1.SIDES.forEach((side) => {
                const tree = book.getTree(side);
                tree.each((level) => {
                    level.orders.forEach((order) => {
                        const pooledOrder = book.getOrder(order.id);
                        // Check that it's the same object, not a copy
                        assert.equal(order, pooledOrder);
                        count++;
                    });
                });
            });
            assert.equal(count, BOOK_SIZE);
        });
        it('can remove an order', () => {
            const deconstedOrder = book.remove('00005');
            assert.ok(deconstedOrder, 'Order was not removed');
            assert.ok(!book.hasOrder('00005'));
            if (deconstedOrder.side === 'buy') {
                assert.ok(book.bidsTotal.eq(randomBook.totalBids.minus(deconstedOrder.size)));
                assert.ok(book.bidsValueTotal.eq(randomBook.totalBidValue.minus(deconstedOrder.size.times(deconstedOrder.price))));
            }
            else {
                assert.ok(book.asksTotal.eq(randomBook.totalAsks.minus(deconstedOrder.size)));
                assert.ok(book.asksValueTotal.eq(randomBook.totalAsksValue.minus(deconstedOrder.size.times(deconstedOrder.price))));
            }
        });
        it('adds an order when the order size is zero', () => {
            const order = { id: 'abcdefg',
                price: types_1.Big(123.4567),
                size: types_1.ZERO,
                side: 'buy' };
            assert.ok(!book.hasOrder(order.id), 'Book does not have order');
            assert.ok(book.add(order), 'Book adds the order with zero size');
            assert.ok(book.hasOrder(order.id), 'Book has order');
        });
        it('keeps an order when the order size is modified to zero', () => {
            assert.ok(book.hasOrder('00006'), 'Order was not removed');
            const order = book.getOrder('00006');
            assert.ok(order, 'Order still was not removed');
            assert.ok(book.modify('00006', types_1.ZERO), 'Order can be modified to zero size');
            assert.ok(book.hasOrder('00006'), 'Book has order after modified to zero size');
            assert.ok(book.getOrder('00006').size.eq(types_1.ZERO), 'The order has zero size');
        });
    });
});
function generateRandomBook(n) {
    const result = {
        orders: [],
        totalBids: types_1.ZERO,
        totalAsks: types_1.ZERO,
        totalBidValue: types_1.ZERO,
        totalAsksValue: types_1.ZERO
    };
    for (let i = 0; i < n; i++) {
        const side = Math.random() >= 0.5 ? 'buy' : 'sell';
        const size = types_1.Big(String(Math.random() * 10)).round(1);
        const price = side === 'buy' ? types_1.Big(String(100 - Math.random() * 20)).round(2) : types_1.Big(String(101 + Math.random() * 20)).round(2);
        result.orders.push({
            id: `0000${i}`,
            side: side,
            size: size,
            price: price
        });
        if (side === 'buy') {
            result.totalBids = result.totalBids.plus(size);
            result.totalBidValue = result.totalBidValue.plus(size.times(price));
        }
        else {
            result.totalAsks = result.totalAsks.plus(size);
            result.totalAsksValue = result.totalAsksValue.plus(size.times(price));
        }
    }
    return result;
}
//# sourceMappingURL=BookBuilderTest.js.map