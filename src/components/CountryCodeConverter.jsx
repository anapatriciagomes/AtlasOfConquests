const CountryCodeConverter = ({ countryName }) => {
  const getCountryCode = countryName => {
    const countryCodes = {
      Afghanistan: 'AF',
      Angola: 'AO',
      Albania: 'AL',
      'United Arab Emirates': 'AE',
      Argentina: 'AR',
      Armenia: 'AM',
      'French Southern and Antarctic Lands': 'TF',
      Australia: 'AU',
      Austria: 'AT',
      Azerbaijan: 'AZ',
      Burundi: 'BI',
      Belgium: 'BE',
      Benin: 'BJ',
      'Burkina Faso': 'BF',
      Bangladesh: 'BD',
      Bulgaria: 'BG',
      Bahamas: 'BS',
      'Bosnia and Herzegovina': 'BA',
      Belarus: 'BY',
      Belize: 'BZ',
      Bolivia: 'BO',
      Brazil: 'BR',
      Brunei: 'BN',
      Bhutan: 'BT',
      Botswana: 'BW',
      'Central African Republic': 'CF',
      Canada: 'CA',
      Switzerland: 'CH',
      Chile: 'CL',
      China: 'CN',
      "Cote d'Ivoire": 'CI',
      Cameroon: 'CM',
      'Democratic Republic of Congo': 'CD',
      Congo: 'CG',
      Colombia: 'CO',
      'Costa Rica': 'CR',
      Cuba: 'CU',
      Cyprus: 'CY',
      Czechia: 'CZ',
      Germany: 'DE',
      Djibouti: 'DJ',
      Denmark: 'DK',
      Greenland: 'GL',
      'Dominican Republic': 'DO',
      Algeria: 'DZ',
      Ecuador: 'EC',
      Egypt: 'EG',
      Eritrea: 'ER',
      Spain: 'ES',
      Estonia: 'EE',
      Ethiopia: 'ET',
      Finland: 'FI',
      Fiji: 'FJ',
      France: 'FR',
      'French Guiana': 'GF',
      Gabon: 'GA',
      'United Kingdom': 'GB',
      Georgia: 'GE',
      Ghana: 'GH',
      Guinea: 'GN',
      Gambia: 'GM',
      'Guinea-Bissau': 'GW',
      'Equatorial Guinea': 'GQ',
      Greece: 'GR',
      Guatemala: 'GT',
      Guyana: 'GY',
      Honduras: 'HN',
      Croatia: 'HR',
      Haiti: 'HT',
      Hungary: 'HU',
      Indonesia: 'ID',
      India: 'IN',
      Ireland: 'IE',
      Iran: 'IR',
      Iraq: 'IQ',
      Iceland: 'IS',
      Israel: 'IL',
      Italy: 'IT',
      Jamaica: 'JM',
      Jordan: 'JO',
      Japan: 'JP',
      Kazakhstan: 'KZ',
      Kenya: 'KE',
      Kyrgyzstan: 'KG',
      Cambodia: 'KH',
      'South Korea': 'KR',
      Kosovo: 'XK',
      Kuwait: 'KW',
      Laos: 'LA',
      Lebanon: 'LB',
      Liberia: 'LR',
      Libya: 'LY',
      'Sri Lanka': 'LK',
      Lesotho: 'LS',
      Lithuania: 'LT',
      Luxembourg: 'LU',
      Latvia: 'LV',
      Morocco: 'MA',
      Moldova: 'MD',
      Madagascar: 'MG',
      Mexico: 'MX',
      'North Macedonia': 'MK',
      Mali: 'ML',
      Myanmar: 'MM',
      Montenegro: 'ME',
      Mongolia: 'MN',
      Mozambique: 'MZ',
      Mauritania: 'MR',
      Malawi: 'MW',
      Malaysia: 'MY',
      Namibia: 'NA',
      'New Caledonia': 'NC',
      Niger: 'NE',
      Nigeria: 'NG',
      Nicaragua: 'NI',
      Netherlands: 'NL',
      Norway: 'NO',
      Nepal: 'NP',
      'New Zealand': 'NZ',
      Oman: 'OM',
      Pakistan: 'PK',
      Panama: 'PA',
      Peru: 'PE',
      Philippines: 'PH',
      'Papua New Guinea': 'PG',
      Poland: 'PL',
      'Puerto Rico': 'PR',
      'North Korea': 'KP',
      Portugal: 'PT',
      Paraguay: 'PY',
      Qatar: 'QA',
      Romania: 'RO',
      Russia: 'RU',
      Rwanda: 'RW',
      'Western Sahara': 'EH',
      'Saudi Arabia': 'SA',
      Sudan: 'SD',
      'South Sudan': 'SS',
      Senegal: 'SN',
      'Solomon Islands': 'SB',
      'Sierra Leone': 'SL',
      'El Salvador': 'SV',
      Somalia: 'SO',
      Serbia: 'RS',
      Suriname: 'SR',
      Slovakia: 'SK',
      Slovenia: 'SI',
      Sweden: 'SE',
      Eswatini: 'SZ',
      Syria: 'SY',
      Chad: 'TD',
      Togo: 'TG',
      Thailand: 'TH',
      Tajikistan: 'TJ',
      Turkmenistan: 'TM',
      Timor: 'TL',
      'Trinidad and Tobago': 'TT',
      Tunisia: 'TN',
      Turkey: 'TR',
      Taiwan: 'TW',
      Tanzania: 'TZ',
      Uganda: 'UG',
      Ukraine: 'UA',
      Uruguay: 'UY',
      'United States': 'US',
      Uzbekistan: 'UZ',
      Venezuela: 'VE',
      Vietnam: 'VN',
      Vanuatu: 'VU',
      Palestine: 'PS',
      Yemen: 'YE',
      'South Africa': 'ZA',
      Zambia: 'ZM',
      Zimbabwe: 'ZW',
      'Cape Verde': 'CV',
      Comoros: 'KM',
      Mauritius: 'MU',
      Seychelles: 'SC',
      Bahrain: 'BH',
      Maldives: 'MV',
      'Marshall Islands': 'MH',
      'Micronesia (country)': 'FM',
      Nauru: 'NR',
      Palau: 'PW',
      Samoa: 'WS',
      Singapore: 'SG',
      Tonga: 'TO',
      Tuvalu: 'TV',
      'Antigua and Barbuda': 'AG',
      Barbados: 'BB',
      Dominica: 'DM',
      Grenada: 'GD',
      'Saint Kitts and Nevis': 'KN',
      'Saint Lucia': 'LC',
      'Saint Vincent and the Grenadines': 'VC',
      Andorra: 'AD',
      Liechtenstein: 'LI',
      Malta: 'MT',
      Monaco: 'MC',
      'San Marino': 'SM',
      Kiribati: 'KI',
      'Sao Tome and Principe': 'ST',
    };

    const countryCode = countryCodes[countryName] || 'Country code not found';
    return countryCode.toLowerCase();
  };

  return getCountryCode(countryName);
};

export default CountryCodeConverter;
