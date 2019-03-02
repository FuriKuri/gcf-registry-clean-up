var googleAuth = require('google-auto-auth');
var auth = googleAuth();
var axios = require('axios');

function getAccessToken() {
  return new Promise(resolve => {
    auth.getToken((err, token) => {
      resolve(token);
    });
  });
}

exports.handler = async _ => {
  const token = await getAccessToken();

  const client = axios.create({
    baseURL: `https://gcr.io/v2`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const response = await client.get('/furi-kuri/cloudshell/tags/list');

  for (var image in response.data.manifest) {
    if (response.data.manifest.hasOwnProperty(image)) {
      if (!response.data.manifest[image].tag.includes("latest")) {
        console.log(`Delete ${image}`);
        await client.delete('/furi-kuri/cloudshell/manifests/' + image);
      } else {
        console.log("Do not delete latest");
      }
    }
  }

  console.log("Finish")
};