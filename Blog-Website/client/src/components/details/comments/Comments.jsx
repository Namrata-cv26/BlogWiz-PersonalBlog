// Import all necessary components
import { useState, useEffect, useContext } from 'react';
import { Box, TextareaAutosize, Button, styled } from '@mui/material';
import {Toaster} from 'react-hot-toast';
import toast from 'react-hot-toast';
import { DataContext } from '../../../context/DataProvider';

import { API } from '../../../service/api';

//components
import Comment from './Comment';

// Styled components for better styling
const Container = styled(Box)`
    margin-top: 100px;
    display: flex;
`;

const Image = styled('img')({
    width: 50,
    height: 50,
    borderRadius: '50%'
});

const StyledTextArea = styled(TextareaAutosize)`
    height: 100px !important;
    width: 100%; 
    margin: 0 20px;
`;

// Initial values for a new comment
const initialValue = {
    name: '',
    postId: '',
    date: new Date(),
    comments: ''
}

const Comments = ({ post }) => {
    // URL for the commenter's image
    const url = 'https://static.thenounproject.com/png/12017-200.png'

    // State to manage the currect comment being typed
    const [comment, setComment] = useState(initialValue);
    // State to store and manage the list of comments for the post
    const [comments, setComments] = useState([]);
    // State to toggle and trigger re-render for comments
    const [toggle, setToggle] = useState(false);
    // Access user account information from the DataContext
    const { account } = useContext(DataContext);
    // Effect to fetch comments for the post from the API
    useEffect(() => {
        const getData = async () => {
            const response = await API.getAllComments(post._id);
            if (response.isSuccess) {
                setComments(response.data);
            }
        }
        getData();
    }, [toggle, post]);

    // Handle change in the comment text area
    const handleChange = (e) => {
        setComment({
            ...comment,
            name: account.username,
            postId: post._id,
            comments: e.target.value
        });
    }

    // Function to add a new comment
    const addComment = async() => {
        if(comment.comments==''){
            toast.error('Please add your comment!')
        }else{
        await API.newComment(comment);
        setComment(initialValue)
        setToggle(prev => !prev);}
    }
    
    return (
        <Box>
            <Container>
                <Image src={url} alt="dp" />   
                <StyledTextArea 
                    rowsMin={5} 
                    placeholder="what's on your mind?"
                    onChange={(e) => handleChange(e)} 
                    value={comment.comments}
                />
                <Button 
                    variant="contained" 
                    color="primary" 
                    size="medium" 
                    style={{ height: 40 }}
                    onClick={(e) => addComment(e)}
                >Post</Button>    
                <Toaster/>         
            </Container>
            <Box>
                {
                    comments && comments.length > 0 && comments.map(comment => (
                        <Comment comment={comment} setToggle={setToggle} />
                    ))
                }
            </Box>
        </Box>
    )
}

export default Comments;