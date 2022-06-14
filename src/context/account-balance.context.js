import React, {createContext, useContext, useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line camelcase
import {unstable_batchedUpdates} from 'react-dom';
import {QueryClient, QueryClientProvider, useQuery} from 'react-query';
import {useCache, useCardInfo, useData} from '@ellucian/experience-extension/extension-utilities';
const Context = createContext();
const cacheKey = 'account-balance';
const queryClient = new QueryClient();
import {fetchProfileData} from '../hooks/useProfileInfo';

function AccountBalanceProviderInternal({children}) {

    const {getItem, storeItem} = useCache();
    const {configuration, cardId} = useCardInfo();
    const {getExtensionJwt, getEthosQuery} = useData();
    const {baseApi: base} = configuration;

    const [ balanceCachedData, setBalanceCachedData ] = useState();

    const balanceQuery = useQuery(
        ["accountBalance", {getExtensionJwt, base, endpoint: 'account/balance', method: 'POST'}],
        fetchProfileData
    )

    const {data: balanceData, isLoading: balanceLoading, isError: balanceIsError, error: balanceError} = balanceQuery;

    const contextValueBalance = useMemo(() => {
        return {
            data: balanceData || balanceCachedData,
            isError: balanceError,
            isLoading: balanceLoading
        }
    }, [balanceCachedData, balanceData, balanceError, balanceLoading]);


    useEffect(() => {
        console.log('AccountBalanceProvider mounted');
        console.log('ContextValue', contextValueBalance);
        return () => {
            console.log('AccountBalanceProvider unmounted')
        }
    }, []);

    return (
        <Context.Provider value={contextValueBalance}>
            {children}
        </Context.Provider>
    )
}

AccountBalanceProviderInternal.propTypes = {
    children: PropTypes.object.isRequired
}

export function AccountBalanceProvider({children}){
    return (
        <QueryClientProvider client={queryClient}>
            <AccountBalanceProviderInternal>
                {children}
            </AccountBalanceProviderInternal>
        </QueryClientProvider>
    )
}

AccountBalanceProvider.propTypes = {
    children: PropTypes.object.isRequired
}

export function useAccountBalance(){
    return useContext(Context);
}