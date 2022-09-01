import React, {useEffect} from "react";
import { useNavigate } from 'react-router-dom';


import Link from "@material-ui/core/Link";

const NotFound = (props) => {
  const navigate = useNavigate();

  return (

      <>
                <h1>404</h1>
                <h4>Not Found</h4>

                <Link onClick={() => navigate("/")}>
                    Back to Home
                </Link>
        </>

  );
};

export default NotFound;
