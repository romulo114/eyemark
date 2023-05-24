/** @format */

// src/mocks/handlers.js
import { rest } from "msw";
import {
  alreadyExistRes,
  citizenLoginSuccessRes,
  citizenSignupSuccessRes,
  contractorLoginSuccessRes,
  eyemarkRes,
  interestsRes,
  invalidCode,
  invalidCred,
  mdaLoginSuccessRes,
  suggestionRes,
  updateSuccessRes,
  verificationSuccessRes,
} from "__tests__/__mocks__/Response/authRes";
import {
  citizenLoginCred,
  contractorLoginCred,
  correctCode,
  mdaLoginCred,
  signupCred,
} from "../creds";

const BASE_URL = "https://staging.eyemark.ng/api"

export const authHandlers = [
  // Handles a POST /login request
  rest.post(`${BASE_URL}/auth/login/`, async (req, res, ctx) => {
    const body = await req.json();

    //check if citizen
    if (
      body.email === citizenLoginCred.email &&
      body.password === citizenLoginCred.password
    ) {
      return res(ctx.status(200), ctx.json(citizenLoginSuccessRes));
    }
    //check if contractor
    if (
      body.email === contractorLoginCred.email &&
      body.password === contractorLoginCred.password
    ) {
      return res(ctx.status(200), ctx.json(contractorLoginSuccessRes));
    }
    //check if mda
    if (
      body.email === mdaLoginCred.email &&
      body.password === mdaLoginCred.password
    ) {
      return res(ctx.status(200), ctx.json(mdaLoginSuccessRes));
    }
    return res(ctx.status(invalidCred.status_code), ctx.json(invalidCred));
  }),

  //  signup flow
  rest.post(`${BASE_URL}/users/register/`, async (req, res, ctx) => {
    const body = await req.json();

    //if user is new
    if (
      body.email === signupCred.email &&
      body.password === signupCred.password
    ) {
      return res(ctx.status(200), ctx.json(citizenSignupSuccessRes));
    }
    // if user exist
    if (
      body.email === citizenLoginCred.email &&
      body.password === citizenLoginCred.password
    ) {
      return res(
        ctx.status(alreadyExistRes.status_code),
        ctx.json(alreadyExistRes)
      );
    }
  }),

  // verification code
  rest.post(`${BASE_URL}/users/verify/`, async (req, res, ctx) => {
    const body = await req.json();

    //if code is correct
    if (body.otp === correctCode) {
      return res(ctx.status(200), ctx.json(verificationSuccessRes));
    }
    // if code is invalid
    if (body.email !== correctCode) {
      return res(ctx.status(invalidCode.status_code), ctx.json(invalidCode));
    }
  }),

  // update user details
  rest.patch(`${BASE_URL}/users/me/update/`, async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(updateSuccessRes));
  }),

  // get interests
  rest.get(`${BASE_URL}/users/interest-options/`, async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(interestsRes));
  }),

  // update interests
  rest.post(`${BASE_URL}/users/interests/`, async (req, res, ctx) => {
    return res(ctx.status(200));
  }),

  // get projects to eyemark
  rest.get(`${BASE_URL}/users/suggestions/`, async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(suggestionRes));
  }),

  // update eyemarked projects
  rest.post(`${BASE_URL}/projects/eyemark/`, async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(eyemarkRes));
  }),

  // update eyemarked projects
  rest.get(`${BASE_URL}/users/me/eyemarks/`, async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({}));
  }),
];
