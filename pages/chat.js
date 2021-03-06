import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import { createClient } from '@supabase/supabase-js'

const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzMyMjI5OSwiZXhwIjoxOTU4ODk4Mjk5fQ.siRi-ux5L4IpDMPN4tdwSMOWWHUymKuun2ip8ekfoB4'
const SUPABASE_URL = 'https://wyblvptgwzuzvfjnzspl.supabase.co'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON)



export default function ChatPage() {
    const [mensagem, setMensagem] = React.useState('')
    const [listaDeMensagens, setListaDeMensagens] = React.useState([])

    React.useEffect(() => {
        supabase.from('mensagens').select('*')
                .order('id', { ascending: false})
                .then(({data}) => {
                    setListaDeMensagens(data)
                })

    }, [])
    function handleMensages(newMessage) {
        const mensagem = {
            valor: newMessage,
            from: 'fulano',
            //id: listaDeMensagens.length

        }

        supabase.from('mensagens')
                .insert([
                    mensagem
                ])
                .then(({data}) => {
                    setListaDeMensagens([
                        data[0],
                        ...listaDeMensagens            
                    ])

                })
        {/**        
        setListaDeMensagens([
            mensagem,
            ...listaDeMensagens            
        ])
         */}
        setMensagem('')

    }
    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary[500],
                backgroundImage: `url(https://image.freepik.com/free-vector/realistic-dark-tropical-leaves-background_52683-30654.jpg)`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >
                
                    <MessageList mensagens={listaDeMensagens} />
                    {/** 
                    Lista: {listaDeMensagens.map((msgAtual) => {
                        return (
                            <li key={msgAtual.id}>{msgAtual.from}: {msgAtual.valor}</li>
                        )
                    }
                    )}*/}
                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            value={mensagem}
                            onChange={(event) => {
                                const valor = event.target.value
                                setMensagem(valor)
                            }}
                            onKeyPress={(event) => {
                                if (event.key == 'Enter') {
                                    event.preventDefault()
                                    handleMensages(mensagem)
                                    
                                }
                                

                            }}
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {
    
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'scroll',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >
            {props.mensagens.map((mensagem) => {
                return (
                    <Text
                    key={mensagem.id}
                    tag="li"
                    styleSheet={{
                    borderRadius: '5px',
                    padding: '6px',
                    marginBottom: '12px',
                    hover: {
                        backgroundColor: appConfig.theme.colors.neutrals[700],
                    }
                }}
            >
                <Box
                    styleSheet={{
                        marginBottom: '8px',
                    }}
                >
                    <Image
                        styleSheet={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            display: 'inline-block',
                            marginRight: '8px',
                        }}
                        src={`https://github.com/${mensagem.from}.png`}
                    />
                    <Text tag="strong">
                      {mensagem.from}
                    </Text>
                    <Text
                        styleSheet={{
                            fontSize: '10px',
                            marginLeft: '8px',
                            color: appConfig.theme.colors.neutrals[300],
                        }}
                        tag="span"
                    >
                        {(new Date().toLocaleDateString())}
                    </Text>
                </Box>
               {mensagem.valor}
            </Text>

                )
            }

            )}

            
        </Box>
    )
}