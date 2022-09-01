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
        firstName: Yup.string().required("firstName required"),
        lastName: Yup.string().required(" lastName required"),
        address: Yup.string().required("address required"),
        email: Yup.string().email("email invalid").required("email required"),
        phoneNumber: Yup.string().required("phoneNumber required"),
     }),
     company: Yup.object({
          annualRevenue: Yup.string().matches(/^\d{2,10}$/, "annualRevenue invalid").required("annualRevenue required"),
          nacebelCodes: Yup.array().of(Yup.string().matches(/^\d{5}$/, "code invalid").required("code required")).min(1, "nacebelCodes required"),
          enterpriseNumber: Yup.string().matches(/^[0]\d{9}$/, "enterprise number invalid").required("enterpriseNumber required"),
          naturalPerson: Yup.boolean().required("naturalPerson required"),
          legalName: Yup.string().required("legalName required")
      }),
      deductibleFormula: Yup.string(),
      coverageCeilingFormula: Yup.string()

})


  useEffect(() => {
    if (requestQuoteResponse && requestQuoteResponse.success) {
      navigate(`/quote-simulation/${requestQuoteResponse?.data.quoteId}`);
    }
  }, [requestQuoteResponse])

  const initialValues = {
    lead:{
      firstName: "",
      lastName: "",
      address: "",
      email: "",
      phoneNumber: ""
    },
    company: {
          annualRevenue: "",
          nacebelCodes: [],
          enterpriseNumber: "",
          naturalPerson: false,
          legalName: "",
      },
    deductibleFormula: "",
    coverageCeilingFormula: ""
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
                  <Label htmlFor="lead.firstName">
                    firstname
                  </Label>
                  <Input
                    type="text"
                    name="lead.firstName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.lead.firstName}
                    placeholder="firstname"
                  />
                  {errors.lead?.firstName && touched.lead?.firstName && (
                    <ErrorMessage>{errors.lead?.firstName}</ErrorMessage>
                  )}
                </InputFieldCol>
                <InputFieldCol>
                  <Label htmlFor="lead.lastName">
                    lastname
                  </Label>
                  <Input
                    type="text"
                    name="lead.lastName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.lead.lastName}
                    placeholder="lastname"
                  />
                  {errors.lead?.lastName && touched.lead?.lastName && (
                    <ErrorMessage>{errors.lead?.lastName}</ErrorMessage>
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
                  <Label htmlFor="lead.phoneNumber">
                    phone number
                  </Label>
                  <Input
                    type="text"
                    name="lead.phoneNumber"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.lead.phoneNumber}
                    placeholder="phone number"
                  />
                  {errors.lead?.phoneNumber && touched.lead?.phoneNumber && (
                    <ErrorMessage>{errors.lead?.phoneNumber}</ErrorMessage>
                  )}
                </InputFieldCol>
              </InputFieldRow>

            </BlockGroup>

            <BlockGroup>
                            <BlockHeading>Company Infos</BlockHeading>
                            <InputFieldRow>
                              <InputFieldCol>
                                <Label htmlFor="company.annualRevenue">
                                  annualRevenue
                                </Label>
                                <Input
                                  type="number"
                                  name="company.annualRevenue"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.lead.annualRevenue}
                                  placeholder="annual revenue"
                                />
                                {errors.company?.annualRevenue && touched.company?.annualRevenue && (
                                  <ErrorMessage>{errors.company?.annualRevenue}</ErrorMessage>
                                )}
                              </InputFieldCol>
                            </InputFieldRow>
                            <InputFieldRow>
                              <InputFieldCol className="col-2">
                                <Label htmlFor="company.nacebelCodes">
                                  NACE BEL CODES
                                </Label>

                                <FieldArray
                                    name="company.nacebelCodes"
                                    render={arrayHelpers => (
                                      <div>
                                      {values.company.nacebelCodes && values.company.nacebelCodes.length > 0 ? (
                                          values.company.nacebelCodes.map((nacebelCode, index) => (
                                 <div key={index}>
                                   <Field type="number" name={`company.nacebelCodes.${index}`} />
                                   <button
                                     type="button"
                                     onClick={() => arrayHelpers.remove(index)} // remove a nacebelCode from the list
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
                                            {/* show this when user has removed all nacebelCodes from the list */}
                                            Add a nacebelCode
                                            </button>
                                      )}
                           </div>
                         )}
                       />
                                {errors.company?.nacebelCodes && touched.company?.nacebelCodes && (
                                  <ErrorMessage>{errors.company?.nacebelCodes}</ErrorMessage>
                                )}
                              </InputFieldCol>
                              <InputFieldCol className="col-2">
                                <Label htmlFor="company.naturalPerson">
                                  Natural Person
                                </Label>
                                <Label>
                                  <Field type="checkbox" name="company.naturalPerson" /> {`${values.company.naturalPerson}`}
                                </Label>
                                {errors.company?.naturalPerson && touched.company?.naturalPerson && (
                                  <ErrorMessage>{errors.company?.naturalPerson}</ErrorMessage>
                                )}
                              </InputFieldCol>

                            </InputFieldRow>

                            <InputFieldRow>
                              <InputFieldCol>
                                <Label htmlFor="company.enterpriseNumber">
                                  enterprise number
                                </Label>
                                <Input
                                  type="text"
                                  name="company.enterpriseNumber"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.company.enterpriseNumber}
                                  placeholder="enterprise number"
                                />
                                {errors.company?.enterpriseNumber && touched.company?.enterpriseNumber && (
                                  <ErrorMessage>{errors.company?.enterpriseNumber}</ErrorMessage>
                                )}
                              </InputFieldCol>
                              <InputFieldCol>
                                <Label htmlFor="company.legalName">
                                  legalname
                                </Label>
                                <Input
                                  type="text"
                                  name="company.legalName"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.company.legalName}
                                  placeholder="legalname"
                                />
                                {errors.company?.legalName && touched.company?.legalName && (
                                  <ErrorMessage>{errors.company?.legalName}</ErrorMessage>
                                )}
                              </InputFieldCol>
                            </InputFieldRow>




            </BlockGroup>

            <BlockGroup>
              <BlockHeading>Formulas</BlockHeading>
              <InputFieldRow>
                <InputFieldCol className="col-2">
                  <Label htmlFor="deductibleFormula">
                    deductible formula
                  </Label>
                  <Select
                    label="deductibleFormula"
                    name="deductibleFormula"
                    value={values.deductibleFormula}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option value="">Select formula</option>
                    <option value="small">SMALL</option>
                    <option value="medium">MEDIUM</option>
                    <option value="large">LARGE</option>
                  </Select>
                  {errors.deductibleFormula && touched.deductibleFormula && (
                    <ErrorMessage>{errors.deductibleFormula}</ErrorMessage>
                  )}
                </InputFieldCol>
                <InputFieldCol className="col-2">
                  <Label htmlFor="coverageCeilingFormula">
                    coverage ceiling formula
                  </Label>
                  <Select
                    label="coverageCeilingFormula"
                    name="coverageCeilingFormula"
                    value={values.coverageCeilingFormula}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option value="">Select formula</option>
                    <option value="small">SMALL</option>
                    <option value="large">LARGE</option>
                  </Select>
                  {errors.coverageCeilingFormula && touched.coverageCeilingFormula && (
                    <ErrorMessage>{errors.coverageCeilingFormula}</ErrorMessage>
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
