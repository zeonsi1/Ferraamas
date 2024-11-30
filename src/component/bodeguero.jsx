import { useLocation } from "react-router-dom";
import HeaderCommon from "./header";

export default function Bodeguero() {

    const location = useLocation();
    const pnombre = location.state.pnombre;

    return(
        <>
            <HeaderCommon name={pnombre}/>
        </>
    );
}