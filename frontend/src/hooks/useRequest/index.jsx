import axios from 'axios';
import { useAuth } from 'hooks/useAuth';
import { HttpStatus, HttpMethod } from 'consts';
import { useCallback } from 'react';

export const useRequest = () => {
    const { tokenRefesh, token, refresh } = useAuth();

    const request = useCallback(
        async (url, method = HttpMethod.GET, body = null, headers = {}) => {
            try {
                const { status, data } = await axios.request({
                    url,
                    method,
                    data: body,
                    headers: { ...headers, authorization: `Bearer ${token}` },
                });

                if (status === HttpStatus.UNAUTHORIZED) {
                    const authData = await tokenRefesh(refresh);

                    const { status: retryStatus, data: retryData } = await axios.request({
                        url,
                        method,
                        data: body,
                        headers: { ...headers, authorization: `Bearer ${authData.accessToken}` },
                    });

                    if (retryStatus !== HttpStatus.OK && retryStatus !== HttpStatus.CREATED) {
                        throw new Error(retryData.error);
                    } else {
                        return retryData;
                    }
                }

                if (status !== HttpStatus.OK && status !== HttpStatus.CREATED) throw new Error(data.error);

                return data;
            } catch (error) {
                return Promise.reject(error);
            }
        },
        [token, refresh, tokenRefesh],
    );

    return { request };
};
