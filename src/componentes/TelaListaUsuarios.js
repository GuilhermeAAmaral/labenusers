import React from 'react'
import axios from 'axios'
import styled from 'styled-components'

const ContainerTelaUsuarios = styled.div `
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap');
font-family: Open sans;
border: 1px solid black;
text-align: center;
border-radius: 10px;
width: 400px;
margin: auto;
padding: 30px;
`

const CardUsuario = styled.div`
border-bottom: 1px solid black;
padding: 20px;
margin: 10px;
margin-bottom: 20px;
width: 350px;
display: flex;
justify-content: space-between;
`

const Button = styled.div`
padding: 30px;
display:flex;
justify-content: space-around;
`

class TelaListaUsuarios extends React.Component {

    state = {

        list: []

    }
    
    componentDidMount () {
        this.getAllUsers()
     
    }

    getAllUsers = () => {
        axios.get ('https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users', {
            headers: {
                Authorization: 'guilherme-amaral-lovelace'
            }
        })

        .then ((res) => {
            this.setState({list: res.data})
            
        })
        .catch ((err) => {
            alert ('Ocorreu um problema, tente novamente!')
        })
    }

    deleteUser = (id) => {
        axios.delete (`https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${id}`, {
            headers: {
                Authorization: 'guilherme-amaral-lovelace'
            }
        })

        .then((res)=> {
            alert ('Usuário removido')
            this.getAllUsers()
        })
        .catch ((err) => {
            alert ('Ocorreu um problema, tente novamente!')
        })
    }

    render () {
        console.log (this.state.list)

        const userList = this.state.list.map ((user) => {
            return <CardUsuario key={user.id}>
                {user.name}
                <button onClick={() => this.deleteUser(user.id)}>Remover</button>
            </CardUsuario>
            
        })
      
        return (
            <ContainerTelaUsuarios>
                
                <h2>Lista de Usuários</h2>
                
                <div>
                    {userList}
                </div>

                <Button>
                    <button onClick={this.props.irParaCadastro}>Ir para Tela de Cadastro</button>
                </Button>

            </ContainerTelaUsuarios>
        )
    }
}

export default TelaListaUsuarios