/** @format */

const citizenLoginSuccessRes = {
  access_token:
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU5NjA2OTQzLCJqdGkiOiIxMzIxNTcxZDU0ZDI0ZjU0YjgxYTYzYTJiYTdkM2RjMCIsInVzZXJfaWQiOjEyODd9.9eAi3mEMjSCAWNUtxoeommoQOPnrBugXfUi8C01OwE0",
  refresh_token:
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY1ODgyOTM0MywianRpIjoiMGZiMzZkZTJiZjFlNDM0NTgzZjQ2YTVlNTE2MmIzNzQiLCJ1c2VyX2lkIjoxMjg3fQ.Z8Xp0P3HRDqIMQdE-TcYlX8zQzGjPZ5xyAvUiet4Cu8",
  user: {
    public_id: "3d4a105f-eb33-44c2-966f-5e65a2b29ff9",
    email: "boma@boma.com",
    username: "boma7",
    display_name: "boma25",
    first_name: null,
    last_name: null,
    bio: "test from mobile sc",
    avatar:
      "https://res.cloudinary.com/zst/image/upload/f_auto/q_auto/v1655796348/users/avatars/3d4a105f-eb33-44c2-966f-5e65a2b29ff9.png",
    account_type: "CITIZEN",
    reviews_count: 21,
    eyemarked_count: 7,
    created: "2022-05-04T16:24:39.991808+01:00",
    state_of_residence: "AKWA-IBOM",
  },
};

const contractorLoginSuccessRes = {
  access_token:
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjYxMDc2NjE1LCJqdGkiOiI4MjQwOTczZGIwOTg0N2E4YmVlYTU1NDU3YjE1YzdjNSIsInVzZXJfaWQiOjExNzV9._yCE5bnroHk_y9p07G0ZgGidDbJoCTvNmj2P_eqQWUI",
  refresh_token:
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY2MDI5OTAxNSwianRpIjoiNzVhZmU1ZWRlZjEyNGYwOWJlZDk3NjdkZDk3NDAzOWUiLCJ1c2VyX2lkIjoxMTc1fQ.dwjcBC-URsjp3zsd2v8m3edU-XuK0dVRZEDmpAxhoeU",
  user: {
    public_id: "60f1a6fb-ef5b-4320-b693-f9e028c59e4f",
    email: "info@squareangle.com",
    username: "squareangle",
    display_name: "Square Angle",
    first_name: null,
    last_name: null,
    bio: "our favourite angle is the right angle 📐",
    avatar:
      "https://res.cloudinary.com/zst/image/upload/f_auto/q_auto/v1646842068/xekydkiaifxdb5awdiqj.png",
    account_type: "CONTRACTOR",
    reviews_count: 2,
    eyemarked_count: 1,
    created: "2022-03-09T17:04:01.047510+01:00",
    state_of_residence: "ABUJA",
    total_no_of_projects: 12,
    total_appropriated_amount: 390628667322.05,
  },
};

const mdaLoginSuccessRes = {
  access_token:
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjYxMDc1MzM1LCJqdGkiOiJhZTM3Y2UzODk5NWI0MDg2YWY2Y2Q0YWRhNGE1NGU0OCIsInVzZXJfaWQiOjF9.30Jr2j53iJWJZxgyS-zBB3362PzlNfc1ZDw-MRrq7Tw",
  refresh_token:
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY2MDI5NzczNSwianRpIjoiNDA0Zjk5MzU1ZmY1NDIxMjlhODM4MTQxMjFhMWVlODEiLCJ1c2VyX2lkIjoxfQ.QHS3Z-0Q32Jl1hjpO6N_5V2MlhOQv5cvhJs-4Z3sCd8",
  user: {
    public_id: "a34ffc29-a013-43b5-8a45-5d79a74c5dbe",
    email: "fmbnp@gov.ng",
    username: "fmbnp",
    display_name: "Ministry of Finance, Budget and National Planning",
    first_name: null,
    last_name: null,
    bio: "The Ministry has the mandate to determine and advise the Government of the Federation on matters relating to National Development and overall management of the national economy.",
    avatar:
      "https://res.cloudinary.com/zst/image/upload/f_auto/q_auto/v1648814207/p860dgw0sxo6fjfdfoah.png",
    account_type: "ADMIN",
    reviews_count: 305,
    eyemarked_count: 2,
    created: "2021-10-05T17:58:21.161188+01:00",
    state_of_residence: "ABUJA",
  },
};

const invalidCred = {
  non_field_errors: ["Unable to log in with provided credentials."],
  status_code: 400,
};

