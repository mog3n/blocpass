import React, { useState } from 'react';
import styled from 'styled-components';
import { InventoryPage } from './InventoryPage';
import { MyBlocPage } from './MyBlocPage';


enum Pages {
    Inventory,
    MyAccount
}

const HeaderContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 10px;
`
const TabsContainer = styled.div`
    display: flex;
`
const ButtonContainer = styled.div`
    background-color: #585858;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px;
    padding-left: 13px;
    padding-right: 13px;
    border-radius: 7px;
    border: 3px solid rgba(0,0,0,0);
    cursor: pointer;
    transition: 0.1s ease-in-out;
    
    :hover {
        background-color: #3a3a3a;
    }
`
const ButtonContainerSelected = styled(ButtonContainer)`
    background-color: #446DFF;
    border: 3px solid #6184FF;

    :hover {
        background-color: #2051ff;
        border: 3px solid #2051ff;
    }
`
const ButtonIcon = styled.img`
    width: 20px;
`
const ButtonLabel = styled.div`
    font-weight: 500;
    color: #fff;
    font-size: 13px;
    margin-left: 8px;
`


export const Inventory = (props: any) => {
    const [page, setPage] = useState<Pages>(Pages.MyAccount);

    const renderTabButton = (icon: string, label: string, tabPage: Pages) => {
        let render;
        if (page === tabPage) {
            render = (
                <ButtonContainerSelected>
                    <ButtonIcon src={icon} />
                    <ButtonLabel>{label}</ButtonLabel>
                </ButtonContainerSelected>
            )
        } else {
            render = (
                <ButtonContainer>
                    <ButtonIcon src={icon} />
                    <ButtonLabel>{label}</ButtonLabel>
                </ButtonContainer>
            )
        }
        return <div onClick={() => setPage(tabPage)}>
            {render}
        </div>
    }

    const Header = () => (
        <HeaderContainer>
            <TabsContainer>
                {/* { renderTabButton('/icons/inventory.svg', 'Inventory', Pages.Inventory) }
                <span style={{ width: '8px' }} /> */}
                { renderTabButton('/icons/mybloc.png', 'My Bloc', Pages.MyAccount) }
            </TabsContainer>
        </HeaderContainer>
    )



    return <div style={{
        backgroundColor: '#212121',
        borderRadius: 3,
    }}>
        <Header />
        { page === Pages.Inventory ? <InventoryPage /> : <></> }
        { page === Pages.MyAccount ? <MyBlocPage /> : <></> }
    </div>
}