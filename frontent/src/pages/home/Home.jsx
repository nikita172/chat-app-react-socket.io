import React, { useContext, useEffect } from 'react';
import { Container, Box, Text, Tabs, Tab, TabList, TabPanel, TabPanels } from '@chakra-ui/react'
import Login from '../../components/authentication/Login';
import Signup from '../../components/authentication/Signup';
import { useNavigate } from 'react-router-dom';
import { ChatState } from '../../Context/ChatProvider';
const Home = () => {
  const navigate = useNavigate();
  const { setUser } = ChatState();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!userInfo) {
      navigate("/");
    } else {
      setUser(userInfo);
      navigate("/chats")

    }
  }, [navigate]);

  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        p={3}
        justifyContent="center"
        bg={"white"}
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text
          fontSize="4xl"
          fontFamily="Work sans" color="black">Chat App</Text>
      </Box>
      <Box
        p={4}
        bg={"white"}
        w="100%"
        borderRadius="lg"
        borderWidth="1px">
        <Tabs variant='soft-rounded' >
          <TabList mb="1em">
            <Tab width={"50%"}>Login</Tab>
            <Tab width={"50%"}>Sign up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>

      </Box>

    </Container>
  )
}

export default Home