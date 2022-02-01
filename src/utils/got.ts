import HttpStatusCode from 'src/enums/http-status-code-enum';
import got, { Got, Options, PlainResponse, RequestError } from 'got';
import Configuration from 'src/configs/app-config';
import correlator from 'src/configs/correlation-id-config';
import InvalidDataError from 'src/errors/invalid-data-error';
import InvalidRedirectionError from 'src/errors/invalid-redirection-error';
import logger from './logger'
import { getDataAsUrl, isValidUrl } from './url-utils';

const defaultGot = got.extend({
    handlers: [
        (options: Options, next) => {
            logger.info(`External API call ${options.method}: ${options.url}`);
            return next(options);
        }
    ],
    retry: {
        limit: 0
    },
    headers: {
        'user-agent': undefined,
        get [Configuration.app.CORRELATION_ID_KEY]() {
            return correlator.getId()
        }
    }
});

const controlRedirectsGot = got.extend({
    hooks: {
        beforeRedirect: [
            (options: Options, response: PlainResponse) => {
                if (response.request.options.url && options && options.url) {
                    const originalUrl = getDataAsUrl(response.request.options.url);
                    const redirectionUrl = getDataAsUrl(options.url)
                    if (originalUrl.origin !== redirectionUrl.origin) {
                        throw new Error(`Redirection to ${redirectionUrl.origin} is not allowed from ${originalUrl.origin}`);
                    }
                } else {
                    throw new InvalidRedirectionError(`Redirection request unsatified for redirection URL: ${options.url} and original URL: ${response.request.options.url}`);
                }
            }
        ]
    }
});

const createPrefixUrlGot = (prefixUrl: string) => got.extend({ prefixUrl });

/**
 * Build your own version of Got with all the pre-build extensions present in the utility
 * @method disallowRedirectToDifferentOrigin Do not allow HTTP redirects if the origin of the redirect is different
 * @method prefixUrl Provide a prefix URL for all requests made
 * @method build Build an instance of Got with the requested extensions
 */
export class GotBuilder {
    private readonly _gotExtensions: Got[];

    constructor() {
        this._gotExtensions = [defaultGot];
    }

    disallowRedirectToDifferentOrigin(): GotBuilder {
        this._gotExtensions.push(controlRedirectsGot);
        return this;
    }

    prefixUrl(url: string): GotBuilder {
        if (isValidUrl(url)) {
            this._gotExtensions.push(createPrefixUrlGot(url));
            return this;
        } else {
            throw new InvalidDataError(`Invalid URL provided for ${GotBuilder.name} :: ${url}`,
            HttpStatusCode.INTERNAL_SERVER_ERROR);
        }
    }

    build(): Got {
        return got.extend(...this._gotExtensions);
    }
}

export default defaultGot;