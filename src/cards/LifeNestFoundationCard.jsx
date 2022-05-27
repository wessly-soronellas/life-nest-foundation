/* eslint-disable react/prop-types */
import React, {useState, useEffect} from 'react';
import {useData, useExtensionControl} from '@ellucian/experience-extension/extension-utilities';
import {
    ButtonGroup,
    Button,
    Typography
} from '@ellucian/react-design-system/core';
import { Link } from 'react-router-dom';

const LifeNestFoundationCard = (props) => {
    const {getExtensionJwt} = useData();
    const {cardControl: {navigateToPage}} = props;
    const [jwt, setJwt] = useState('');

    useEffect(() => {
        async function getToken(){
            const token = await getExtensionJwt();
            setJwt(token);
        }
        getToken();
    }, [jwt, setJwt]);

    const onTokenClick = async() => {
        const token = await getExtensionJwt();
        setJwt(token);
    }

    const onPageClick = () => {
        navigateToPage({route: '/'});
    }

    return (
    <div>
        <ButtonGroup>
            <Button onClick={onTokenClick}>Get Token</Button>
            <Button onClick={onPageClick}>go to page</Button>
        </ButtonGroup>
        <br />
        <Typography>Token: {jwt}</Typography>
    </div>
    );
}

export default LifeNestFoundationCard;