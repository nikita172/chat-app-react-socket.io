import React, { useState } from 'react'
import { ChatState } from '../../Context/ChatProvider'
import { Box } from '@chakra-ui/react';
import SideDrawer from "../../components/miscellaneous/SideDrawer"
import ChatBox from "../../components/ChatBox";
import MyChats from "../../components/MyChats";


const Chat = () => {
  const { user } = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <div
        style={{
          display: "flex", justifyContent: "space-between",
          height: "91.5vh",
          padding: "10p"
        }}
      >
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </div>
    </div>
  )
}

export default Chat