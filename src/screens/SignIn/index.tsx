import React, { useState } from "react";
import { Alert } from "react-native";
import auth from "@react-native-firebase/auth";
import { VStack, Heading, Icon, useTheme } from "native-base";
import { Envelope, Key } from "phosphor-react-native";

import Logo from "../../assets/logo_primary.svg";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

export function SignIn() {
  const { colors } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    if (!email || !password) {
      return Alert.alert("Entrar", "Informe e-mail ou senha");
    }
    setIsLoading(true);
    
    auth()
    .signInWithEmailAndPassword(email, password)
     .catch((error)=>{
      console.log(error.code);
      setIsLoading(false);

      if(error.code === 'auth/invalid-email'){
        return Alert.alert("Error:", "E-mail invalido");
      }

      if(error.code === 'auth/wrong-password'){
        return Alert.alert("Error:", "E-mail ou senha invalido");
      }

      if(error.code === 'auth/user-not-found'){
        return Alert.alert("Error:", "Usuário não cadastrado.");
      }

      return Alert.alert("Entrar", "Não foi possível fazer authentica")
    });
  };

  return (
    <VStack flex={1} alignItems="center" bgColor="gray.600" px={8} pt={24}>
      <Logo />
      <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
        Acesse sua conta
      </Heading>
      <Input
        onChangeText={setEmail}
        placeholder="E-mail"
        mb={4}
        InputLeftElement={
          <Icon as={<Envelope color={colors.gray[300]} />} ml={4} />
        }
      />
      <Input
        placeholder="Password"
        onChangeText={setPassword}
        secureTextEntry
        mb={8}
        InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml={4} />}
      />
      <Button
        isLoading={isLoading}
        title="Entrar"
        w="full"
        onPress={handleSignIn}
      />
    </VStack>
  );
}
