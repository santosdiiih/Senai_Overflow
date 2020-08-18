import React, { useState } from 'react';

const HelloWord = () => {
    return ( <
        div > olaaa < /div>
    )
};

const Login = () => {

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const handlerEmail = (e) => {
        setEmail(e.target.value);

    };
    const handlerSenha = (e) => {
        setSenha(e.target.value);
    };

    const entrar = async() => {
        const retorno = await fetch("http://localhost:3333/sessao", {
            method: "POST",
            body: {
                email,
                senha
            }
        });
        console.log(await retorno.json);
    };

    return ( < >
        <
        input type = "text"
        value = { email }
        onChange = { handlerEmail }
        placeholder = "Insira seu email" / >
        <
        input type = "password"
        value = { senha }
        placeholder = "Insira sua senha"
        onChange = { handlerSenha }
        / >

        <
        button onClick = { entrar } > Entrar < /button >  < / >

    );
};


const SegundaTag = (props) => {
        return ( < div > { props.texto } < /div>)
        };

        function App() {



            return ( <
                div >
                <
                HelloWord / >
                <
                SegundaTag texto = "Vamos dormir cedo hoje" / >
                <
                Login / >
                <
                /div> 
            );
        }

        export default App;