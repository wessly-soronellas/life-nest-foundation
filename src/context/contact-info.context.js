import React, {createContext, useContext, useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line camelcase
import {unstable_batchedUpdates} from 'react-dom';
import {QueryClient, QueryClientProvider, useQuery} from 'react-query';
import {useCache, useCardInfo, useData} from '@ellucian/experience-extension/extension-utilities';
const Context = createContext();
const cacheKey = 'contact-info';
const queryClient = new QueryClient();
import {fetchProfileData} from '../hooks/useProfileInfo';

function ContactInformationProviderInternal({children}) {

    const {getItem, storeItem} = useCache();
    const {configuration, cardId} = useCardInfo();
    const {getExtensionJwt, getEthosQuery} = useData();
    const {baseApi: base} = configuration;

    const [ contactCachedData, setContactCachedData ] = useState();


    const contactQuery = useQuery(
        ["contactInfo", {getExtensionJwt, base, endpoint: 'profile', method: 'GET'}],
        fetchProfileData
    )

    const {data: contactData, isLoading: contactLoading, isError: contactIsError, error: contactError} = contactQuery;


    const contextValueContact = useMemo(() => {
        return {
            data: contactData || contactCachedData,
            isError: contactIsError,
            isLoading: contactLoading,
            error: contactError
        }
    }, [contactCachedData, contactData, contactError, contactLoading]);


    useEffect(() => {
        console.log('ContactInformationProvider mounted');
        console.log('ContextValue', contextValueContact);
        return () => {
            console.log('ContactInformationProvider unmounted')
        }
    }, []);

    return (
        <Context.Provider value={contextValueContact}>
            {children}
        </Context.Provider>
    )
}

ContactInformationProviderInternal.propTypes = {
    children: PropTypes.object.isRequired
}

export function ContactInformationProvider({children}){
    return (
        <QueryClientProvider client={queryClient}>
            <ContactInformationProviderInternal>
                {children}
            </ContactInformationProviderInternal>
        </QueryClientProvider>
    )
}

ContactInformationProvider.propTypes = {
    children: PropTypes.object.isRequired
}

export function useContactInformation(){
    return useContext(Context);
}