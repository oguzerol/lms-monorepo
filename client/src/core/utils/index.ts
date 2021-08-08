// accepted types: production, development, staging
export const ENV = {
  type: process.env.REACT_APP_ENV,
  isDev: process.env.REACT_APP_ENV === "development",
  isStaging: process.env.REACT_APP_ENV === "staging",
  isProduction: process.env.REACT_APP_ENV === "production",
};
