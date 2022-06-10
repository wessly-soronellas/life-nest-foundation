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

function ProfileDashboardProviderInternal({children}) {

    const {getItem, storeItem} = useCache();
    const {configuration, cardId} = useCardInfo();
    const {getExtensionJwt, getEthosQuery} = useData();
    const {baseApi: base} = configuration;

    const [ pwdCachedData, setPwdCachedData ] = useState();
    const [ mealCachedData, setMealCachedData ] = useState();
    const [ contactCachedData, setContactCachedData ] = useState();
    const [ balanceCachedData, setBalanceCachedData ] = useState();

    const pwdQuery = useQuery(
        ["pwdExpiry", {getExtensionJwt, base, endpoint: 'pwdexpiry', method: 'POST'}],
        fetchProfileData
    )

    const contactQuery = useQuery(
        ["contactInfo", {getExtensionJwt, base, endpoint: 'profile', method: 'GET'}],
        fetchProfileData
    )
    const mealQuery = useQuery(
        ["mealPlan", {getExtensionJwt, base, endpoint: 'transact', method: 'POST'}],
        fetchProfileData
    )
    const balanceQuery = useQuery(
        ["accountBalance", {getExtensionJwt, base, endpoint: 'account/balance', method: 'POST'}],
        fetchProfileData
    )


    const {data: pwdData, isLoading: pwdLoading, isError: pwdIsError, error: pwdError} = pwdQuery;
    const {data: mealData, isLoading: mealLoading, isError: mealIsError, error: mealError} = mealQuery;
    const {data: contactData, isLoading: contactLoading, isError: contactIsError, error: contactError} = contactQuery;
    const {data: balanceData, isLoading: balanceLoading, isError: balanceIsError, error: balanceError} = balanceQuery;
    // const {data: detailData, isLoading: detailLoading, isError: detailIsError, error: detailError} = detailQuery;


    const contextValuePwd = useMemo(() => {
        return {
            data: pwdData || pwdCachedData,
            isError: pwdError,
            isLoading: pwdLoading
        }
    }, [pwdCachedData, pwdData, pwdError, pwdLoading]);

    const contextValueMeal = useMemo(() => {
        return {
            data: mealData || mealCachedData,
            isError: mealError,
            isLoading: mealLoading
        }
    }, [mealCachedData, mealData, mealError, mealLoading]);

    const contextValueContact = useMemo(() => {
        return {
            data: contactData || contactCachedData,
            isError: contactError,
            isLoading: contactLoading
        }
    }, [contactCachedData, contactData, contactError, contactLoading]);

    const contextValueBalance = useMemo(() => {
        return {
            data: balanceData || balanceCachedData,
            isError: balanceError,
            isLoading: balanceLoading
        }
    }, [balanceCachedData, balanceData, balanceError, balanceLoading]);

    const data = {
        password: pwdData,
        meal: mealData,
        contact: contactData,
        balance: balanceData

    }

    const isError = {
        password: pwdIsError,
        meal: mealIsError,
        contact: contactIsError,
        balance: balanceIsError

    }

    const isLoading = {
        password: pwdLoading,
        meal: mealLoading,
        contact: contactLoading,
        balance: balanceLoading

    }

    const contextValue = useMemo(() => {
        return {
            data,
            isError,
            isLoading
        }
    }, [data, isError, isLoading]);

    useEffect(() => {
        console.log('ProfileDashboardProvider mounted');
        console.log('ContextValue', contextValue);
        return () => {
            console.log('ProfileDashboardProvider unmounted')
        }
    }, []);

    return (
        <Context.Provider value={contextValue}>
            {children}
        </Context.Provider>
    )
}

ProfileDashboardProviderInternal.propTypes = {
    children: PropTypes.object.isRequired
}

export function ProfileDashboardProvider({children}){
    return (
        <QueryClientProvider client={queryClient}>
            <ProfileDashboardProviderInternal>
                {children}
            </ProfileDashboardProviderInternal>
        </QueryClientProvider>
    )
}

ProfileDashboardProvider.propTypes = {
    children: PropTypes.object.isRequired
}

export function useProfileDashboard(){
    return useContext(Context);
}