import React, { useRef, useCallback, useContext } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { AuthContext}  from '../../context/AuthContext';
import getValidationErrors from '../../utils/getValidationsErrors';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background } from './styles';

interface SignInformData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
    const formRef = useRef<FormHandles>(null);

    const { user, signIn } = useContext(AuthContext);
    
    console.log(user);

    const handleSubmit = useCallback(async (data: SignInformData) => {
        try {
          formRef.current?.setErrors({});

          const schema = Yup.object().shape({
            email: Yup.string()
              .email('Digite um e-mail válido')
              .required('E-mail obrigatório'),
            password: Yup.string().required('Senha obrigatória'),
          });
    
          await schema.validate(data, {
            abortEarly: false,
          });
          
          await signIn({
            email: data.email,
            password: data.password,
          });
        } catch (err) {
          if (err instanceof Yup.ValidationError) {
            console.log(err);
            const errors = getValidationErrors(err);
  
            formRef.current?.setErrors(errors);
          }
        }
        
    }, [signIn],); 

    return(
        <Container>
            <Content>
                <img src={logoImg} alt="GoBarber" />

                <Form ref={formRef} onSubmit={handleSubmit}>
                    <h1>Faça seu logon</h1>
                    <Input name="email" icon={FiMail} placeholder="E-mail" />

                    <Input name="password" icon={FiLock} type="password" placeholder="Senha" />

                    <Button type="submit">Entrar</Button>

                    <a href="forgot">Esqueci minha senha</a>
                </Form>

                <a href="login"><FiLogIn />Criar conta</a>
            </Content>

            <Background />
        </Container>
    )
};

export default SignIn;