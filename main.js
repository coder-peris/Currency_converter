const countryList = {
    AED: "AE",
    AFN: "AF",
    XCD: "AG",
    ALL: "AL",
    AMD: "AM",
    ANG: "AN",
    AOA: "AO",
    AQD: "AQ",
    ARS: "AR",
    AUD: "AU",
    AZN: "AZ",
    BAM: "BA",
    BBD: "BB",
    BDT: "BD",
    XOF: "BE",
    BGN: "BG",
    BHD: "BH",
    BIF: "BI",
    BMD: "BM",
    BND: "BN",
    BOB: "BO",
    BRL: "BR",
    BSD: "BS",
    NOK: "BV",
    BWP: "BW",
    BYR: "BY",
    BZD: "BZ",
    CAD: "CA",
    CDF: "CD",
    XAF: "CF",
    CHF: "CH",
    CLP: "CL",
    CNY: "CN",
    COP: "CO",
    CRC: "CR",
    CUP: "CU",
    CVE: "CV",
    CYP: "CY",
    CZK: "CZ",
    DJF: "DJ",
    DKK: "DK",
    DOP: "DO",
    DZD: "DZ",
    ECS: "EC",
    EEK: "EE",
    EGP: "EG",
    ETB: "ET",
    EUR: "FR",
    FJD: "FJ",
    FKP: "FK",
    GBP: "GB",
    GEL: "GE",
    GGP: "GG",
    GHS: "GH",
    GIP: "GI",
    GMD: "GM",
    GNF: "GN",
    GTQ: "GT",
    GYD: "GY",
    HKD: "HK",
    HNL: "HN",
    HRK: "HR",
    HTG: "HT",
    HUF: "HU",
    IDR: "ID",
    ILS: "IL",
    INR: "IN",
    IQD: "IQ",
    IRR: "IR",
    ISK: "IS",
    JMD: "JM",
    JOD: "JO",
    JPY: "JP",
    KES: "KE",
    KGS: "KG",
    KHR: "KH",
    KMF: "KM",
    KPW: "KP",
    KRW: "KR",
    KWD: "KW",
    KYD: "KY",
    KZT: "KZ",
    LAK: "LA",
    LBP: "LB",
    LKR: "LK",
    LRD: "LR",
    LSL: "LS",
    LTL: "LT",
    LVL: "LV",
    LYD: "LY",
    MAD: "MA",
    MDL: "MD",
    MGA: "MG",
    MKD: "MK",
    MMK: "MM",
    MNT: "MN",
    MOP: "MO",
    MRO: "MR",
    MTL: "MT",
    MUR: "MU",
    MVR: "MV",
    MWK: "MW",
    MXN: "MX",
    MYR: "MY",
    MZN: "MZ",
    NAD: "NA",
    XPF: "NC",
    NGN: "NG",
    NIO: "NI",
    NPR: "NP",
    NZD: "NZ",
    OMR: "OM",
    PAB: "PA",
    PEN: "PE",
    PGK: "PG",
    PHP: "PH",
    PKR: "PK",
    PLN: "PL",
    PYG: "PY",
    QAR: "QA",
    RON: "RO",
    RSD: "RS",
    RUB: "RU",
    RWF: "RW",
    SAR: "SA",
    SBD: "SB",
    SCR: "SC",
    SDG: "SD",
    SEK: "SE",
    SGD: "SG",
    SKK: "SK",
    SLL: "SL",
    SOS: "SO",
    SRD: "SR",
    STD: "ST",
    SVC: "SV",
    SYP: "SY",
    SZL: "SZ",
    THB: "TH",
    TJS: "TJ",
    TMT: "TM",
    TND: "TN",
    TOP: "TO",
    TRY: "TR",
    TTD: "TT",
    TWD: "TW",
    TZS: "TZ",
    UAH: "UA",
    UGX: "UG",
    USD: "US",
    UYU: "UY",
    UZS: "UZ",
    VEF: "VE",
    VND: "VN",
    VUV: "VU",
    YER: "YE",
    ZAR: "ZA",
    ZMK: "ZM",
    ZWD: "ZW"
}

//Adding each country in both dropdowns
const select1 = document.querySelector("#from");
const select2 = document.querySelector("#to");
for (x in countryList) {
    const newCountry1 = document.createElement("option");
    const newCountry2 = document.createElement("option");

    newCountry1.innerHTML = x;
    newCountry1.value = x;
    newCountry2.innerHTML = x;
    newCountry2.value = x;

    select1.appendChild(newCountry1);
    select2.appendChild(newCountry2);

    if (countryList[x] == "US") {
        select1.value = x;
    }

    if (countryList[x] == "NP") {
        select2.value = x;
    }
}

const updateFlag = (Element, str) => {
    let img = Element.parentElement.querySelector("img");
    img.src = `https://flagsapi.com/${str}/flat/64.png`;
}

select1.addEventListener("change", () => {
    updateFlag(select1, countryList[select1.value]);
});
select2.addEventListener("change", () => {
    updateFlag(select2, countryList[select2.value]);
});


//Displaying current year in footer
const footerYear = document.querySelector("footer span");
footerYear.textContent = (new Date()).getFullYear();

//Result Calculation
const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const submitButton = document.querySelector("#submit");
const output1 = document.querySelector("#exRate");
const output2 = document.querySelector("#result");

const inputTag = document.querySelector("input");

submitButton.addEventListener("click", async (e) => {
    e.preventDefault();
    const inputValue = inputTag.value;
    if (inputValue == "" || inputValue < 0) {
        alert("Enter a valid amount!");
        inputTag.value="";
        return;
    }
    inputTag.value = "";

    const fromCountry = select1.value;
    const toCountry = select2.value;
    const URL = (`${BASE_URL}/${fromCountry.toLowerCase()}.json`);

    (async () => {
        const promise = await fetch(URL);
        const data = await promise.json();
        const rate = data[fromCountry.toLowerCase()][toCountry.toLowerCase()];
        const exRate = `1 ${fromCountry} = ${rate} ${toCountry}`;
        const result = `${inputValue} ${fromCountry} = ${rate * inputValue} ${toCountry}`;
        output1.innerHTML = exRate;
        output2.innerHTML = result;
    })();
});