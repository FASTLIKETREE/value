// +----------+
// | form     |
// +----------+
// | 10-Q     | quarterly report, has corresponding entries in the num and pre tables
// | 8-K      | broad form issued to inform investors of changes
// | 8-K/A    | (amended) 8-k
// | S-1/A    | (amended) form used when a company is going public
// | 20-F/A   | (amended) foreign issuers to provide information
// | 8-K12B   | Notification that a class of securities of successor issuer is deemed to be registered pursuant to Section 12(b)
// | S-1      | form used when a company is going public
// | 10-K     | comprehensive yearly report
// | 10-Q/A   | (amended) quarterly report
// | 20-F     | foreign issuers to provide information
// | 10-K/A   | (amended) comprehensive yearly report
// | S-4/A    | (amended) related to a business combination or exchange offer
// | S-4      | related to a business combination or exchange offer
// | 40-F     | similar to 10-K but for canadian companies that reside in the US
// | 6-K      | foreign companies making required things public in the country of domicile (USA)
// | S-11     | used to register REITs
// | POS AM   | used for registering with the SEC for IPOs
// | 6-K/A    | (amended) foreign companies making required things public in the country of domicile (USA)
// | 10-12G/A | (amended) document for IPOs, less common than S-1
// | F-1/A    | (amended) required by foreign issuers
// | S-11/A   | (amended) a used to register REITs
// | F-1      | required by foreign issuers
// | 8-K12B/A | (amended) (amended) required by foreign issuers
// | 10-KT/A  | (amended) Similiar to a 10-K but different due to mergers and potentially longer reporting window, company goes back to 10-K after merger completes
// | 10-QT    | Represents fractions of a year due to mergers, similar to a 10-Q, fills gaps during mergers if a fiscal reporting year changes due to a merger
// | 40-F/A   | (amended) similar to 10-K but for canadian companies that reside in the US
// +----------+

async function getCompaniesWithMoreThan1QuarterlyReport() {
// select name, form, count(*) as formcount from sub group by name, form having form = '10-Q' and formcount > 1;
}

async function getNumByAdshAndTag(adsh, tag) {
 // select name, form, count(*) as formcount from sub group by name, form having form = '10-Q' and formcount > 1;
  return ``
}