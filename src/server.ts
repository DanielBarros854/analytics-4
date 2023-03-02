import { BetaAnalyticsDataClient } from "@google-analytics/data"
import moment from "moment"
import Express, { Request, Response } from 'express'
import expressSession from 'express-session'

require('dotenv').config()

const port = 4000
const app = Express()

const analyticsDataClient = new BetaAnalyticsDataClient()

const propertyId = process.env.PROPERTY_ID || 'YOUR-GA4-PROPERTY-ID'
const credential_path = `${__dirname}/credential.json`;
process.env.GOOGLE_APPLICATION_CREDENTIALS = credential_path;

app.use(Express.json())
app.use(Express.urlencoded({ extended: true }))
app.use(expressSession({ secret: 'as!883@bnr$', resave: true, saveUninitialized: true }))

const runReport = async () => {
  const now = moment().format('YYYY-MM-DD')
  const aMonthAgo = moment()
    .subtract(1, 'months')
    .format('YYYY-MM-DD')

  const [response] = await analyticsDataClient.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [
      {
        startDate: aMonthAgo,
        endDate: now,
      },
    ],
    dimensions: [
      {
        name: 'city',
      },
      // {
      //   name: 'date',
      // },
    ],
    metrics: [
      {
        name: 'activeUsers',
      },
    ],
  });

  console.log('Report result:');
  response?.rows?.forEach((row: any) => {
    console.log(row.dimensionValues[0], row.metricValues[0]);
  });
}

app.get('/', (req: Request, res: Response) => {
  runReport()
  res.status(200).json({
    message: 'Ok'
  })
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
