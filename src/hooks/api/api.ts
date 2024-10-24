import {
    BaseQueryFn,
    FetchArgs,
    createApi,
    fetchBaseQuery,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { Logger } from '@services';

interface ApiConfig {
    baseUrl: string;
    reducerPath: string;
    endpoints: (builder: any) => any;
}

export const api = ({ baseUrl, reducerPath, endpoints }: ApiConfig) => {
    const baseQuery = fetchBaseQuery({ baseUrl });

    const baseQueryWithInterceptor: BaseQueryFn<
        string | FetchArgs,
        unknown,
        FetchBaseQueryError
    > = async (args, api, extraOptions) => {
        const result = await baseQuery(args, api, extraOptions);

        if (result.error && result.error.status === 401) {
            Logger.log('Unauthorized.');
        }

        return result;
    };

    return createApi({
        baseQuery: baseQueryWithInterceptor,
        reducerPath,
        endpoints,
    });
};

export default api;
