const client_secret = process.env.FOURSQUARE_CLIENT_SECRET;
const client_id = process.env.FOURSQUARE_CLIENT_ID;
const redirect_url = 'http://wander.garden/auth.php?type=foursquare';

export default async function handler(req, res) {
    const { code } = req.query;

    const url = `https://foursquare.com/oauth2/access_token?client_id=${client_id}&client_secret=${client_secret}&grant_type=authorization_code&redirect_uri=${redirect_url}&code=${code}`;
    const response = await fetch(url)
    const json = await response.json()
    if (!json.access_token) {
        return res.status(400).send('access token not found')
    }
    const authenticated_redirect = `http://wander.garden/auth?access_token=${access_token}`
    return res.redirect(authenticated_redirect)
}
  