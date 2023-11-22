import { Grid } from '@mui/material';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
//components
import toast from 'react-hot-toast'
import Banner from '../banner/Banner';
import Categories from './Categories';
import Posts from './post/Posts';


const Home = () => {
    let x;
    const notify = () => toast.success("Logged in successfully");
    useEffect(() => {
        const hasBeNotified = localStorage.getItem('hasBeNotified');
        if (!hasBeNotified) {
            notify();
            localStorage.setItem('hasBeNotified', 'true');
        }
    }, []);
    
    return (
        <>
            <Toaster />
            {x=true}
            <Banner />
            <Grid container>
                <Grid item lg={2} xs={12} sm={2}>
                    <Categories />
                </Grid>
                <Grid container item xs={12} sm={10} lg={10}>
                    <Posts />
                </Grid>
            </Grid>
        </>
    )
}

export default Home;