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
function isErrorMessage(msg) {
    return msg.type === 'error';
}
exports.isErrorMessage = isErrorMessage;
function isUnknownMessage(msg) {
    return msg.type === 'unknown';
}
exports.isUnknownMessage = isUnknownMessage;
function isSequencedMessage(msg) {
    return typeof msg.sequence === 'number';
}
exports.isSequencedMessage = isSequencedMessage;
function isSnapshotMessage(msg) {
    return msg.type === 'snapshot';
}
exports.isSnapshotMessage = isSnapshotMessage;
const BASE_ORDER_MESSAGE_TYPES = new Set(['changedOrder',
    'newOrder',
    'orderDone']);
function isBaseOrderMessage(msg) {
    return BASE_ORDER_MESSAGE_TYPES.has(msg.type);
}
exports.isBaseOrderMessage = isBaseOrderMessage;
const ORDERBOOK_MESSAGE_TYPE = new Set([...BASE_ORDER_MESSAGE_TYPES,
    'level']);
function isOrderbookMessage(msg) {
    return ORDERBOOK_MESSAGE_TYPE.has(msg.type);
}
exports.isOrderbookMessage = isOrderbookMessage;
const STREAM_MESSAGE_TYPES = new Set(['error',
    'unknown',
    ...ORDERBOOK_MESSAGE_TYPE,
    'trade',
    'snapshot',
    'ticker',
    'placeOrder',
    'cancelOrder',
    'tradeExecuted',
    'tradeFinalized',
    'myOrderPlaced']);
function isStreamMessage(msg) {
    return STREAM_MESSAGE_TYPES.has(msg.type);
}
exports.isStreamMessage = isStreamMessage;
/**
 * Sanitises a message by replacing any keys in the msg object with '***'.
 * Keys are searched recursively.
 * The original message is not modified.
 */
function sanitizeMessage(msg, sensitiveKeys) {
    const clean = {};
    for (const key in msg) {
        if (msg.hasOwnProperty(key)) {
            if (sensitiveKeys.includes(key)) {
                clean[key] = '***';
            }
            else if (typeof msg[key] === 'object') {
                clean[key] = sanitizeMessage(msg[key], sensitiveKeys);
            }
            else {
                clean[key] = msg[key];
            }
        }
    }
    return clean;
}
exports.sanitizeMessage = sanitizeMessage;
//# sourceMappingURL=Messages.js.map