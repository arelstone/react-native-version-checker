export abstract class BaseProvider {
    fetch = async (url: string, options: RequestInit = {}): Promise<Response> => {
        const response = await fetch(
            url,
            {
                method: 'GET',
                ...options,
            },
        );

        if (response.status !== 200) {
            return Promise.reject('Failed to fetch data from the store');
        }


        return Promise.resolve(response);
    };
}
