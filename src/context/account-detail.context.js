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
    const {configuration, cardConfiguration, cardId} = useCardInfo();
    const {getExtensionJwt, getEthosQuery} = useData();
    const {baseApi: base} = configuration || cardConfiguration || {};
    const {termFromConfig} = configuration || cardConfiguration || {};
    const {termFromConfigTitle} = configuration || cardConfiguration || {};

    // hooks to store cached data
    const [currentTermCachedData, setCurrentTermCachedData] = useState();
    const [accountDetailCachedData, setAccountDetailCachedData] = useState();
    const [accountBalanceCachedData, setAccountBalanceCachedData] = useState();

    // hook to trigger account detail query
    const [selectedTerm, setSelectedTerm] = useState('default');

    // hooks to signal load cached data status. Default is true so first attempt is trying to fecth from cache.
    const [loadCurrentTermFromCache, setLoadCurrentTermFromCache] = useState(true);
    const [loadBalanceFromCache, setLoadBalanceFromCache] = useState(true);
    const [loadDetailFromCache, setLoadDetailFromCache] = useState(true);

    // hooks to signal load from query status. Default is false so first attempt is done using cached data.
    const [loadCurrentTermFromQuery, setLoadCurrentTermFromQuery] = useState(false);
    const [loadBalanceFromQuery, setLoadBalanceFromQuery] = useState(false);
    const [loadDetailFromQuery, setLoadDetailFromQuery] = useState(false);

    const {data: currentTermData, isLoading: currentTermLoading, isError: currentTermIsError, error: currentTermError} = useQuery(
        ["currentTerm", {getEthosQuery, termFromConfig, termFromConfigTitle}],
        fetchCurrentTerm,
        {
            enabled: Boolean(loadCurrentTermFromQuery),
            placeholderData: currentTermCachedData
        }
    )
    const {data: detailData, isLoading: detailLoading, isError: detailIsError, error: detailError} = useQuery(
        ["accountDetail", {getExtensionJwt, getEthosQuery, termFromConfig, termFromConfigTitle, base, endpoint: 'account/detail', method: 'POST', term: selectedTerm}],
        fetchBalanceDetail,
        {
            enabled: Boolean(loadDetailFromQuery && getExtensionJwt && base && selectedTerm)
        }
    )
    const {data: balanceData, isLoading: balanceLoading, isError: balanceIsError, error: balanceError} = useQuery(
        ["accountBalance", {getExtensionJwt, base, endpoint: 'account/balance', method: 'POST'}],
        fetchProfileData,
        {
            enabled: Boolean(loadBalanceFromQuery && getExtensionJwt && base),
            placeholderData: accountBalanceCachedData
        }
    )

    // useEffect for performing currentTerm cache checking logic
    useEffect(() => {
        if (loadCurrentTermFromCache){
            (async () => {
                // check for cached data
                const {data: currentTermCacheData} = await getItem({key: 'currentTerm', scope: cardId});

                unstable_batchedUpdates(() => {
                    setLoadCurrentTermFromCache(false);

                    if (currentTermCacheData){
                        setCurrentTermCachedData(currentTermCacheData);
                        setLoadCurrentTermFromQuery(false);
                    } else {
                        setLoadCurrentTermFromQuery(true);
                    }
                })
            })();
        }
    }, [loadCurrentTermFromCache]);

    // useEffect for performing balanceData cache checking logic
    useEffect(() => {
        if (loadBalanceFromCache){
            (async () => {
                // check for cached data
                const {data: accountBalanceCacheData} = await getItem({key: 'accountBalance', scope: cardId});

                unstable_batchedUpdates(() => {
                    setLoadCurrentTermFromCache(false);

                    if (accountBalanceCacheData){
                        setAccountBalanceCachedData(accountBalanceCacheData);
                        setLoadBalanceFromQuery(false);
                    } else {
                        setLoadBalanceFromQuery(true);
                    }
                })
            })();
        }
    }, [loadBalanceFromCache]);

    // useEffect for performing detailData cache checking logic
    useEffect(() => {
            (async () => {
                // check for cached data
                const {data: accountDetailCacheData} = await getItem({key: `accountDetail/${selectedTerm}`, scope: cardId});

                unstable_batchedUpdates(() => {
                    setLoadDetailFromCache(false);

                    if (accountDetailCacheData){
                        console.log('The term from cache', accountDetailCacheData.term)
                        setAccountDetailCachedData(accountDetailCacheData);
                    } else {
                        setLoadDetailFromQuery(true);
                    }

                })
            })();
    }, [loadDetailFromCache, selectedTerm]);


    // useEffect for storing currentTerm data and turning off useState hooks
    useEffect(() => {
        if (currentTermData && cardId) {
            console.log('trying to store currentTerm in cache', currentTermData);
            storeItem({data: currentTermData, key: 'currentTerm', scope: cardId});
            setLoadCurrentTermFromCache(false);
            setLoadCurrentTermFromQuery(false);
        }
    }, [currentTermData]);

    // useEffect for storing accountBalance data and turning off useState hooks
    useEffect(() => {
        if (balanceData && cardId) {
            console.log('trying to store balanceData in cache');
            storeItem({data: balanceData, key: 'accountBalance', scope: cardId});
            setLoadBalanceFromCache(false);
            setLoadBalanceFromQuery(false);
        }
    }, [balanceData]);

    // useEffect for storing accountDetail data and turning off useState hooks
    useEffect(() => {
        if (detailData && cardId) {
            console.log('trying to store detailData in cache');
            storeItem({data: detailData, key: `accountDetail/${selectedTerm}`, scope: cardId});
            setLoadDetailFromCache(false);
            setLoadDetailFromQuery(false);
        }
    }, [detailData, selectedTerm]);

    const contextValueBalance = useMemo(() => {
        return {
            balance: {
                balanceData: balanceData || accountBalanceCachedData,
                balanceIsError,
                balanceLoading,
                balanceError
            },
            currentTerm: {
                currentTermData: currentTermData || currentTermCachedData,
                currentTermLoading,
                currentTermIsError,
                currentTermError
            },
            selectedTerm,
            setTerm: (term) => setSelectedTerm(term),
            detail: {
                detailData: detailData || accountDetailCachedData,
                detailLoading,
                detailIsError,
                detailError
            }
        }
    }, [
        accountBalanceCachedData, currentTermCachedData, accountDetailCachedData,
        balanceData, currentTermData, detailData,
        balanceError, currentTermError, detailError,
        balanceLoading, currentTermLoading, detailLoading
        ]);

    /* useEffect(() => {
        console.log('currentTerm cache logger');
        console.log('currentTermCachedData, the actual data object', currentTermCachedData);
        console.log('loadCurrentTermFromCache, hook to try cached data. Default is true', loadCurrentTermFromCache);
        console.log('loadCurrentTermFromQuery, hook to try query data. Default is false', loadCurrentTermFromQuery);
        console.log('currentTermData, the data retrieved from useQuery', currentTermData);
    }, [
        currentTermCachedData,
        loadCurrentTermFromCache,
        loadCurrentTermFromQuery,
        currentTermData
    ]); */

    /* useEffect(() => {
        console.log('accountBalance cache logger');
        console.log('accountBalanceCachedData, the actual data object', accountBalanceCachedData);
        console.log('loadBalanceFromCache, hook to try cached data. Default is true', loadBalanceFromCache);
        console.log('loadBalanceFromQuery, hook to try query data. Default is false', loadBalanceFromQuery);
        console.log('BalanceData, the data retrieved from useQuery', balanceData);
    }, [
        accountBalanceCachedData,
        loadBalanceFromCache,
        loadBalanceFromQuery,
        balanceData
    ]); */

    /* useEffect(() => {
        console.log('accountDetail cache logger');
        console.log('accountDetailCachedData, the actual data object', accountDetailCachedData);
        console.log('loadDetailFromCache, hook to try cached data. Default is true', loadDetailFromCache);
        console.log('loadDetailFromQuery, hook to try query data. Default is false', loadDetailFromQuery);
        console.log('DetailData, the data retrieved from useQuery', detailData);
        console.log('DetailData, the selectedTerm', selectedTerm);
    }, [
        accountDetailCachedData,
        loadDetailFromCache,
        loadDetailFromQuery,
        detailData,
        selectedTerm
    ]); */

    useEffect(() => {
        console.log('AccountDetailProvider mounted');
        return () => {
            console.log('AccountDetailProvider unmounted')
        }
    }, []);

    return (
        <Context.Provider value={contextValueBalance}>
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