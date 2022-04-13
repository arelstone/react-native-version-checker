import { compare } from 'compare-versions';
import { BaseProvider } from './BaseProvider';
import { BaseOptions, GetVersionOptions, GetVersionResponse, IProvider } from '..';

export class PlayStoreProvider extends BaseProvider implements IProvider {

    storeUrl = ({countryCode, packageName}: BaseOptions) => {
        return `https://play.google.com/store/apps/details?id=${packageName}&hl=${countryCode}`;
    };

    async getVersion({
        packageName, ignoreErrors = true, countryCode = 'US', fetchOptions,
    }: GetVersionOptions): Promise<GetVersionResponse> {
        try {
            if (!packageName) {
                return Promise.reject({
                    message: '[Parse Error]: Missing `packageName`.',
                    status: 404,
                });
            }
        
            const url = this.storeUrl({packageName, countryCode});

            const request = await this.fetch(url, fetchOptions);

            const text = await request.text();
            const match = text.match(/Current Version.+?>([\d.-]+)<\/span>/);

            if (!match) {
                return Promise.reject({
                    message: `[Parse Error]: Could not find the current version of app ${packageName}.`,
                    text,
                    status: request.status,
                });
            }

            const [version] = match;

            return Promise.resolve({
                version,
                url,
                compare,
            });
        } catch (error: any) {
            if (ignoreErrors) {
                return error;
            }
            throw error;
        }
    }
}
