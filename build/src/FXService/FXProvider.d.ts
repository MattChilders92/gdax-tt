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
import { Logger } from '../utils/Logger';
import { BigNumber as BigJS } from 'bignumber.js';
export interface CurrencyPair {
    from: string;
    to: string;
}
export declare function pairAsString(pair: CurrencyPair): string;
export interface FXObject extends CurrencyPair {
    time: Date;
    rate: BigJS;
    change?: BigJS;
}
export declare class EFXRateUnavailable extends Error {
    readonly provider: string;
    constructor(msg: string, provider: string);
}
export interface FXProviderConfig {
    logger?: Logger;
}
export declare abstract class FXProvider {
    private readonly logger;
    private readonly _pending;
    constructor(config: FXProviderConfig);
    abstract readonly name: string;
    log(level: string, message: string, meta?: any): void;
    fetchCurrentRate(pair: CurrencyPair): Promise<FXObject>;
    abstract supportsPair(pair: CurrencyPair): Promise<boolean>;
    /**
     * Returns a promise for the current rate. IsSupported must be true, and is not checked here. The method returns a
     * promise for the current network request, or generates a new one.
     * @param pair
     * @returns {Promise<FXObject>}
     */
    protected getPromiseForRate(pair: CurrencyPair): Promise<FXObject>;
    /**
     * Fetch the latest FX exchange rate from the service provider and return a promise for an FXObject.
     * If the service is down, or the latest value is unavailable, reject the promise with an EFXRateUnavailable error
     * @param pair
     */
    protected abstract downloadCurrentRate(pair: CurrencyPair): Promise<FXObject>;
}
