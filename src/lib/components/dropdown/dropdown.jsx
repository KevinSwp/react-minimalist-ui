import React from "react";
import {Content, Header, Root} from "./dropdown.styled";

export default function Dropdown({children}) {
    return (
        <Root>
            <Header></Header>
            <Content>
                {children}
            </Content>
        </Root>
    );
}