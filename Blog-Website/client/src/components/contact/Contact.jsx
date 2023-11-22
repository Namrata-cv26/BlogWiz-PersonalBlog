import React from 'react';
import { Box, styled, Typography, Link } from '@mui/material';
import { GitHub, Instagram, Email } from '@mui/icons-material';

const Banner = styled(Box)`
    background-image: url(http://mrtaba.ir/image/bg2.jpg);
    width: 100%;
    height: 50vh;
    background-position: center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    text-align: center;
`;

const Wrapper = styled(Box)`
    padding: 20px;
    text-align: center;
`;

const Text = styled(Typography)`
    color: #878787;
    margin-top: 20px;
    line-height: 1.6;

    & a {
        color: #3f51b5;
        text-decoration: none;
        &:hover {
            text-decoration: underline;
        }
    }

    & > div {
        margin-top: 15px;

        & > a {
            margin-right: 10px;
            color: #3f51b5;
            &:hover {
                text-decoration: underline;
            }
        }

        & > svg {
            vertical-align: middle;
        }
    }
`;

const Contact = () => {
    return (
        <Box>
            <Banner>
                <Typography variant="h3">Get in Touch!</Typography>
            </Banner>
            <Wrapper>
                <Typography variant="h5">Feel free to reach out to us on:</Typography>
                <Text>
                    <div>
                        BlogWiz{' '}
                        <Link href="https://www.instagram.com/namrata_c_v/" target="_blank">
                            <Instagram />
                        </Link>
                    </div>
                    
                </Text>
            </Wrapper>
        </Box>
    );
}

export default Contact;
