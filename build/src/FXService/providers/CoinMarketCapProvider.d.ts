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
import { CurrencyPair, FXObject, FXProvider, FXProviderConfig } from '../FXProvider';
export default class CoinMarketCapProvider extends FXProvider {
    private readonly lastUpdate;
    private initializing;
    constructor(config: FXProviderConfig);
    readonly name: string;
    /**
     * Valid quote currencies are USD, BTC, or one of the valid fiat currencies given in [[SUPPORTED_QUOTE_CURRENCIES]]
     * The list of currently supported base currencies will be constructed when this is first called.
     */
    supportsPair(pair: CurrencyPair): Promise<boolean>;
    protected downloadCurrentRate(pair: CurrencyPair): Promise<FXObject>;
}
