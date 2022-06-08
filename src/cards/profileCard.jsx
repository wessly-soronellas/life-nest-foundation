import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types';
import {
    QueryClient,
    QueryClientProvider,
    useQuery
} from 'react-query'
import { useCardInfo, useData } from "@ellucian/experience-extension/extension-utilities";
import axios from "axios";

const queryClient = new QueryClient();

export async function fetchCurrentTerm(getEthosQuery){
    try {
        const event= new Date(Date.now());
        const jsonDate = event.toJSON();
        const datetime = jsonDate.substring(0, jsonDate.indexOf('T'));
        const currentTerm = await getEthosQuery({queryId: 'get-this-term', properties: {'current': datetime}});
        const {data: {term: {edges: termEdges } = []} = {} } = currentTerm;
        const term = termEdges.map(edge => edge.node);
        return term[0]
    } catch (error) {
        throw new Error('Error during ethos query');
    }
}

export async function fetchProfileData({queryKey}){
    const [_key, {getExtensionJwt, base, endpoint, method}] = queryKey
    console.log(queryKey);

    try {
        const url = `${base}/${endpoint}`;
        const jwt = await getExtensionJwt();
        return fetch(url, {
            method: method,
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        })
        .then(res => res.json())
    } catch (error) {
        console.log(error);
        return error
    }
}

export async function fetchBalanceDetail({queryKey}){
    const [_key, {getExtensionJwt, base, endpoint, method, term}] = queryKey
    console.log(queryKey);
    const payload={"term":term}

    try {
        const url = `${base}/${endpoint}`;
        const jwt = await getExtensionJwt();
        return fetch(url, {
            method: method,
            headers: {
                'Authorization': `Bearer ${jwt}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        .then(res => res.json())
    } catch (error) {
        console.log(error);
        return error
    }
}

const ProfileDashboard = () => {
    const {getExtensionJwt, getEthosQuery} = useData();
    const {configuration} = useCardInfo();
    const {baseApi: base} = configuration;

    const [termSelected, setTermSelected] = useState('');

    useEffect(() => {
        async function getThisTerm(){
            const termObject = await fetchCurrentTerm(getEthosQuery);
            console.log(termObject);
            setTermSelected(termObject.code)
        }
        getThisTerm();
    }, [])

    const pwdQuery = useQuery(
        ["pwdExpiry", {getExtensionJwt, base, endpoint: 'pwdexpiry', method: 'POST'}],
        fetchProfileData
    )
    const mealQuery = useQuery(
        ["mealPlan", {getExtensionJwt, base, endpoint: 'transact', method: 'POST'}],
        fetchProfileData
    )
    const contactQuery = useQuery(
        ["contactInfo", {getExtensionJwt, base, endpoint: 'profile', method: 'GET'}],
        fetchProfileData
    )
    const balanceQuery = useQuery(
        ["accountBalance", {getExtensionJwt, base, endpoint: 'account/balance', method: 'POST'}],
        fetchProfileData
    )
    const detailQuery = useQuery(
        ["accountDetail", {getExtensionJwt, base, endpoint: 'account/detail', method: 'POST', term: termSelected}],
        fetchBalanceDetail
    )

    const {data: pwdData, isLoading: pwdLoading, isError: pwdIsError, error: pwdError} = pwdQuery;
    const {data: mealData, isLoading: mealLoading, isError: mealIsError, error: mealError} = mealQuery;
    const {data: contactData, isLoading: contactLoading, isError: contactIsError, error: contactError} = contactQuery;
    const {data: balanceData, isLoading: balanceLoading, isError: balanceIsError, error: balanceError} = balanceQuery;
    const {data: detailData, isLoading: detailLoading, isError: detailIsError, error: detailError} = detailQuery;

    if (pwdLoading || mealLoading || contactLoading || balanceLoading || detailLoading){
        return <p>Loading...</p>
    }

    if (pwdIsError){
        return <p>Error: {pwdError}</p>
    }

    if (mealIsError){
        return <p>Error: {mealError}</p>
    }

    if (contactIsError){
        return <p>Error: {contactError}</p>
    }


    if (balanceIsError){
        return <p>Error: {balanceError}</p>
    }
    if (detailIsError){
        return <p>Error: {detailError}</p>
    }

    return (
        <div>
            <pre>{JSON.stringify(pwdData)}</pre>
            <pre>{JSON.stringify(mealData)}</pre>
            <pre>{JSON.stringify(contactData)}</pre>
            <pre>{JSON.stringify(balanceData)}</pre>
            <pre>{JSON.stringify(detailData)}</pre>
        </div>
    )
}

function App(){
    return(
        <QueryClientProvider client={queryClient}>
            <ProfileDashboard />
        </QueryClientProvider>
    )
}

export default App;