import React, {useEffect, useState} from "react";

import useAPI from '../../api/useAPI'
import { useLocation} from 'react-router-dom';
import { useParams, useNavigate} from "react-router-dom";
import Link from "@material-ui/core/Link";
const QuoteSimulation = (props) => {
  const navigate = useNavigate();
  let { id } = useParams();
  const [data, setData] = useState(null)
  const [quoteByIdResponse, isLoadingQuoteById, errorQuoteById, retryQuoteById, setQuoteById, loaded] = useAPI('loadQuoteById', null,  false, id);

  useEffect(() => {
      if (quoteByIdResponse && quoteByIdResponse.success) {
        setData(quoteByIdResponse.data)
      }
      console.log(quoteByIdResponse)
  }, [quoteByIdResponse])


  return (


    <>
      {isLoadingQuoteById ? (<h3>{`Is Loading Quote`}</h3>) : data ?  (<div className="container">



          <h3>{`Quote Data`}</h3>
          <ul>
            <li><strong>Quote Id</strong> : {`${data.quoteId}`}</li>
            <li><strong>Available</strong> : {`${data.available}`}</li>
            <li><strong>Coverage Ceiling</strong> : {`${data.coverageCeiling}`}</li>
            <li><strong>Deductible</strong> : {`${data.deductible}`}</li>
          </ul>
          <br/>
          <h3>{`Covers`}</h3>
          <ul>
            <li><strong>After Delivery</strong> : {`${data.coverPremiums.afterDelivery}`}</li>
            <li><strong>Legal Expenses</strong> : {`${data.coverPremiums.legalExpenses}`}</li>
            <li><strong>Public Liability</strong> : {`${data.coverPremiums.publicLiability}`}</li>
            <li><strong>Entrusted Objects</strong> : {`${data.coverPremiums.entrustedObjects}`}</li>
            <li><strong>Professional Indemnity</strong> : {`${data.coverPremiums.professionalIndemnity}`}</li>
          </ul>
          <br/>
          <h3>{`Company`}</h3>
          <ul>
            <li><strong>Annual Revenue</strong> : {`${data.company.annualRevenue}`}</li>
            <li><strong>Natural Person</strong> : {`${data.company.naturalPerson}`}</li>
            <li><strong>Nacebel Codes</strong> : {`${data.company.nacebelCodes}`}</li>
            <li><strong>Enterprise Number</strong> : {`${data.company.enterpriseNumber}`}</li>
            <li><strong>Legal Name</strong> : {`${data.company.legalName}`}</li>
          </ul>
          </div>) : <h3>{`Quote Not Found`}</h3>}
            <Link onClick={() => navigate("/")}>
    Back to Home
          </Link>
    </>

  );
};

export default QuoteSimulation;