const citizenSignupSuccessRes = {
  access_token:
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjYxMjU3OTgzLCJqdGkiOiJjNGVkZGVkMmM3ZTA0NDM1OGI1NWZlNzBmZjQ0NmVkMyIsInVzZXJfaWQiOjMxOTI2fQ.ZslGHGp00MtJahaj5Ef_YlEFcBZRQi0U1TZpu4pjtCg",
  refresh_token:
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY2MDQ4MDM4MywianRpIjoiZTRhYWJhYjQwMjcwNGMwY2FhMTdiNWJmYzM2Y2RmNTciLCJ1c2VyX2lkIjozMTkyNn0.5cB4vz0OHHAx6z7mIK2OimYAn7s57L05avEWG9J3W6k",
  user: {
    public_id: "c8471c7e-7cc6-462e-b0fe-416d3d1097ad",
    email: "boma42@boma.com",
    username: "boma42",
    display_name: "",
    first_name: null,
    last_name: null,
    bio: "",
    avatar: null,
    account_type: "CITIZEN",
    reviews_count: 0,
    eyemarked_count: 0,
    created: "2022-08-13T13:33:03.037344+01:00",
    state_of_residence: null,
  },
};

const verificationSuccessRes = {
  message: "Your email has been verified.",
};

const alreadyExistRes = {
  email: ["A user is already registered with this e-mail address."],
  status_code: 400,
};

const invalidCode = {
  otp: ["Given token not valid for any token type"],
  status_code: 400,
};

const interestsRes = {
  message: "data fetched successfully",
  data: {
    locations: [
      "ABIA",
      "ADAMAWA",
      "AKWA-IBOM",
      "ANAMBRA",
      "BAUCHI",
      "BAYELSA",
      "BENUE",
      "BORNO",
      "CROSS-RIVER",
      "DELTA",
      "EBONYI",
      "EDO",
      "EKITI",
      "ENUGU",
      "FCT-ABUJA",
      "GOMBE",
      "IMO",
      "JIGAWA",
      "KADUNA",
      "KANO",
      "KATSINA",
      "KEBBI",
      "KOGI",
      "KWARA",
      "LAGOS",
      "NASARAWA",
      "NIGER",
      "OGUN",
      "ONDO",
      "OSUN",
      "OYO",
      "PLATEAU",
      "RIVERS",
      "SOKOTO",
      "TARABA",
      "YOBE",
      "ZAMFARA",
    ],
    ministries: [
      "Minister of Health",
      "Ministry of Transportation",
      "",
      "Opeyemi Ministry",
      "",
      "Federal Ministry of Works and Housing",
      "Federal Ministry of Health",
      "PRESIDENCY",
      "MINISTRY OF DEFENCE",
      "MINISTRY OF FOREIGN AFFAIRS",
      "FEDERAL MINISTRY OF INFORMATION & CULTURE",
      "MINISTRY OF INTERIOR",
      "OFFICE OF THE HEAD OF THE CIVIL SERVICE OF THE FEDERATION",
      "AUDITOR GENERAL FOR THE FEDERATION",
      "FEDERAL MINISTRY OF POLICE AFFAIRS",
      "FEDERAL MINISTRY OF COMMUNICATIONS AND DIGITAL ECONONY",
      "FEDERAL MINISTRY OF FINANCE, BUDGET AND NATIONAL PLANNING",
      "FEDERAL MINISTRY OF INDUSTRY, TRADE AND INVESTMENT",
      "FEDERAL MINISTRY OF LABOUR AND EMPLOYMENT",
      "FEDERAL MINISTRY OF SCIENCE AND TECHNOLOGY",
      "FEDERAL MINISTRY OF TRANSPORT",
      "NATIONAL SECURITY ADVISER",
      "INFRASTRUCTURE CONCESSION REGULATORY COMMSSION",
      "SECRETARY TO THE GOVERNMENT OF THE FEDERATION HQTRS",
      "FEDERAL MINISTRY OF SPECIAL DUTIES & INTER - GOVERNMENTAL AFFAIRS HQTRS",
      "FEDERAL MINISTRY OF AGRICULTURE AND RURAL DEVELOPMENT",
      "FEDERAL MINISTRY OF AVIATION",
      "FEDERAL MINISTRY OF POWER",
      "MINISTRY OF PETROLEUM RESOURCES",
      "MINISTRY OF MINES AND STEEL DEVELOPMENT",
      "FEDERAL MINISTRY OF WORKS AND HOUSING",
      "NATIONAL SALARIES, INCOMES AND WAGES COMMISSION",
      "FISCAL RESPONSILIBITY COMMISSION",
      "FEDERAL MINISTRY OF WATER RESOURCES",
      "FEDERAL MINISTRY OF JUSTICE",
      "INDEPENDENT CORRUPT PRACTICES AND RELATED OFFENCES COMMISSION",
      "FEDERAL CAPITAL TERRITORY ADMINISTRATION",
      "FEDERAL MINISTRY OF NIGER DELTA",
      "FEDERAL MINISTRY OF YOUTH & SPORTS DEVELOPMENT",
      "FEDERAL MINISTRY OF WOMEN AFFAIRS",
      "FEDERAL MINISTRY OF EDUCATION",
      "FEDERAL MINISTRY OF HEALTH",
      "FEDERAL MINISTRY OF ENVIRONMENT",
      "NATIONAL POPULATION COMMISSION",
      "MINISTRY OF HUMANITARIAN AFFAIRS, DISASTER MANAGEMENT AND SOCIAL DEVELOPMENT",
      "CODE OF CONDUCT BUREAU",
      "CODE OF CONDUCT TRIBUNAL",
      "FEDERAL CHARACTER COMMISSION",
      "FEDERAL CIVIL SERVICE COMMISSION",
      "POLICE SERVICE COMMISSION",
      "REVENUE MOBILIZATION, ALLOCATION, AND FISCAL COMMISSION",
      "",
    ],
    sdgs: [
      "NO POVERTY",
      "ZERO HUNGER",
      "GOOD HEALTH & WELL-BEING",
      "QUALITY EDUCATION",
      "GENDER EQUALITY",
      "CLEAN WATER & SANITATION",
      "AFFORDABLE & CLEAN ENERGY",
      "DECENT WORK & ECONOMIC GROWTH",
      "INDUSTRY, INNOVATION & INFRASTRUCTURE",
      "REDUCED INEQUALITY",
      "SUSTAINABLE CITIES & COMMUNITIES",
      "RESPONSIBLE CONSUMPTION & PRODUCTION",
      "CLIMATE ACTION",
      "LIFE BELOW WATER",
      "LIFE ON LAND",
      "PEACE & JUSTICE STRONG INSTITUTIONS",
      "PARTNERSHIPS TO ACHIEVE THE GOAL",
    ],
  },
};

