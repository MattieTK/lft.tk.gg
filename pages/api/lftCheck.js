export default async function handler(req, res) {
  const lftAPI =
    "https://api.test-for-coronavirus.service.gov.uk/ser/app/homeOrderAvailabilityStatus/lfd3-public";
  const headers = {
    authority: "api.test-for-coronavirus.service.gov.uk",
    "sec-ch-ua":
      '" Not A;Brand";v="99", "Chromium";v="96", "Google Chrome";v="96"',
    accept: 'application/json, text/plain, */*"',
    "sec-ch-ua-mobile": "?0",
    "user-agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36",
    "sec-ch-ua-platform": "macOS",
    origin: "https://test-for-coronavirus.service.gov.uk",
    "sec-fetch-site": "same-site",
    "sec-fetch-mode": "cors",
    "sec-fetch-dest": "empty",
    referer: "https://test-for-coronavirus.service.gov.uk/",
    "accept-language": "en-GB,en-US;q=0.9,en;q=0.8,zh-CN;q=0.7,zh;q=0.6",
  };
  const data = await fetch(lftAPI, { headers: { ...headers } });
  const json = await data.json();
  const date = new Date();
  console.log("checked at ", date);
  res.setHeader("Cache-Control", "max-age: 0, s-maxage=30");
  if (json.status === "CLOSE") {
    res.status(200).json({
      status: "CLOSED",
      timeChecked: date.getTime(),
    });
  } else {
    res.status(200).json({
      status: "OPEN",
      timeChecked: date.getTime(),
    });
  }
}
