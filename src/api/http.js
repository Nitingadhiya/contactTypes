//const path = "http://192.168.1.169:8000";
const path = "https://staging.roadheroes.com";
//const path = "https://roadheroes.com";
const APIURL = `${path}/api`;
const version2 = "v2";
const loginEndPoint = `${version2}/login/password`;
const accountEndPoint = `${version2}/account`;
const changePasswordEndPoint = `${version2}/reset-password`;
const achievementsEndPoint = `${version2}/achievements`;
const offerEndPoint = `${version2}/offers`;
const jobPostsEndPoint = `${version2}/job-posts`;
const detailsEndPoint = `${version2}/offers`;
const optionsMetaEndPoint = `${version2}/options`;
const validateRegisterEndPoint = `${version2}/validate/register`;
const registerEndPoint = `${version2}/register`;
const profileEndPoint = `${version2}/profile`;
const confirmEmailEndPoint = `${version2}/confirm/email`;
const confirmPhoneEndPoint = `${version2}/confirm/phone`;
const uploadPhoto = `${APIURL}/${version2}/profile/picture`;
const acceptTerms = `${version2}/account/toggle-accept-terms`;
const reviewEndPoint = `${version2}/reviews`;
const inviteEndPoint = `${version2}/invitation`;
const applicationInfo = `${version2}/application/information`;
const registerDevice = `${version2}/register/device`;
const acceptRejectOfferEndPoint = `${version2}/offers`;
const confirmOfferEndPoint = id => `${version2}/job-posts/${id}/apply`;
const offerRejectOptionsEndPoint = `${version2}/options/offer-rejection-reasons`;
const configurationEndpoint = `${version2}/configuration`;
const resetPasswordEndPoint = `${version2}/password/email`;

module.exports = {
  APIURL,
  loginEndPoint,
  accountEndPoint,
  changePasswordEndPoint,
  achievementsEndPoint,
  offerEndPoint,
  jobPostsEndPoint,
  detailsEndPoint,
  optionsMetaEndPoint,
  validateRegisterEndPoint,
  registerEndPoint,
  profileEndPoint,
  confirmEmailEndPoint,
  confirmPhoneEndPoint,
  uploadPhoto,
  acceptTerms,
  reviewEndPoint,
  inviteEndPoint,
  applicationInfo,
  registerDevice,
  acceptRejectOfferEndPoint,
  confirmOfferEndPoint,
  offerRejectOptionsEndPoint,
  configurationEndpoint,
  resetPasswordEndPoint,
  path
};
