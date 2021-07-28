import React from 'react'
import axios from 'axios'
import styled from 'styled-components'

const ContainerTelaCadastro = styled.div `
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap');
font-family: Open sans;
border: 1px solid black;
text-align: center;
border-radius: 10px;
width: 400px;
margin: auto;
padding: 20px;
`
const ContainerInputs = styled.div`
padding: 10px;
`

const Button = styled.div`
padding: 30px;
display:flex;
justify-content: space-around;
`

class TelaCadastro extends React.Component {

    state = {

        inputName: '',
        inputEmail: ''
    }

    onChangeInputName = (event) => {
        this.setState ({inputName: event.target.value})
    }

    onChangeInputEmail = (event) => {
        this.setState ({inputEmail: event.target.value})
    }


    createUser = () => {

        const body = {
            name: this.state.inputName,
            email: this.state.inputEmail
        }

        axios.post ('https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users', body, {
            headers: {
                Authorization: 'guilherme-amaral-lovelace'
            }
        })

        .then((res) => {
            alert ('Usuário cadastrado!')
            this.setState ({inputName: ''})
            this.setState ({inputEmail: ''})
        })

        .catch ((err) => {
            alert (err.response.data.message)
        })

    }
   
    render () {

        return (
            <ContainerTelaCadastro>
                
                <h2>Cadastro</h2>

                <ContainerInputs>          
                    <input 
                        value={this.state.inputName} 
                        onChange={this.onChangeInputName}
                        placeholder={'Nome'}
                    />
                </ContainerInputs> 
               
                <ContainerInputs> 
                    <input 
                        value={this.state.inputEmail} 
                        onChange={this.onChangeInputEmail}
                        placeholder={'E-mail'}
                    />
                </ContainerInputs>

                <Button>
                    <button onClick={this.createUser}>Cadastrar</button>
                    <button onClick={this.props.irParaLista}>Ir para Lista de Usuários</button>
                </Button>

            </ContainerTelaCadastro>
        )
    }
}

export default TelaCadastro