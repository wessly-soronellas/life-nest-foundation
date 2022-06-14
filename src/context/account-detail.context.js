import React, {createContext, useContext, useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line camelcase
import {unstable_batchedUpdates} from 'react-dom';
import {QueryClient, QueryClientProvider, useQuery} from 'react-query';
import {useCache, useCardInfo, useData} from '@ellucian/experience-extension/extension-utilities';
const Context = createContext();
const cacheKey = 'profile-dashboard';
const queryClient = new QueryClient();
import {fetchCurrentTerm, fetchProfileData, fetchBalanceDetail} from '../hooks/useProfileInfo';

function AccountDetailProviderInternal({children}) {

    const {getItem, storeItem} = useCache();
    const {configuration, cardId} = useCardInfo();
    const {getExtensionJwt, getEthosQuery} = useData();
    const {baseApi: base} = configuration;

    const [accountDetailCachedData, setAccountDetailCachedData] = useState();

    const currentTermQuery = useQuery(
        ["currentTerm", {getExtensionJwt, base, endpoint: 'account/balance', method: 'POST'}],
        fetchProfileData
    )
    const accountDetailQuery = useQuery(
        ["accountDetail", {getExtensionJwt, base, endpoint: 'account/balance', method: 'POST'}],
        fetchProfileData
    )


    const {data: termData, isLoading: termLoading, isError: termIsError, error: termError} = currentTermQuery;
    const {data: detailData, isLoading: detailLoading, isError: detailIsError, error: detailError} = accountDetailQuery;


    const contextValueDetail = useMemo(() => {
        return {
            data: detailData || accountDetailCachedData,
            isError: detailIsError,
            isLoading: detailLoading,
            error: detailError
        }
    }, [accountDetailCachedData, detailData, detailError, detailLoading]);


    useEffect(() => {
        console.log('AccountDetailProvider mounted');
        console.log('ContextValue', contextValueDetail);
        return () => {
            console.log('AccountDetailProvider unmounted')
        }
    }, []);

    return (
        <Context.Provider value={contextValueDetail}>
            {children}
        </Context.Provider>
    )
}

AccountDetailProviderInternal.propTypes = {
    children: PropTypes.object.isRequired
}

export function AccountDetailProvider({children}){
    return (
        <QueryClientProvider client={queryClient}>
            <AccountDetailProviderInternal>
                {children}
            </AccountDetailProviderInternal>
        </QueryClientProvider>
    )
}

AccountDetailProvider.propTypes = {
    children: PropTypes.object.isRequired
}

export function useAccountDetail(){
    return useContext(Context);
}