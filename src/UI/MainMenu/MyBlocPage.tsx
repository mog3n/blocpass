import styled from "styled-components"

const Group = styled.div`
    flex: 1;
    margin-top: 5px;
    background-color: #343434;
    border-radius: 5px;
    padding: 20px;
`

const GroupHeader = styled.div`
    font-size: 24px;
    font-weight: bold;
    color: #fff;
`

const GroupDescription = styled.div`
    font-size: 18px;
    color: #C5C5C5;
`

const GroupInteractive = styled(Group)`
    background-color: #446DFF;
    transition: 0.3s ease-in-out;
    cursor: pointer;
    :hover {
        background-color: #2051ff;
    }
`

export const MyBlocPage = () => {
    return <div style={{ padding: 10, paddingTop: 0, maxWidth:550 }}>
        <img src="/ui/blocPassHeader.png" style={{ width: '100%' }} alt="BlocPass - Import NFTs, Build a Bloc, Share your Legacy" />

        <div style={{ display: 'flex' }}>
            <Group>
                <img src="/icons/island.svg" style={{ width: 28, marginBottom: 10 }} alt="Island icon" />
                <GroupHeader>BLOC<br />Your own private Island on web3.</GroupHeader>
            </Group>

            <span style={{width: 5}} />

            <GroupInteractive>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <img src="/icons/metamask.png" style={{ width: 36 }} alt="Metamask Icon" />
                    <img src="/icons/arrowright.png" style={{ width: 18 }} alt="Metamask Icon" />
                </div>
                <div style={{ height: 20 }} />
                <GroupHeader>Sign in with Metamask</GroupHeader>
            </GroupInteractive>

        </div>

    </div>
}