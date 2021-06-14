const SEARCH_API = "5f6b94e2315b6e1c98cf07a2cd8c3a04cd089cc2";

const symbols = ["BTC,ETH,XRP,BNB,ADA,DOGE,SOL,MATIC,UNI,VET,VTHO,SHIB"];

const SEARCH_URL = `https://data.messari.io/api/v2/assets?fields=id,name,symbol,metrics/market_data&limit=12`;

const main = document.getElementById("main");

let cryptoArr = [];

getCrypto(SEARCH_URL);

async function getCrypto(url) {
  const response = await fetch(url);
  const data = await response.json();
  // console.log(data.data);
  showCrypto(data.data);
}

function showCrypto(cryptos) {
  cryptoArr = cryptos;

  cryptos.forEach((crypto) => {
    console.log(crypto);
    let { symbol, name } = crypto;

    let price = crypto.metrics.market_data.price_usd;
    price = price.toFixed(4);

    let price_change =
      crypto.metrics.market_data.percent_change_usd_last_1_hour;
    price_change = price_change.toFixed(4);

    let cryptoCard = document.createElement("div");
    cryptoCard.classList.add("card");
    cryptoCard.style.borderColor = priceColor(price_change);
    cryptoCard.style.boxShadow = `3px 3px 8px ${priceColor(price_change)}`;

    cryptoCard.innerHTML = `
		<h2>${symbol}</h2>
		<h3>${name}</h3>
		<p>Price: ${price}</p>
    <p>1hour change: <span style=color:${priceColor(
      price_change
    )};">${price_change}</span></p>
	`;
    main.appendChild(cryptoCard);
  });
}

function priceColor(price_change) {
  if (price_change < 0) {
    return "#f33131";
  } else if (price_change > 0) {
    return "#62c762";
  } else {
    return "#4b4b4b";
  }
}
