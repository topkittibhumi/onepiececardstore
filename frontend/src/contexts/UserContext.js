import  { createContext , useState} from "react";
const UserContext = createContext();

export function UserProvider({ children }){
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [active, setActive] = useState(false);
    const setUser = (name, surname, active) => {
        setName(name);
        setSurname(surname);
        setActive(active);
    }
    return (
      <UserContext.Provider value={{ name, surname ,setUser ,active }}>
        {children}
      </UserContext.Provider>
    );
  };

export default UserContext
