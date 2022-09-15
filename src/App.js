import React, { useEffect, useState } from "react";
import { StreamChat } from "stream-chat";
import {
  Chat,
  Channel,
  ChannelHeader,
  ChannelList,
  LoadingIndicator,
  MessageInput,
  MessageList,
  Thread,
  Window
} from "stream-chat-react";

import "stream-chat-react/dist/css/index.css";

const userToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiam9obiJ9.v8Vqc2jBBYdJd0V6TW8vPgiKFJiI5nBCL5EVKjyYulY";

const filters = { type: "messaging", members: { $in: ["john"] } };
const sort = { last_message_at: -1 };

const App = () => {
  const [chatClient, setChatClient] = useState(null);

  useEffect(() => {
    const initChat = async () => {
      const client = StreamChat.getInstance("cfp3jz7bzn2e");

      await client.connectUser(
        {
          id: "john",
          name: "John",
          image: "https://getstream.io/random_png/?id=blue-frost-0&name=blue"
        },
        userToken
      );

      setChatClient(client);
    };

    initChat();
  }, []);

  if (!chatClient) {
    return <LoadingIndicator />;
  }

  return (
    <Chat client={chatClient} theme="messaging light">
      <ChannelList filters={filters} sort={sort} />
      <Channel>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
        <Thread />
      </Channel>
    </Chat>
  );
};

export default App;
