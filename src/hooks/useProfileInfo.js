export async function fetchCurrentTerm({queryKey}){
    const [_key, {getEthosQuery}] = queryKey
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
    const [_key, {getExtensionJwt, getEthosQuery, base, endpoint, method, term}] = queryKey
    console.log(queryKey);
    const payload={"term":term}

    if (term === 'default'){
        try {
            // console.log("trying to fetch with default logic");
            const event= new Date(Date.now());
            // console.log("current date", event);
            const jsonDate = event.toJSON();
            // console.log("current date to JSON", jsonDate);
            const datetime = jsonDate.substring(0, jsonDate.indexOf('T'));
            // console.log("Current date to datetime slice", datetime);
            const currentTerm = await getEthosQuery({queryId: 'get-this-term', properties: {'current': datetime}});
            // console.log("current term: ", currentTerm);
            const {data: {term: {edges: termEdges } = []} = {} } = currentTerm;
            // console.log("termEdges: ", termEdges);
            const term = termEdges.map(edge => edge.node);
            // console.log("term: ", term);
            const defaultTerm = term[0].code
            // console.log("default term: ", defaultTerm);
            const url = `${base}/${endpoint}`;
            // console.log("url: ", url);
            const jwt = await getExtensionJwt();
            // console.log("jwt: ", jwt);
            return fetch(url, {
                method: method,
                headers: {
                    'Authorization': `Bearer ${jwt}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({term: defaultTerm})
            })
            .then(res => res.json())
        } catch (error) {
            throw new Error('Error during ethos query');
        }
    } else {
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
}