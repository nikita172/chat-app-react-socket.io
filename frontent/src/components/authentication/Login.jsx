import { FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack, Button, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import { ChatState } from '../../Context/ChatProvider';

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setUser } = ChatState();

  const toast = useToast();
  const navigate = useNavigate();

  const handleClick = () => {
    setShow(!show);
  }

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "http://localhost:8080/api/user/login",
        { email, password },
        config
      );

      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      setUser(data);
      navigate("/chats");
    } catch (error) {
      console.log(error)
      toast({
        title: "Error Occured!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };


  return (
    <VStack spacing='5px'>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder='Enter your Email'
          onChange={(e) => setEmail(e.target.value)}
          value={email}

        />
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder='Enter your Password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        colorScheme='blue'
        width={"100%"}
        mt={"15"}

        onClick={submitHandler}
        isLoading={loading}>
        Login
      </Button>

      <Button
        variant={"solid"}
        colorScheme='red'
        width={"100%"}
        onClick={() => {
          setEmail("guest@example.com");
          setPassword("123456")
        }}>
        Get guest user credentials
      </Button>


    </VStack>
  )
}

export default Login