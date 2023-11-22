// Import necessary components and styles from Material-UI
import { styled, Box, Typography } from '@mui/material';

// Styles component for the banner image
const Image = styled(Box)`
    width: 100%;
    background: url(https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg) center/55% repeat-x #000;
    height: 50vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

// Styles component for the heading text
const Heading = styled(Typography)`
    font-size: 70px;
    color: #FFFFFF;
    line-height: 1
`;

// Styled component for the subheading text
const SubHeading = styled(Typography)`
    font-size: 20px;
    background: #FFFFFF;
`;

// Functional component for the banner
const Banner = () => {
    // Render the image component containing heading and subheading
    return (
        <Image>
            <Heading>BlogWiz</Heading>
            <SubHeading>Personal Blog</SubHeading>
        </Image>
    )
}

// Export the Banner component as the default export
export default Banner;