const suggestionRes = {
  projects: [
    {
      ministry: "FEDERAL MINISTRY OF LABOUR AND EMPLOYMENT",
      id: "vocational-skillfinancial-grants-to-farmers-and-ma…-selected-communites-in-ikeja-mushi-ergp554001675",
      status: "NOT STARTED",
      name: "Vocational Skill/Financial Grants To Farmers And Mushin/ Agege/ Oshodi/ Alimosho/ Ifako-Ijaiye",
      states: ["LAGOS"],
    },

    {
      ministry: "FEDERAL MINISTRY OF AGRICULTURE AND RURAL DEVELOPMENT",
      id: "provision-for-purchase-of-security-vehicles-for-ojo-oshodi-badagry-ikeja-and-mushin-ergp554001725",
      status: "NOT STARTED",
      name: "Provision For Purchase Of Security Vehicles For Ojo, Oshodi, Badagry, Ikeja And Mushin",
      states: ["LAGOS"],
    },

    {
      ministry: "FEDERAL MINISTRY OF SCIENCE AND TECHNOLOGY",
      id: "construction-of-asphalt-road-with-drainages-in-ikejaalimosho-badagry-and-ojo-ergp202203564",
      status: "NOT STARTED",
      name: "Construction Of Asphalt Road With Drainages In Ikeja,Alimosho, Badagry And Ojo",
      states: ["LAGOS"],
    },

    {
      ministry: "FEDERAL MINISTRY OF AGRICULTURE AND RURAL DEVELOPMENT",
      id: "training-of-youth-on-horticultural-farming-and-bes…n-badagry-west-ikeja-afijalo-and-oj-ergp202203728",
      status: "NOT STARTED",
      name: "Training Of Youth On Horticultural Farming And Bes… Badagry West, Ikeja, Afijalo And Ojo Communities",
      states: ["LAGOS"],
    },
  ],
};

const eyemarkRes = {
  "construction-of-asphalt-road-with-drainages-in-ikejaalimosho-badagry-and-ojo-ergp202203564":
    "eyemarked",
};

const updateSuccessRes = {
  status_code: 200,
  message: "Profile updated successfully",
};

export {
  citizenLoginSuccessRes,
  invalidCred,
  contractorLoginSuccessRes,
  mdaLoginSuccessRes,
  alreadyExistRes,
  citizenSignupSuccessRes,
  invalidCode,
  verificationSuccessRes,
  interestsRes,
  suggestionRes,
  eyemarkRes,
  updateSuccessRes,
};
