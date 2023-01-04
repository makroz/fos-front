import { useState } from "react";
import useAuth from "../src/hooks/useAuth";
import useAxios from "../src/hooks/useAxios";

const usersPage = () => {
    const user = useAuth();
    const [params, setParams] = useState({page:1,perPage:10,sortBy:"id",orderBy:"asc",searchBy:""})
    const { data: users, error, loaded,execute } = useAxios("/users", "GET", params);
    
  return (
    <div></div>
  )
}

export default usersPage