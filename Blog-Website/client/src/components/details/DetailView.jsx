// Import necessary components and styles from Material-UI
import { useState, useEffect, useContext } from 'react';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import { Box, Typography, styled } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { API } from '../../service/api';

import { DataContext } from '../../context/DataProvider';

// components
import Comments from './comments/Comments';

// Styled components for better styling
const Container = styled(Box)(({ theme }) => ({
  margin: '50px 100px',
  [theme.breakpoints.down('md')]: {
    margin: 0,
  },
  transition: 'background-color 0.3s ease', // Add transition for smooth color change
  '&:hover': {
    backgroundColor: 'aliceblue', // Change the background color on hover
  },
}));

const Image = styled('img')({
  width: '100%',
  height: '50vh',
  objectFit: 'cover',
});

const EditIcon = styled(Edit)`
  margin: 5px;
  padding: 5px;
  border: 1px solid #878787;
  border-radius: 10px;
`;

const DeleteIcon = styled(Delete)`
  margin: 5px;
  padding: 5px;
  border: 1px solid #878787;
  border-radius: 10px;
`;

const Heading = styled(Typography)`
  font-size: 38px;
  font-weight: 600;
  text-align: center;
  margin: 50px 0 10px 0;
`;

const Author = styled(Box)(({ theme }) => ({
  color: '#878787',
  display: 'flex',
  margin: '20px 0',
  [theme.breakpoints.down('sm')]: {
    display: 'block',
  },
}));

const DetailView = () => {
  // Placeholder URL for the post image
  const url =
    'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';
  // State to hold the post details
  const [post, setPost] = useState({});
  // Access user account information from the DataContext
  const { account } = useContext(DataContext);
  // Hook from React Router for navigation
  const navigate = useNavigate();
  // Get the post ID from the URL parameters
  const { id } = useParams();

  // Effect to fetch post details when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      let response = await API.getPostById(id);
      if (response.isSuccess) {
        setPost(response.data);
      }
    };
    fetchData();
  }, []);

  // Function to delete the current blog post
  const deleteBlog = async () => {
    await API.deletePost(post._id);
    navigate('/');
  };
  const sucd = () => {
    console.log('before toast');
    toast.success('Blog deleted successfully', { duration: 4000 });
    console.log('after toast');
  };
  return (
    <Container>
      <Image src={post.picture || url} alt="post" />
      <Box style={{ float: 'right' }}>
        {account.username === post.username && (
          <>
            <Link to={`/update/${post._id}`}>
              <EditIcon color="primary" />
            </Link>
            <DeleteIcon onClick={() => { sucd(); deleteBlog() }} color="error" />
            <Toaster />
          </>
        )}
      </Box>
      <Heading>{post.title}</Heading>

      <Author>
        <Link to={`/?username=${post.username}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <Typography>
            Author: <span style={{ fontWeight: 600 }}>{post.username}</span>
          </Typography>
        </Link>
        <Typography style={{ marginLeft: 'auto' }}>{new Date(post.createdDate).toDateString()}</Typography>
      </Author>

      <Typography>{post.description}</Typography>
      <Comments post={post} />
    </Container>
  );
};

export default DetailView;
