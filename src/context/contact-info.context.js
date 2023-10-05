import React, {createContext, useContext, useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line camelcase
import {unstable_batchedUpdates} from 'react-dom';
import {ReactQueryDevtools} from 'react-query/devtools';
import {QueryClient, QueryClientProvider, useQuery} from 'react-query';
import {useCache, useCardInfo, useData} from '@ellucian/experience-extension/extension-utilities';
const Context = createContext();
const cacheKey = 'contactInfo';
const queryClient = new QueryClient();
import {fetchProfileData, confirmProfileData} from '../hooks/useProfileInfo';

function ContactInformationProviderInternal({children}) {

    const {configuration, cardConfiguration} = useCardInfo();
    const {getExtensionJwt} = useData();
    const {baseApi: base} = configuration || cardConfiguration || {};

    const [ loadContactDataFromQuery, setLoadContactDataFromQuery] = useState(true);

    const [confirmContact, setConfirmContact] = useState(false);
    const [confirmBody, setConfirmBody] = useState(false);


    const {data: contactData, isLoading: contactLoading, isError: contactIsError, error: contactError} = useQuery(
        ["contactInfo", {getExtensionJwt, base, endpoint: 'profile', method: 'GET'}],
        fetchProfileData,
        {
            enabled: Boolean(loadContactDataFromQuery && getExtensionJwt && base)
        }
    )

    const {data: confirmContactData, isLoading: confirmContactLoading, isError: confirmContactIsError, error: confirmContactError} = useQuery(
        ["confirmContactInfo", {getExtensionJwt, base, endpoint: 'profile', method: 'PUT', body: confirmBody, confirmContact}],
        confirmProfileData,
        {
            enabled: Boolean(getExtensionJwt && base && confirmBody && confirmContact)
        }
    )

    /*
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
    */

    useEffect(() => {
        if (contactData) {
            setLoadContactDataFromQuery(false);
        }
    }, [contactData]);

    useEffect(() => {
        if (confirmContactData?.status == "ok") {
            console.log("update success")
            setConfirmContact(false);
            setConfirmBody(null);
            setLoadContactDataFromQuery(true);
            queryClient.refetchQueries(['contactInfo']);
            setLoadContactDataFromQuery(false);
        }
    }, [confirmContactData]);

    const contextValueContact = useMemo(() => {
        return {
            data: contactData,
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
    }, [contactData, contactError, contactLoading,
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
            <ReactQueryDevtools />
        </QueryClientProvider>
    )
}

ContactInformationProvider.propTypes = {
    children: PropTypes.object.isRequired
}

export function useContactInformation(){
    return useContext(Context);
}