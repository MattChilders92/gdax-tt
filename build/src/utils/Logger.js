"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
const winston = require("winston");
const Messages_1 = require("../core/Messages");
function ConsoleLoggerFactory(options) {
    const consoleOptions = {
        colorize: 'all',
        json: false,
        timestamp: true
    };
    const logOptions = Object.assign({ level: 'debug', transports: [
            new winston.transports.Console(consoleOptions)
        ], colorize: true }, (options || {}));
    const logger = winston.createLogger(logOptions);
    return {
        log: (level, message, meta) => {
            logger.log(level, message, meta);
        },
        error: (err) => {
            logger.error(err.stack || err.message);
        }
    };
}
exports.ConsoleLoggerFactory = ConsoleLoggerFactory;
exports.NullLogger = {
    log(_level, _message, _meta) {
    },
    error(_err) {
    }
};
/**
 * Utility function that acts exactly like ConsoleLogger, except that it runs any metadata through messageSanitizer first to blank out sensitive data
 */
function SanitizedLoggerFactory(sensitiveKeys, options) {
    const logger = ConsoleLoggerFactory(options);
    return {
        log: (level, message, meta) => {
            meta = meta && typeof meta === 'object' ? Messages_1.sanitizeMessage(meta, sensitiveKeys) : meta;
            logger.log(level, message, meta);
        },
        error: (err) => {
            logger.error(Messages_1.sanitizeMessage(err, sensitiveKeys));
        }
    };
}
exports.SanitizedLoggerFactory = SanitizedLoggerFactory;
//# sourceMappingURL=Logger.js.map