import { compare } from 'compare-versions';
import { BaseOptions, GetVersionOptions, GetVersionResponse, IProvider } from '..';
import { BaseProvider } from './BaseProvider';

type AppStoreResponse = {
  resultCount: number;
  results: ReadonlyArray<{
    version: string;
    trackId: string;
    [key: string]: unknown;
  }>;
}

export class AppStoreProvider extends BaseProvider  implements IProvider {
    static storeUrl = ({countryCode, packageName}: BaseOptions) => {
        return `https://itunes.apple.com/${countryCode.toLowerCase()}/lookup?bundleId=${packageName}&date=${new Date().getTime()}`;
    };

    async getVersion({
        packageName, countryCode = 'US', ignoreErrors = true, fetchOptions,
    }: GetVersionOptions): Promise<GetVersionResponse> {
        try {
            const request = await this.fetch(
                AppStoreProvider.storeUrl({countryCode, packageName}),
                fetchOptions,
            );
            
            const json: AppStoreResponse = await request.json();

            if (!json.resultCount) {
                return Promise.reject({
                    message: 'No info about the app',
                    text: packageName,
                    status: 404,
                });
            }
            const [{trackId, version}] = json.results;

        
            return {
                version,
                url: `itms-apps://apps.apple.com/${countryCode}app/id${trackId}`,
                compare,
            };
        } catch (error: any){
            if (ignoreErrors) {
                return error;
            } 
            throw error;
        }
    }
}

