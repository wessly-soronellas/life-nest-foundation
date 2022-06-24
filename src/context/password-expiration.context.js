import React, {createContext, useContext, useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line camelcase
import {unstable_batchedUpdates} from 'react-dom';
import {QueryClient, QueryClientProvider, useQuery} from 'react-query';
import {useCache, useCardInfo, useData} from '@ellucian/experience-extension/extension-utilities';
const Context = createContext();
const cacheKey = 'passwordExpiration';
const queryClient = new QueryClient();
import {fetchProfileData} from '../hooks/useProfileInfo';

function PasswordExpirationProviderInternal({children}) {

    const {getItem, storeItem} = useCache();
    const {configuration} = useCardInfo();
    const {getExtensionJwt} = useData();
    const {baseApi: base} = configuration;

    const [ passwordCachedData, setPasswordCachedData ] = useState();
    const [ loadPasswordFromCache, setLoadPasswordFromCache] = useState(true);
    const [ loadPasswordFromQuery, setLoadPasswordFromQuery] = useState(false);

    const {data: passwordData, isLoading: passwordLoading, isError: passwordIsError, error: passwordError} = useQuery(
        ["pwdExpiry", {getExtensionJwt, base, endpoint: 'pwdexpiry', method: 'POST'}],
        fetchProfileData,
        {
            enabled: Boolean(loadPasswordFromQuery && getExtensionJwt && base),
            placeholderData: passwordCachedData
        }
    )


    useEffect(() => {
        if (setLoadPasswordFromQuery) {
            (async () => {
                // check for cached data
                const {data: passwordCacheData} = await getItem({key: cacheKey});

                unstable_batchedUpdates(() => {
                    setLoadPasswordFromCache(false);

                    if (passwordCacheData) {
                        setPasswordCachedData(passwordCacheData);
                    } else {
                        setLoadPasswordFromQuery(true)
                    }
                })
            })();
        }
    }, [loadPasswordFromCache]);

    useEffect(() => {
        if (passwordData) {
            storeItem({data: passwordData, key: cacheKey});
            setLoadPasswordFromCache(false);
            setLoadPasswordFromQuery(false);
        }
    }, [passwordData])

    const contextValuePassword = useMemo(() => {
        return {
            data: passwordData || passwordCachedData,
            isError: passwordIsError,
            isLoading: passwordLoading,
            error: passwordError
        }
    }, [passwordCachedData, passwordData, passwordError, passwordLoading]);


    useEffect(() => {
        console.log('PasswordExpirationProvider mounted');
        console.log('ContextValue', contextValuePassword);
        return () => {
            console.log('PasswordExpirationProvider unmounted')
            console.log('ContextValuePwd', contextValuePassword)
        }
    }, []);

    return (
        <Context.Provider value={contextValuePassword}>
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