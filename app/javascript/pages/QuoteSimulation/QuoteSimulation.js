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
  }, [quoteByIdResponse])


  return (


    <>
      {isLoadingQuoteById ? (<h3>{`Is Loading Quote`}</h3>) : loaded ?  (<div className="container">



          <h3>{`Quote Data`}</h3>
          <ul>
            <li><strong>Quote Id</strong> : {`${data.quote_id}`}</li>
            <li><strong>Coverage Ceiling</strong> : {`${data.coverage_ceiling}`}</li>
            <li><strong>Deductible</strong> : {`${data.deductible}`}</li>
          </ul>
          <br/>
          <h3>{`Covers`}</h3>
          <ul>
            <li><strong>After Delivery</strong> : {`${data.cover_premiums.afterDelivery}`}</li>
            <li><strong>Legal Expenses</strong> : {`${data.cover_premiums.legalExpenses}`}</li>
            <li><strong>Public Liability</strong> : {`${data.cover_premiums.publicLiability}`}</li>
            <li><strong>Entrusted Objects</strong> : {`${data.cover_premiums.entrustedObjects}`}</li>
            <li><strong>Professional Indemnity</strong> : {`${data.cover_premiums.professionalIndemnity}`}</li>
          </ul>
          <br/>
          <h3>{`Company`}</h3>
          <ul>
            <li><strong>Company Id</strong> : {`${data.company.company_id}`}</li>
            <li><strong>Annual Revenue</strong> : {`${data.company.annual_revenue}`}</li>
            <li><strong>Natural Person</strong> : {`${data.company.natural_person}`}</li>
            <li><strong>Nacebel Codes</strong> : {`${data.company.nacebel_codes}`}</li>
            <li><strong>Enterprise Number</strong> : {`${data.company.enterprise_number}`}</li>
            <li><strong>Legal Name</strong> : {`${data.company.legal_name}`}</li>
          </ul>
</div>) : <h3>{`Quote Not Found`}</h3>}
<Link onClick={() => navigate("/")}>
    Back to Home
</Link>
    </>

  );
};

export default QuoteSimulation;
