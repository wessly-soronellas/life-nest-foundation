import React, {createContext, useContext, useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line camelcase
import {unstable_batchedUpdates} from 'react-dom';
import {QueryClient, QueryClientProvider, useQuery} from 'react-query';
import {useCache, useCardInfo, useData} from '@ellucian/experience-extension/extension-utilities';
const Context = createContext();
const cacheKey = 'meal-plan';
const queryClient = new QueryClient();
import {fetchProfileData} from '../hooks/useProfileInfo';

function MealPlanProviderInternal({children}) {

    const {getItem, storeItem} = useCache();
    const {configuration, cardId} = useCardInfo();
    const {getExtensionJwt, getEthosQuery} = useData();
    const {baseApi: base} = configuration;

    const [ mealCachedData, setMealCachedData ] = useState();

    const mealQuery = useQuery(
        ["mealPlan", {getExtensionJwt, base, endpoint: 'transact', method: 'POST'}],
        fetchProfileData
    )

    const {data: mealData, isLoading: mealLoading, isError: mealIsError, error: mealError} = mealQuery;


    const contextValueMeal = useMemo(() => {
        return {
            data: mealData || mealCachedData,
            isError: mealIsError,
            isLoading: mealLoading,
            error: mealError
        }
    }, [mealCachedData, mealData, mealError, mealLoading]);


    useEffect(() => {
        console.log('MealPlanProvider mounted');
        console.log('ContextValue', contextValueMeal);
        return () => {
            console.log('MealPlanProvider unmounted')
        }
    }, []);

    return (
        <Context.Provider value={contextValueMeal}>
            {children}
        </Context.Provider>
    )
}

MealPlanProviderInternal.propTypes = {
    children: PropTypes.object.isRequired
}

export function MealPlanProvider({children}){
    return (
        <QueryClientProvider client={queryClient}>
            <MealPlanProviderInternal>
                {children}
            </MealPlanProviderInternal>
        </QueryClientProvider>
    )
}

MealPlanProvider.propTypes = {
    children: PropTypes.object.isRequired
}

export function useMealPlanInformation(){
    return useContext(Context);
}