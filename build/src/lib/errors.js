"use strict";
/* tslint:disable:max-classes-per-file */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Base class for all errors.
 */
class BaseError extends Error {
    constructor(msg, cause) {
        super(msg);
        this.cause = cause;
        this.time = new Date();
    }
    asMessage() {
        return {
            type: 'error',
            time: this.time,
            message: this.message,
            cause: this.cause
        };
    }
}
exports.BaseError = BaseError;
/**
 * Errors raised as a result of an internal exception raised by GTT code.
 */
class GTTError extends BaseError {
    constructor(msg, cause) {
        super(msg, cause);
    }
}
exports.GTTError = GTTError;
/**
 * Errors raised or captured as a result of errors coming from external network sources, such as WS Feeds or REST APIs
 */
class APIError extends BaseError {
    constructor(msg, cause, meta) {
        super(msg, cause);
        this.meta = meta;
    }
    asMessage() {
        return Object.assign({}, super.asMessage(), { meta: this.meta });
    }
}
exports.APIError = APIError;
/**
 * Errors raised due to failures from REST API calls. The response
 * status and body are returned in the `response` property or in
 * asMessage()'s `meta` property.
 */
class HTTPError extends BaseError {
    constructor(msg, res, cause) {
        super(msg, cause);
        this.response = res || { status: undefined, body: undefined };
    }
    asMessage() {
        return Object.assign({}, super.asMessage(), { meta: this.response });
    }
}
exports.HTTPError = HTTPError;
function extractResponse(res) {
    if (!res) {
        return {
            status: undefined,
            body: undefined
        };
    }
    return {
        status: res.status,
        body: res.body
    };
}
exports.extractResponse = extractResponse;
//# sourceMappingURL=errors.js.map