import React, {createContext, useContext, useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line camelcase
import {unstable_batchedUpdates} from 'react-dom';
import {QueryClient, QueryClientProvider, useQuery} from 'react-query';
import {useCache, useCardInfo, useData} from '@ellucian/experience-extension/extension-utilities';
const Context = createContext();
const cacheKey = 'profile-dashboard';
const queryClient = new QueryClient();
import {fetchProfileData} from '../hooks/useProfileInfo';

function PasswordExpirationProviderInternal({children}) {

    const {getItem, storeItem} = useCache();
    const {configuration, cardId} = useCardInfo();
    const {getExtensionJwt, getEthosQuery} = useData();
    const {baseApi: base} = configuration;

    const [ pwdCachedData, setPwdCachedData ] = useState();

    const pwdQuery = useQuery(
        ["pwdExpiry", {getExtensionJwt, base, endpoint: 'pwdexpiry', method: 'POST'}],
        fetchProfileData
    )


    const {data: pwdData, isLoading: pwdLoading, isError: pwdIsError, error: pwdError} = pwdQuery;


    const contextValuePwd = useMemo(() => {
        return {
            data: pwdData || pwdCachedData,
            isError: pwdIsError,
            isLoading: pwdLoading,
            error: pwdError
        }
    }, [pwdCachedData, pwdData, pwdError, pwdLoading]);


    useEffect(() => {
        console.log('PasswordExpirationProvider mounted');
        console.log('ContextValue', contextValuePwd);
        return () => {
            console.log('PasswordExpirationProvider unmounted')
            console.log('ContextValuePwd', contextValuePwd)
        }
    }, []);

    return (
        <Context.Provider value={contextValuePwd}>
            {children}
        </Context.Provider>
    )
}

PasswordExpirationProviderInternal.propTypes = {
    children: PropTypes.object.isRequired
}

export function PasswordExpirationProvider({children}){
    return (
        <QueryClientProvider client={queryClient}>
            <PasswordExpirationProviderInternal>
                {children}
            </PasswordExpirationProviderInternal>
        </QueryClientProvider>
    )
}

PasswordExpirationProvider.propTypes = {
    children: PropTypes.object.isRequired
}

export function usePasswordExpiration(){
    return useContext(Context);
}