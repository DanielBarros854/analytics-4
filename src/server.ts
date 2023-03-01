import { BetaAnalyticsDataClient } from "@google-analytics/data";
import moment from "moment";
import Express, { Request, Response } from 'express';
import passport from "passport";

require('dotenv').config()

const port = 4000
const app = Express()

const analyticsDataClient = new BetaAnalyticsDataClient();

const propertyId = process.env.PROPERTY_ID || 'YOUR-GA4-PROPERTY-ID';
const clientID = process.env.CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET
const callbackURL = '/login/google/return'
const scope = 'https://www.googleapis.com/auth/analytics.readonly';

app.use(Express.json())
app.use(Express.urlencoded({ extended: true }))

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
  res.status(200).json({
    foi: 'foi'
  })
})

app.get(
  '/login/google/',
  passport.authenticate('google', {
    session: true,
    scope: scope,
    successRedirect: callbackURL,
    
  }),
);

app.get(
  '/login/google/return',
  passport.authenticate('google', {
    failureRedirect: '/login/google/failure',
    failureMessage: true,
    session: true,
  }),
  (req: Request, res: Response) => {
    console.log(req)
  },
);

app.get('/login/google//failure', (req, res) => res.status(400).json({
  message: 'Something went wrong.',
}));

// ver estategia para logar com o oauth2

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
