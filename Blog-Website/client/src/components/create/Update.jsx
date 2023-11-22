// Import necessary components and styles from Material-UI and React
import React, { useState, useEffect } from 'react';
import {Toaster} from 'react-hot-toast';
import toast from 'react-hot-toast';
import { Box, styled, TextareaAutosize, Button, FormControl, InputBase } from '@mui/material';
import { AddCircle as Add } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';

//Import API service
import { API } from '../../service/api';

// Styled component for the main container
const Container = styled(Box)(({ theme }) => ({
    margin: '50px 100px',
    [theme.breakpoints.down('md')]: {
        margin: 0
    }
}));

// Styled component for the main container
const Image = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover'
});

//Styled component for the main image
const StyledFormControl = styled(FormControl)`
    margin-top: 10px;
    display: flex;
    flex-direction: row;
`;

// Styled components for form elements
const InputTextField = styled(InputBase)`
    flex: 1;
    margin: 0 30px;
    font-size: 25px;
`;

const StyledTextArea = styled(TextareaAutosize)`
    width: 100%;
    border: none;
    margin-top: 50px;
    font-size: 18px;
    &:focus-visible {
        outline: none;
    }
`;

// Initial values for an existing post
const initialPost = {
    title: '',
    description: '',
    picture: '',
    username: 'codeforinterview',
    categories: 'Tech',
    createdDate: new Date()
}

// Functional component for updating a post
const Update = () => {
    // Hooks for naviagtion, post data, file, and image URL
    const navigate = useNavigate();

    const [post, setPost] = useState(initialPost);
    const [file, setFile] = useState('');
    const [imageURL, setImageURL] = useState('');

    // Get post ID from URL parameters
    const { id } = useParams();

    // URL for the default post image
    const url = 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';
    
    // useEffect to fetch post data by ID
    useEffect(() => {
        const fetchData = async () => {
            let response = await API.getPostById(id);
            if (response.isSuccess) {
                setPost(response.data);
            }
        }
        fetchData();
    }, []);

    // useEffeect to handle image upload and set post data
    useEffect(() => {
        const getImage = async () => { 
            if(file) {
                const data = new FormData();
                data.append("name", file.name);
                data.append("file", file);
                // Upload file and set post post picture and image URL
                const response = await API.uploadFile(data);
                if (response.isSuccess) {
                    post.picture = response.data;
                    setImageURL(response.data);    
                }
            }
        }
        getImage();
    }, [file])

    // Function to update the blog post
    const updateBlogPost = async () => {
        await API.updatePost(post);
        navigate(`/details/${id}`);
    }

    // Function to handle input changes
    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    }

    const sucu=()=>{
        console.log("before toast");
        toast.success("Blog updated successfully",{duration:4000});
        console.log("after toast");
    }

    return (
        <Container>
            <Image src={post.picture || url} alt="post" />

            <StyledFormControl>
                <label htmlFor="fileInput">
                    <Add fontSize="large" color="action" />
                </label>
                <input
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <InputTextField onChange={(e) => handleChange(e)} value={post.title} name='title' placeholder="Title" />
                <Button onClick={()=>{sucu();updateBlogPost()}} variant="contained" color="primary">Update</Button>
                <Toaster/>
            </StyledFormControl>

            <StyledTextArea
                rowsMin={5}
                placeholder="Tell your story..."
                name='description'
                onChange={(e) => handleChange(e)} 
                value={post.description}
            />
        </Container>
    )
}

// Export the Update component as the default export
export default Update;