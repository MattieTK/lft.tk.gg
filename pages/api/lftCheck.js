export default async function handler(req, res) {
  const lftAPI =
    "https://api.key-worker-coronavirus-home-testing.service.gov.uk/blue/api/stock/check?token=91601ca8-ea24-408b-ade0-960de63eee8d";
  const options = {
    headers: {
      accept: "application/json",
      "accept-language": "en-US,en;q=0.9",
      "cache-control": "max-age=0",
      "content-type": "application/json",
      "sec-ch-ua":
        '" Not A;Brand";v="99", "Chromium";v="98", "Google Chrome";v="98"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "cross-site",
      "x-api-key": "prod.nhs-covid19-apiKeyLfd3Public",
      origin: "https://get-home-lateral-flow-testing-kit.service.gov.uk",
    },
    referer: "https://get-home-lateral-flow-testing-kit.service.gov.uk/",
    referrerPolicy: "strict-origin-when-cross-origin",
    body: '{"postCode":"SW11AA"}',
    method: "POST",
    mode: "cors",
    credentials: "include",
    cookie: process.env.cookie,
  };
  const data = await fetch(lftAPI, options);
  const json = await data.json();
  const date = new Date();
  console.log(`API response: `, data.status);
  console.log("checked at ", date);
  res.setHeader("Cache-Control", "max-age: 0, s-maxage=30");
  console.log;
  if (json.hasStock === false) {
    res.status(200).json({
      status: "CLOSED",
      timeChecked: date.getTime(),
    });
  } else if (json.hasStock === true) {
    res.status(200).json({
      status: "OPEN",
      timeChecked: date.getTime(),
    });
  } else {
    res.status(500).json({
      status: "ERROR",
      response: json,
    });
  }
}
