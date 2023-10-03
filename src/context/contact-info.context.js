import React, {createContext, useContext, useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line camelcase
import {unstable_batchedUpdates} from 'react-dom';
import {QueryClient, QueryClientProvider, useQuery} from 'react-query';
import {useCache, useCardInfo, useData} from '@ellucian/experience-extension/extension-utilities';
const Context = createContext();
const cacheKey = 'contactInfo';
const queryClient = new QueryClient();
import {fetchProfileData, confirmProfileData} from '../hooks/useProfileInfo';

function ContactInformationProviderInternal({children}) {

    const {getItem, storeItem, removeItem} = useCache();
    const {configuration, cardConfiguration} = useCardInfo();
    const {getExtensionJwt} = useData();
    const {baseApi: base} = configuration || cardConfiguration || {};

    const [ loadContactDataFromCache, setLoadContactDataFromCache] = useState(true);
    const [ loadContactDataFromQuery, setLoadContactDataFromQuery] = useState(false);
    const [ contactCachedData, setContactCachedData ] = useState();

    const [confirmContact, setConfirmContact] = useState(false);
    const [confirmBody, setConfirmBody] = useState(false);


    const {data: contactData, isLoading: contactLoading, isError: contactIsError, error: contactError} = useQuery(
        ["contactInfo", {getExtensionJwt, base, endpoint: 'profile', method: 'GET'}],
        fetchProfileData,
        {
            enabled: Boolean(loadContactDataFromQuery && getExtensionJwt && base),
            placeholderData: contactCachedData
        }
    )

    const {data: confirmContactData, isLoading: confirmContactLoading, isError: confirmContactIsError, error: confirmContactError} = useQuery(
        ["confirmContactInfo", {getExtensionJwt, base, endpoint: 'profile', method: 'PUT', body: confirmBody, confirmContact}],
        confirmProfileData,
        {
            enabled: Boolean(getExtensionJwt && base && confirmBody && confirmContact),
            placeholderData: contactCachedData
        }
    )

    useEffect(() => {
        if (loadContactDataFromCache) {
            (async () => {
                // check for cached data
                const { data: contactCacheData } = await getItem({key: cacheKey});

                unstable_batchedUpdates(() => {
                    setLoadContactDataFromCache(false);

                    if (contactCacheData) {
                        setContactCachedData(contactCacheData);
                    } else{
                        setLoadContactDataFromQuery(true);
                    }
                })
            })();
        }
    }, [loadContactDataFromCache]);

    useEffect(() => {
        if (contactData) {
            storeItem({data: contactData, key: cacheKey});
            setLoadContactDataFromQuery(false);
            setLoadContactDataFromCache(false);
        }
    }, [contactData]);

    useEffect(() => {
        if (confirmContactData){
            (async () => {
                await removeItem({key: cacheKey});
                unstable_batchedUpdates(() => {
                    setLoadContactDataFromCache(false);
                    setLoadContactDataFromQuery(true);
                    setConfirmContact(false);
                })
            })();
        }
    }, [confirmContactData, confirmBody, confirmContact])

    const contextValueContact = useMemo(() => {
        return {
            data: contactData || contactCachedData,
            isError: contactIsError,
            isLoading: contactLoading,
            error: contactError,
            confirmContactData,
            confirmContactLoading,
            confirmContactError,
            confirmBody,
            confirmContact,
            setConfirmBody: (body) => setConfirmBody(body),
            setConfirmContact: (state) => setConfirmContact(state)
        }
    }, [contactCachedData, contactData, contactError, contactLoading,
        confirmContactData, confirmContactLoading, confirmContactError]);


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