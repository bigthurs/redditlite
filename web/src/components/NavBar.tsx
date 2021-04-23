import { Box, Flex, Link } from '@chakra-ui/layout';
import React from 'react'
import NextLink from  'next/link'
import { useMeQuery } from '../generated/graphql';

interface NavBarProps {

}

export const NavBar: React.FC<NavBarProps> = ({}) => {
    const [{data, fetching}] = useMeQuery()
    let body = null

    // data is loading
    if(fetching) {
    //user not logged in
    } else if(!data?.me) {
        body = (
        <>
            <NextLink href="/login">
                <Link color="white" mr={2}>login</Link>
            </NextLink>
            <NextLink href="/register">
                <Link color="white" mr={2}>register</Link>
            </NextLink>
        </>
    )
    //user logged in
    } else {
        body = (
            <Flex>
                <Box color="white" mr={2}>{data.me.username}</Box>
                <Box as="button" color="white">logout</Box>
            </Flex>
        )
    }

    return (
        <Flex bg="brand.700" p={4} >
            <Box ml={'auto'}>
                {body}
            </Box>
        </Flex>
    );
}