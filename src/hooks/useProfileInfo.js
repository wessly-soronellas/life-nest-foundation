export async function fetchCurrentTerm({queryKey}){
    console.log('QUERY-KEY:', queryKey)
    const [_key, {getEthosQuery, termFromConfig, termFromConfigTitle}] = queryKey;
    // console.log('queryKey CURRENT', _key);
    try {

        const event= new Date(Date.now());
        const jsonDate = event.toJSON();
        const datetime = jsonDate.substring(0, jsonDate.indexOf('T'));
        // console.log(datetime);
        // const currentTerm = '23/SP';

        // Try to use getEthosQuery but use default term set up in config if there's an error
        try{
            const currentTerm = await getEthosQuery({queryId: 'get-this-term', properties: {'current': datetime}});
            // console.log('currentTerm', currentTerm);
            const {data: {term: {edges: termEdges } = []} = {} } = currentTerm;
            // console.log('TermEdges', termEdges);
            const term = termEdges[0].node;
            // console.log('Term', term);
            const payload=[];
            payload.push(term);
            // console.log('payload', payload);
            return payload

        } catch (e) {
            // console.log('Going Config', e);
            return [{
                code:termFromConfig,
                title: termFromConfigTitle
            }]
        }
    } catch (error) {
        throw new Error('Error during ethos query - CURRENT');
    }
}

export async function fetchEthosQuery({queryKey}){
    console.log('QUERY-KEY:', queryKey)
    const [_key, {extensionId, cardId, manifestType, queryId, url, method, termFromConfig, termFromConfigTitle}] = queryKey;
    // console.log('queryKey CURRENT', _key);
    try {

        const event= new Date(Date.now());
        const jsonDate = event.toJSON();
        const datetime = jsonDate.substring(0, jsonDate.indexOf('T'));
        console.log(datetime);

        const body = {
            extensionId,
            cardId,
            manifestType,
            queryId,
            properties: {current: datetime}
        };

        // const currentTerm = '23/SP';

        // Try to use getEthosQuery but use default term set up in config if there's an error
        try{
            const currentTerm = await fetch(url, {
                method,
                body: JSON.stringify(body)
            })
            .then(res => res.json());
            console.log('currentTerm', currentTerm);
            const {data: {term: {edges: termEdges } = []} = {} } = currentTerm;
            // console.log('TermEdges', termEdges);
            const term = termEdges[0].node;
            // console.log('Term', term);
            const payload=[];
            payload.push(term);
            // console.log('payload', payload);
            return payload

        } catch (e) {
            console.log('Going Config', e);
            return [{
                code:termFromConfig,
                title: termFromConfigTitle
            }]
        }
    } catch (error) {
        throw new Error('Error during manual ethos query');
    }
}

export async function fetchProfileData({queryKey}){
    const [_key, {getExtensionJwt, base, endpoint, method}] = queryKey

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
    const [_key, {getExtensionJwt, extensionId, cardId, manifestType, queryId, url: ethosUrl, termFromConfig, termFromConfigTitle, base, endpoint, method, term}] = queryKey

    // console.log('TERM', term);

    if (term === 'default'){
        try {
             console.log("trying to fetch with default logic");
            const defaultTerm = await fetchEthosQuery({queryKey: ['currentEthosTerm', {extensionId, cardId, manifestType, queryId, url: ethosUrl, method, termFromConfig, termFromConfigTitle}]});
            // const defaultTerm = '23/SP';
            // console.log("default term: ", defaultTerm[0].code);
            const url = `${base}/${endpoint}`;
            // console.log("url: ", url);
            const jwt = await getExtensionJwt();
            // console.log("jwt: ", jwt);
            const payload = [];
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Authorization': `Bearer ${jwt}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({term: defaultTerm[0].code})
            })
            .then(res => res.json());
            payload.push(response);
            return payload;
        } catch (error) {
            console.log(error);
            throw new Error('Error during ethos query - DEATIL');
        }
    } else {
        try {
            // console.log("Other Term used for detail:", term);
            const url = `${base}/${endpoint}`;
            const jwt = await getExtensionJwt();
            const payload = [];
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Authorization': `Bearer ${jwt}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({term: term})
            })
            .then(res => res.json());
            payload.push(response);
            return payload;
        } catch (error) {
            console.log(error);
            return error
        }
    }
}