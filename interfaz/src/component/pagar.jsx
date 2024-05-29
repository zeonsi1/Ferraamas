import { useLocation } from "react-router-dom";

export default function Pagar(){
    const location = useLocation();
    const token = location.state.token;
    const url = location.state.url;
    return(
        <>
            <form action={url} method="POST">
                <input type="hidden" name="token_ws" value={token}/>
                <input type="submit" value="Pagar"/>
            </form>
        </>
    );
}