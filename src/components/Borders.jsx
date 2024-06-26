import { Link } from 'react-router-dom';
import CountryCodeConverter from './CountryCodeConverter';

function Borders({ borders = [], setPhotos, setAlternativePhotos }) {
  const getCountryBorder = borders => {
    const countryCodes = {
      AFG: 'Afghanistan',
      AGO: 'Angola',
      ALB: 'Albania',
      ARE: 'United Arab Emirates',
      ARG: 'Argentina',
      ARM: 'Armenia',
      ATF: 'French Southern Territories',
      AUS: 'Australia',
      AUT: 'Austria',
      AZE: 'Azerbaijan',
      BDI: 'Burundi',
      BEL: 'Belgium',
      BEN: 'Benin',
      BFA: 'Burkina Faso',
      BGD: 'Bangladesh',
      BGR: 'Bulgaria',
      BHS: 'Bahamas',
      BIH: 'Bosnia and Herzegovina',
      BLR: 'Belarus',
      BLZ: 'Belize',
      BOL: 'Bolivia',
      BRA: 'Brazil',
      BRN: 'Brunei',
      BTN: 'Bhutan',
      BWA: 'Botswana',
      CAF: 'Central African Republic',
      CAN: 'Canada',
      CHE: 'Switzerland',
      CHL: 'Chile',
      CHN: 'China',
      CIV: "Cote d'Ivoire",
      CMR: 'Cameroon',
      COD: 'Democratic Republic of Congo',
      COG: 'Congo',
      COL: 'Colombia',
      CRI: 'Costa Rica',
      CUB: 'Cuba',
      CYP: 'Cyprus',
      CZE: 'Czechia',
      DEU: 'Germany',
      DJI: 'Djibouti',
      DNK: 'Denmark',
      GRL: 'Greenland',
      DOM: 'Dominican Republic',
      DZA: 'Algeria',
      ECU: 'Ecuador',
      EGY: 'Egypt',
      ERI: 'Eritrea',
      ESP: 'Spain',
      EST: 'Estonia',
      ETH: 'Ethiopia',
      FIN: 'Finland',
      FJI: 'Fiji',
      FRA: 'France',
      GUF: 'French Guiana',
      GAB: 'Gabon',
      GBR: 'United Kingdom',
      GEO: 'Georgia',
      GHA: 'Ghana',
      GIN: 'Guinea',
      GMB: 'Gambia',
      GNB: 'Guinea-Bissau',
      GNQ: 'Equatorial Guinea',
      GRC: 'Greece',
      GTM: 'Guatemala',
      GUY: 'Guyana',
      HND: 'Honduras',
      HRV: 'Croatia',
      HTI: 'Haiti',
      HUN: 'Hungary',
      IDN: 'Indonesia',
      IND: 'India',
      IRL: 'Ireland',
      IRN: 'Iran',
      IRQ: 'Iraq',
      ISL: 'Iceland',
      ISR: 'Israel',
      ITA: 'Italy',
      JAM: 'Jamaica',
      JOR: 'Jordan',
      JPN: 'Japan',
      KAZ: 'Kazakhstan',
      KEN: 'Kenya',
      KGZ: 'Kyrgyzstan',
      KHM: 'Cambodia',
      KOR: 'South Korea',
      XKX: 'Kosovo',
      KWT: 'Kuwait',
      LAO: 'Laos',
      LBN: 'Lebanon',
      LBR: 'Liberia',
      LBY: 'Libya',
      LKA: 'Sri Lanka',
      LSO: 'Lesotho',
      LTU: 'Lithuania',
      LUX: 'Luxembourg',
      LVA: 'Latvia',
      MAR: 'Morocco',
      MDA: 'Moldova',
      MDG: 'Madagascar',
      MEX: 'Mexico',
      MKD: 'North Macedonia',
      MLI: 'Mali',
      MMR: 'Myanmar',
      MNE: 'Montenegro',
      MNG: 'Mongolia',
      MOZ: 'Mozambique',
      MRT: 'Mauritania',
      MWI: 'Malawi',
      MYS: 'Malaysia',
      NAM: 'Namibia',
      NCL: 'New Caledonia',
      NER: 'Niger',
      NGA: 'Nigeria',
      NIC: 'Nicaragua',
      NLD: 'Netherlands',
      NOR: 'Norway',
      NPL: 'Nepal',
      NZL: 'New Zealand',
      OMN: 'Oman',
      PAK: 'Pakistan',
      PAN: 'Panama',
      PER: 'Peru',
      PHL: 'Philippines',
      PNG: 'Papua New Guinea',
      POL: 'Poland',
      PRI: 'Puerto Rico',
      PRK: 'North Korea',
      PRT: 'Portugal',
      PRY: 'Paraguay',
      QAT: 'Qatar',
      ROU: 'Romania',
      RUS: 'Russia',
      RWA: 'Rwanda',
      ESH: 'Western Sahara',
      SAU: 'Saudi Arabia',
      SDN: 'Sudan',
      SSD: 'South Sudan',
      SEN: 'Senegal',
      SLB: 'Solomon Islands',
      SLE: 'Sierra Leone',
      SLV: 'El Salvador',
      SOM: 'Somalia',
      SRB: 'Serbia',
      SUR: 'Suriname',
      SVK: 'Slovakia',
      SVN: 'Slovenia',
      SWE: 'Sweden',
      SWZ: 'Eswatini',
      SYR: 'Syria',
      TCD: 'Chad',
      TGO: 'Togo',
      THA: 'Thailand',
      TJK: 'Tajikistan',
      TKM: 'Turkmenistan',
      TLS: 'Timor',
      TTO: 'Trinidad and Tobago',
      TUN: 'Tunisia',
      TUR: 'Turkey',
      TWN: 'Taiwan',
      TZA: 'Tanzania',
      UGA: 'Uganda',
      UKR: 'Ukraine',
      URY: 'Uruguay',
      USA: 'United States',
      UZB: 'Uzbekistan',
      VEN: 'Venezuela',
      VNM: 'Vietnam',
      VUT: 'Vanuatu',
      PSE: 'Palestine',
      YEM: 'Yemen',
      ZAF: 'South Africa',
      ZMB: 'Zambia',
      ZWE: 'Zimbabwe',
      CPV: 'Cape Verde',
      COM: 'Comoros',
      MUS: 'Mauritius',
      SYC: 'Seychelles',
      BHR: 'Bahrain',
      MDV: 'Maldives',
      MHL: 'Marshall Islands',
      FSM: 'Micronesia (country)',
      NRU: 'Nauru',
      PLW: 'Palau',
      WSM: 'Samoa',
      SGP: 'Singapore',
      TON: 'Tonga',
      TUV: 'Tuvalu',
      ATG: 'Antigua and Barbuda',
      BRB: 'Barbados',
      DMA: 'Dominica',
      GRD: 'Grenada',
      KNA: 'Saint Kitts and Nevis',
      LCA: 'Saint Lucia',
      VCT: 'Saint Vincent and the Grenadines',
      AND: 'Andorra',
      LIE: 'Liechtenstein',
      MLT: 'Malta',
      MCO: 'Monaco',
      SMR: 'San Marino',
      KIR: 'Kiribati',
      STP: 'Sao Tome and Principe',
    };
    const colors = ['#ef914e', '#D83F31'];

    if (borders.length > 0) {
      const borderCountriesfiltered = borders.filter(border =>
        Object.keys(countryCodes).includes(border)
      );
      if (borderCountriesfiltered.length > 0) {
        const borderCountries = borderCountriesfiltered.map(
          code => countryCodes[code]
        );

        const handleBorderClick = () => {
          setPhotos([]);
          setAlternativePhotos(null);
        };

        return (
          <div>
            <p className="pb-3">
              <span className="font-semibold">Borders:</span>
            </p>
            {borderCountries.length > 2 ? (
              <table>
                <tbody>
                  <tr>
                    <td className="flex flex-wrap">
                      {borderCountries &&
                        borderCountries.map((country, index) => (
                          <Link
                            key={index}
                            className={`font-semibold mb-1 mr-7 border-hover`}
                            style={{ color: colors[index % colors.length] }}
                            to={`/country/${CountryCodeConverter({
                              countryName: country,
                            })}/${country.replaceAll(' ', '-')}`}
                            onClick={handleBorderClick}
                          >
                            {country}
                          </Link>
                        ))}
                    </td>
                  </tr>
                </tbody>
              </table>
            ) : (
              <table>
                <tbody>
                  <tr>
                    {borderCountries &&
                      borderCountries.map((country, index) => (
                        <td key={index} className="flex mb-1">
                          <Link
                            className={`text-[#ef914e] font-semibold hover:text-[#F53]`}
                            to={`/country/${CountryCodeConverter({
                              countryName: country,
                            })}/${country.replaceAll(' ', '-')}`}
                            onClick={handleBorderClick}
                          >
                            {country}
                          </Link>
                        </td>
                      ))}
                  </tr>
                </tbody>
              </table>
            )}
          </div>
        );
      }
    }
  };
  return getCountryBorder(borders);
}

export default Borders;
