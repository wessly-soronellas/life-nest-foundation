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