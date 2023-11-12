const client_secret = process.env.FOURSQUARE_CLIENT_SECRET;
const client_id = process.env.FOURSQUARE_CLIENT_ID;
const redirect_url = 'https://auth.wander.garden/api/foursquare';

export default async function handler(req, res) {
    const { code } = req.query;
    if (!code) {
        return res.status(400).send('code not provided')
    }

    const url = `https://foursquare.com/oauth2/access_token?client_id=${client_id}&client_secret=${client_secret}&grant_type=authorization_code&redirect_uri=${redirect_url}&code=${code}`;
    const response = await fetch(url)
    const json = await response.json()
    if (!json.access_token) {
        return res.status(400).send('access token not found')
    }
    const authenticated_redirect = `https://app.wander.garden/auth?type=foursquare&access_token=${json.access_token}`
    return res.redirect(authenticated_redirect)
}
