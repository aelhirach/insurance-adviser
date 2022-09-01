import React, { useState, useEffect, useRef } from "react";
import { Formik , Field, FieldArray } from "formik";

import {
  Form,
  FormWrap,
  InputFieldRow,
  InputFieldCol,
  Input,
  Label,
  ErrorMessage,
  BlockHeading,
  TextArea,
  Select,
  BlockGroup,
  CircularProgressStyle,
  RegisterFooter,
  Heading,
  Content,
  DialogFooter,
  DialogText,
  Button} from "./RequestQuoteForm.styles";


import * as Yup from "yup";
import { useNavigate } from 'react-router-dom';
import useAPI from '../../api/useAPI'


const RegisterForm = () => {

  const navigate = useNavigate();
  const [requestQuoteResponse, isLoadingRequestQuote, errorRequestQuote, retryRequestQuote, setResponse] = useAPI('requestQuote', null, true);



  React.useEffect(()=>{
    if (errorRequestQuote) {
        console.log(errorRequestQuote.response.data)
    }},[errorRequestQuote])




  const RegisterSchema = Yup.object({
    lead: Yup.object({
        first_name: Yup.string().required("first_name required"),
        last_name: Yup.string().required(" last_name required"),
        address: Yup.string().required("address required"),
        email: Yup.string().email("email invalid").required("email required"),
        phone_number: Yup.string().required("phone_number required"),
     }),
     company: Yup.object({
          annual_revenue: Yup.string().matches(/^\d{2,10}$/, "annual_revenue invalid").required("annual_revenue required"),
          nacebel_codes: Yup.array().of(Yup.string().matches(/^\d{5}$/, "code invalid").required("code required")).min(1, "nacebel_codes required"),
          enterprise_number: Yup.string().matches(/^[0]\d{9}$/, "enterprise number invalid").required("enterprise_number required"),
          legal_name: Yup.string().required("legal_name required")
      }),
      deductible_formula: Yup.string(),
      coverage_ceiling_formula: Yup.string()

})


  useEffect(() => {
    if (requestQuoteResponse && requestQuoteResponse.success) {
      navigate(`/quote-simulation/${requestQuoteResponse?.data.quote_id}`);
    }
  }, [requestQuoteResponse])

  const initialValues = {
    lead:{
      first_name: "",
      last_name: "",
      address: "",
      email: "",
      phone_number: ""
    },
    company: {
          annual_revenue: "",
          nacebel_codes: [],
          enterprise_number: "",
          legal_name: "",
      },
    deductible_formula: "",
    coverage_ceiling_formula: ""
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={RegisterSchema}
      onSubmit={(values, { setSubmitting }) => {
          let request = JSON.stringify(values, null, 0)
          console.log(request)
          retryRequestQuote(false,request)
          setSubmitting(false)
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        isSubmitting,
        resetForm,
        setSubmitting,
      }) => (



        <Form onSubmit={handleSubmit}>
          <FormWrap>

            <BlockGroup>
              <BlockHeading>Client Infos</BlockHeading>
              <InputFieldRow>
                <InputFieldCol>
                  <Label htmlFor="lead.first_name">
                    firstname
                  </Label>
                  <Input
                    type="text"
                    name="lead.first_name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.lead.first_name}
                    placeholder="firstname"
                  />
                  {errors.lead?.first_name && touched.lead?.first_name && (
                    <ErrorMessage>{errors.lead?.first_name}</ErrorMessage>
                  )}
                </InputFieldCol>
                <InputFieldCol>
                  <Label htmlFor="lead.last_name">
                    lastname
                  </Label>
                  <Input
                    type="text"
                    name="lead.last_name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.lead.last_name}
                    placeholder="lastname"
                  />
                  {errors.lead?.last_name && touched.lead?.last_name && (
                    <ErrorMessage>{errors.lead?.last_name}</ErrorMessage>
                  )}
                </InputFieldCol>
              </InputFieldRow>

              <InputFieldRow>
                <InputFieldCol>
                  <Label htmlFor="lead.address">
                    address
                  </Label>
                  <Input
                    type="text"
                    name="lead.address"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.lead.address}
                    placeholder="address"
                  />
                  {errors.lead?.address && touched.lead?.address && (
                    <ErrorMessage>{errors.lead?.address}</ErrorMessage>
                  )}
                </InputFieldCol>
                <InputFieldCol>
                  <Label htmlFor="lead.email">
                    email
                  </Label>
                  <Input
                    type="email"
                    name="lead.email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.lead.email}
                    placeholder="email"
                  />
                  {errors.lead?.email && touched.lead?.email && (
                    <ErrorMessage>{errors.lead?.email}</ErrorMessage>
                  )}
                </InputFieldCol>
              </InputFieldRow>

              <InputFieldRow>
                <InputFieldCol>
                  <Label htmlFor="lead.phone_number">
                    phone number
                  </Label>
                  <Input
                    type="text"
                    name="lead.phone_number"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.lead.phone_number}
                    placeholder="phone number"
                  />
                  {errors.lead?.phone_number && touched.lead?.phone_number && (
                    <ErrorMessage>{errors.lead?.phone_number}</ErrorMessage>
                  )}
                </InputFieldCol>
              </InputFieldRow>

            </BlockGroup>

            <BlockGroup>
                            <BlockHeading>Company Infos</BlockHeading>
                            <InputFieldRow>
                              <InputFieldCol>
                                <Label htmlFor="company.annual_revenue">
                                  annual_revenue
                                </Label>
                                <Input
                                  type="number"
                                  name="company.annual_revenue"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.lead.annual_revenue}
                                  placeholder="annual revenue"
                                />
                                {errors.company?.annual_revenue && touched.company?.annual_revenue && (
                                  <ErrorMessage>{errors.company?.annual_revenue}</ErrorMessage>
                                )}
                              </InputFieldCol>
                            </InputFieldRow>
                            <InputFieldRow>
                              <InputFieldCol className="col-2">
                                <Label htmlFor="company.nacebel_codes">
                                  NACE BEL CODES
                                </Label>

                                <FieldArray
                                    name="company.nacebel_codes"
                                    render={arrayHelpers => (
                                      <div>
                                      {values.company.nacebel_codes && values.company.nacebel_codes.length > 0 ? (
                                          values.company.nacebel_codes.map((nacebel_code, index) => (
                                 <div key={index}>
                                   <Field type="number" name={`company.nacebel_codes.${index}`} />
                                   <button
                                     type="button"
                                     onClick={() => arrayHelpers.remove(index)} // remove a nacebel_code from the list
                                   >
                                     -
                                   </button>
                                   <button
                                     type="button"
                                     onClick={() => arrayHelpers.insert(index, '')} // insert an empty string at a position
                                   >
                                     +
                                   </button>
                                 </div>
                               ))
                                          ) : (
                                            <button type="button" onClick={() => arrayHelpers.push('')}>
                                            {/* show this when user has removed all nacebel_codes from the list */}
                                            Add a nacebel_code
                                            </button>
                                      )}
                           </div>
                         )}
                       />
                                {errors.company?.nacebel_codes && touched.company?.nacebel_codes && (
                                  <ErrorMessage>{errors.company?.nacebel_codes}</ErrorMessage>
                                )}
                              </InputFieldCol>
                            </InputFieldRow>

                            <InputFieldRow>
                              <InputFieldCol>
                                <Label htmlFor="company.enterprise_number">
                                  enterprise number
                                </Label>
                                <Input
                                  type="text"
                                  name="company.enterprise_number"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.company.enterprise_number}
                                  placeholder="enterprise number"
                                />
                                {errors.company?.enterprise_number && touched.company?.enterprise_number && (
                                  <ErrorMessage>{errors.company?.enterprise_number}</ErrorMessage>
                                )}
                              </InputFieldCol>
                              <InputFieldCol>
                                <Label htmlFor="company.legal_name">
                                  legalname
                                </Label>
                                <Input
                                  type="text"
                                  name="company.legal_name"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.company.legal_name}
                                  placeholder="legalname"
                                />
                                {errors.company?.legal_name && touched.company?.legal_name && (
                                  <ErrorMessage>{errors.company?.legal_name}</ErrorMessage>
                                )}
                              </InputFieldCol>
                            </InputFieldRow>


            </BlockGroup>

            <BlockGroup>
              <BlockHeading>Formulas</BlockHeading>
              <InputFieldRow>
                <InputFieldCol className="col-2">
                  <Label htmlFor="deductible_formula">
                    deductible formula
                  </Label>
                  <Select
                    label="deductible_formula"
                    name="deductible_formula"
                    value={values.deductible_formula}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option value="">Select formula</option>
                    <option value="small">SMALL</option>
                    <option value="medium">MEDIUM</option>
                    <option value="large">LARGE</option>
                  </Select>
                  {errors.deductible_formula && touched.deductible_formula && (
                    <ErrorMessage>{errors.deductible_formula}</ErrorMessage>
                  )}
                </InputFieldCol>
                <InputFieldCol className="col-2">
                  <Label htmlFor="coverage_ceiling_formula">
                    coverage ceiling formula
                  </Label>
                  <Select
                    label="coverage_ceiling_formula"
                    name="coverage_ceiling_formula"
                    value={values.coverage_ceiling_formula}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option value="">Select formula</option>
                    <option value="small">SMALL</option>
                    <option value="large">LARGE</option>
                  </Select>
                  {errors.coverage_ceiling_formula && touched.coverage_ceiling_formula && (
                    <ErrorMessage>{errors.coverage_ceiling_formula}</ErrorMessage>
                  )}
                </InputFieldCol>
              </InputFieldRow>

            </BlockGroup>

            <RegisterFooter>
              <Button type='submit' disabled={isSubmitting}>Submit</Button>
            </RegisterFooter>
            {isSubmitting && (<CircularProgressStyle />)}
            {errorRequestQuote && errorRequestQuote.response?.data?.errors?.map((message ,i) => <ErrorMessage key={i}>{message}</ErrorMessage>)}
          </FormWrap>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;
