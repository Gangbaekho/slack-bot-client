import React, { useState, useEffect } from "react";
import { Box, Heading, Stack, Text } from "@chakra-ui/layout";
import {
  Avatar,
  Button,
  Input,
  Select,
  useColorModeValue,
} from "@chakra-ui/react";
import Wrapper from "../component/Wrapper";

import { baseURL } from "../const";

const HomePage = (props) => {
  const [workSpaces, setWorkSpaces] = useState([]);
  const [workSpaceId, setWorkSpaceId] = useState(undefined);
  const [users, setUsers] = useState([]);
  const [userIds, setUserIds] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    fetch(baseURL + "/api/v1/workspaces", {
      method: "GET",
      "Content-Type": "application/json",
    })
      .then((res) => res.json())
      .then((data) => {
        setWorkSpaces(data.list);
        console.log("loaded workspaces :");
        console.log(data.list);
      });
  }, []);

  useEffect(() => {
    const workSpace = workSpaces.find(
      (workSpace) => workSpace.id === workSpaceId
    );
    console.log("find work space :" + workSpace);
    if (workSpaceId !== undefined) {
      fetch(baseURL + "/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          team_id: workSpaceId,
          botUserId: workSpace.botUserId,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          const loadedUsers = data.list;
          console.log("loaded users : ");
          console.log(loadedUsers);
          setUsers(loadedUsers.filter((user) => !user.is_bot));
          setUserIds(users.map((user) => user.id));
          console.log("users Ids: ");
          console.log(userIds);
        });
    }
  }, [workSpaceId]);

  useEffect(() => {
    setUserIds(users.map((user) => user.id));
  }, [users]);

  const handleUserIds = (e) => {
    e.preventDefault();
    const value = e.target.value;
    console.log("selected user value : " + value);
    if (value === "all") {
      const selectedUserIds = users.map((user) => user.id);
      setUserIds(selectedUserIds);
    } else {
      setUserIds([value]);
    }

    console.log("selected user ids : ");
    console.log(userIds);
  };

  const handleSubmitButton = () => {
    if (userIds.length === 0) {
      return;
    }

    const workSpace = workSpaces.find(
      (workSpace) => workSpace.id === workSpaceId
    );
    if (userIds.length === 1) {
      const userId = userIds[0];
      fetch(baseURL + "/api/v1/messages/single", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          users: userId,
          text: text,
          botUserId: workSpace.botUserId,
        }),
      })
        .then((res) => res.json())
        .then((data) => console.log(data));

      return;
    }

    if (userIds.length >= 2) {
      fetch(baseURL + "/api/v1/messages/multiple", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          users: userIds,
          text: text,
          botUserId: workSpace.botUserId,
        }),
      })
        .then((res) => res.json())
        .then((data) => console.log(data));

      return;
    }
  };

  return (
    <Wrapper>
      <Stack>
        <Text
          color={"green.500"}
          textTransform={"uppercase"}
          fontWeight={800}
          fontSize={"sm"}
          letterSpacing={1.1}
          py={3}
        >
          SELECT WORK SPACE
        </Text>
        <Select
          placeholder="Workspace select"
          onChange={(e) => setWorkSpaceId(e.target.value)}
        >
          {workSpaces.map((workspace) => (
            <option key={workspace.id} value={workspace.id}>
              {workspace.name}
            </option>
          ))}
        </Select>
        <Text
          color={"green.500"}
          textTransform={"uppercase"}
          fontWeight={800}
          fontSize={"sm"}
          letterSpacing={1.1}
          py={3}
        >
          SELECT USER
        </Text>
        <Select onChange={handleUserIds}>
          <option value="all" defaultValue>
            전체
          </option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </Select>
        <Heading
          color={useColorModeValue("gray.700", "white")}
          fontSize={"2xl"}
          fontFamily={"body"}
          py={5}
        >
          Message
        </Heading>
        <Input
          placeholder="Write your message"
          onChange={(e) => {
            setText(e.target.value);
            console.log(text);
          }}
        />
      </Stack>
      <Box py={5}>
        <Button
          colorScheme="teal"
          size="sm"
          w="100%"
          onClick={handleSubmitButton}
        >
          Send Message
        </Button>
      </Box>
      <Stack mt={6} direction={"row"} spacing={4} align={"center"}>
        <Avatar
          src={"https://avatars0.githubusercontent.com/u/1164541?v=4"}
          alt={"Author"}
        />
        <Stack direction={"column"} spacing={0} fontSize={"sm"}>
          <Text fontWeight={600}>I'm your ALOCADOS BOT!</Text>
          <Text fontWeight={600}>Send message to users!</Text>
        </Stack>
      </Stack>
    </Wrapper>
  );
};

export default HomePage;
