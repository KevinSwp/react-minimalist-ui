import React from "react";
import {Container, Content, Footer, Header, Root} from "./modal.styled";

export default function Modal({children}) {
    return (
        <Root>
            <Container>
                <Header></Header>
                <Content>
                    {children}
                </Content>
                <Footer></Footer>
            </Container>
        </Root>
    );
}