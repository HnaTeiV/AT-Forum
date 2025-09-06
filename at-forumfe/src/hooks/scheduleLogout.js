import { jwtDecode } from "jwt-decode";
export default function scheduleLogout(token){
    try{
        const {exp}=jwtDecode(token);
        const timeout= exp*1000-Date.now();
        if(timeout > 0){
            setTimeout(()=>{
                localStorage.removeItem("token");
                alert("Session expired, please log in again!");
                
            },timeout)
        }
    }catch(error){
        console.error("Failed to decode token", error);
    }
}