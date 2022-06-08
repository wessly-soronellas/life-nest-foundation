import {useCardInfo} from '@ellucian/experience-extension/extension-utilities';
import axios from 'axios';

export default function useNapi(endpoint, method, token){
    const {configuration} = useCardInfo();
    const {baseApi: base} = configuration;


    return axios({
        method,
        url: `${base}/${endpoint}`,
        headers: {'Authorization': `Bearer ${token}`}
    }).then((res) => res.data)
}

export const useTest = () => {
    return'This is a test'
}
