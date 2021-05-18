import { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';

import {
	Button,
	Center,
	Footer,
  AvailabilityViewer,
} from 'components';

import {
	StyledMain,
	Logo,
  Title,
	AboutSection,
	P,
  Step,
  FakeCalendar,
  FakeTimeRange,
} from './helpStyle';

import logo from 'res/logo.svg';

const Help = () => {
  const { push } = useHistory();
  const { t } = useTranslation(['common', 'help']);

	useEffect(() => {
		document.title = t('help:name');
	}, []);

	return (
		<>
			<StyledMain>
        <Link to="/" style={{ textDecoration: 'none' }}>
					<Center>
						<Logo src={logo} alt="" />
						<Title>CRAB FIT</Title>
					</Center>
					<Center style={{ textDecoration: 'underline', fontSize: 14, paddingTop: 6 }}>{t('common:tagline')}</Center>
				</Link>
      </StyledMain>

      <StyledMain>
  			<h1>{t('help:name')}</h1>
        <P>{t('help:p1')}</P>
        <P>{t('help:p2')}</P>

        <Step>{t('help:s1')}</Step>
        <P><Trans i18nKey="help:p3">Use the form at <Link to="/">crab.fit</Link> to make a new event. You only need to put in the rough time period for when your event occurs here, not your availability.</Trans></P>
        <P>{t('help:p4')}</P>
        <FakeCalendar>
          <div className="days"><span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span></div>
          <div className="dates"><span>11</span><span className="selected">12</span><span className="selected">13</span><span className="selected">14</span><span className="selected">15</span><span className="selected">16</span><span>17</span></div>
        </FakeCalendar>
        <P>{t('help:p5')}</P>
        <FakeTimeRange>
          <div className="start" data-label="11am"></div>
          <div className="end" data-label="5pm"></div>
        </FakeTimeRange>

        <Step>{t('help:s2')}</Step>
        <P>{t('help:p6')}</P>
        <P>{t('help:p7')}</P>
        <AvailabilityViewer
          times={["1100-12042021","1115-12042021","1130-12042021","1145-12042021","1200-12042021","1215-12042021","1230-12042021","1245-12042021","1300-12042021","1315-12042021","1330-12042021","1345-12042021","1400-12042021","1415-12042021","1430-12042021","1445-12042021","1500-12042021","1515-12042021","1530-12042021","1545-12042021","1600-12042021","1615-12042021","1630-12042021","1645-12042021","1100-13042021","1115-13042021","1130-13042021","1145-13042021","1200-13042021","1215-13042021","1230-13042021","1245-13042021","1300-13042021","1315-13042021","1330-13042021","1345-13042021","1400-13042021","1415-13042021","1430-13042021","1445-13042021","1500-13042021","1515-13042021","1530-13042021","1545-13042021","1600-13042021","1615-13042021","1630-13042021","1645-13042021","1100-14042021","1115-14042021","1130-14042021","1145-14042021","1200-14042021","1215-14042021","1230-14042021","1245-14042021","1300-14042021","1315-14042021","1330-14042021","1345-14042021","1400-14042021","1415-14042021","1430-14042021","1445-14042021","1500-14042021","1515-14042021","1530-14042021","1545-14042021","1600-14042021","1615-14042021","1630-14042021","1645-14042021","1100-15042021","1115-15042021","1130-15042021","1145-15042021","1200-15042021","1215-15042021","1230-15042021","1245-15042021","1300-15042021","1315-15042021","1330-15042021","1345-15042021","1400-15042021","1415-15042021","1430-15042021","1445-15042021","1500-15042021","1515-15042021","1530-15042021","1545-15042021","1600-15042021","1615-15042021","1630-15042021","1645-15042021","1100-16042021","1115-16042021","1130-16042021","1145-16042021","1200-16042021","1215-16042021","1230-16042021","1245-16042021","1300-16042021","1315-16042021","1330-16042021","1345-16042021","1400-16042021","1415-16042021","1430-16042021","1445-16042021","1500-16042021","1515-16042021","1530-16042021","1545-16042021","1600-16042021","1615-16042021","1630-16042021","1645-16042021"]}
          timeLabels={[{"label":"11 AM","time":"1100"},{"label":"","time":"1115"},{"label":"","time":"1130"},{"label":"","time":"1145"},{"label":"12 PM","time":"1200"},{"label":"","time":"1215"},{"label":"","time":"1230"},{"label":"","time":"1245"},{"label":"1 PM","time":"1300"},{"label":"","time":"1315"},{"label":"","time":"1330"},{"label":"","time":"1345"},{"label":"2 PM","time":"1400"},{"label":"","time":"1415"},{"label":"","time":"1430"},{"label":"","time":"1445"},{"label":"3 PM","time":"1500"},{"label":"","time":"1515"},{"label":"","time":"1530"},{"label":"","time":"1545"},{"label":"4 PM","time":"1600"},{"label":"","time":"1615"},{"label":"","time":"1630"},{"label":"","time":"1645"},{"label":"5 PM","time":null}]}
          dates={["12042021","13042021","14042021","15042021","16042021"]}
          isSpecificDates={true}
          people={[{"name":"Jenny","availability":["1100-12042021","1100-13042021","1100-14042021","1100-15042021","1115-12042021","1115-13042021","1115-14042021","1115-15042021","1130-12042021","1130-13042021","1130-14042021","1130-15042021","1145-12042021","1145-13042021","1145-14042021","1145-15042021","1200-12042021","1200-13042021","1200-14042021","1200-15042021","1215-12042021","1215-13042021","1215-14042021","1215-15042021","1230-12042021","1230-13042021","1230-14042021","1230-15042021","1245-12042021","1245-13042021","1245-14042021","1245-15042021","1300-12042021","1300-13042021","1300-14042021","1300-15042021","1300-16042021","1315-12042021","1315-13042021","1315-14042021","1315-15042021","1315-16042021","1330-12042021","1330-13042021","1330-14042021","1330-15042021","1330-16042021","1345-12042021","1345-13042021","1345-14042021","1345-15042021","1345-16042021","1400-12042021","1400-13042021","1400-14042021","1400-15042021","1400-16042021","1415-12042021","1415-13042021","1415-14042021","1415-15042021","1415-16042021","1430-12042021","1430-13042021","1430-14042021","1430-15042021","1430-16042021","1445-12042021","1445-13042021","1445-14042021","1445-15042021","1445-16042021","1500-12042021","1500-15042021","1500-16042021","1515-12042021","1515-15042021","1515-16042021","1530-12042021","1530-15042021","1530-16042021","1545-12042021","1545-15042021","1545-16042021","1600-12042021","1600-15042021","1600-16042021","1615-12042021","1615-15042021","1615-16042021","1630-12042021","1630-15042021","1630-16042021","1645-12042021","1645-15042021","1645-16042021"]}]}
          min={0}
          max={1}
        />

        <Step>{t('help:s3')}</Step>
        <P>{t('help:p8')}</P>
        <P>{t('help:p9')}</P>
        <P>{t('help:p10')}</P>
        <AvailabilityViewer
          times={["1100-12042021","1115-12042021","1130-12042021","1145-12042021","1200-12042021","1215-12042021","1230-12042021","1245-12042021","1300-12042021","1315-12042021","1330-12042021","1345-12042021","1400-12042021","1415-12042021","1430-12042021","1445-12042021","1500-12042021","1515-12042021","1530-12042021","1545-12042021","1600-12042021","1615-12042021","1630-12042021","1645-12042021","1100-13042021","1115-13042021","1130-13042021","1145-13042021","1200-13042021","1215-13042021","1230-13042021","1245-13042021","1300-13042021","1315-13042021","1330-13042021","1345-13042021","1400-13042021","1415-13042021","1430-13042021","1445-13042021","1500-13042021","1515-13042021","1530-13042021","1545-13042021","1600-13042021","1615-13042021","1630-13042021","1645-13042021","1100-14042021","1115-14042021","1130-14042021","1145-14042021","1200-14042021","1215-14042021","1230-14042021","1245-14042021","1300-14042021","1315-14042021","1330-14042021","1345-14042021","1400-14042021","1415-14042021","1430-14042021","1445-14042021","1500-14042021","1515-14042021","1530-14042021","1545-14042021","1600-14042021","1615-14042021","1630-14042021","1645-14042021","1100-15042021","1115-15042021","1130-15042021","1145-15042021","1200-15042021","1215-15042021","1230-15042021","1245-15042021","1300-15042021","1315-15042021","1330-15042021","1345-15042021","1400-15042021","1415-15042021","1430-15042021","1445-15042021","1500-15042021","1515-15042021","1530-15042021","1545-15042021","1600-15042021","1615-15042021","1630-15042021","1645-15042021","1100-16042021","1115-16042021","1130-16042021","1145-16042021","1200-16042021","1215-16042021","1230-16042021","1245-16042021","1300-16042021","1315-16042021","1330-16042021","1345-16042021","1400-16042021","1415-16042021","1430-16042021","1445-16042021","1500-16042021","1515-16042021","1530-16042021","1545-16042021","1600-16042021","1615-16042021","1630-16042021","1645-16042021"]}
          timeLabels={[{"label":"11 AM","time":"1100"},{"label":"","time":"1115"},{"label":"","time":"1130"},{"label":"","time":"1145"},{"label":"12 PM","time":"1200"},{"label":"","time":"1215"},{"label":"","time":"1230"},{"label":"","time":"1245"},{"label":"1 PM","time":"1300"},{"label":"","time":"1315"},{"label":"","time":"1330"},{"label":"","time":"1345"},{"label":"2 PM","time":"1400"},{"label":"","time":"1415"},{"label":"","time":"1430"},{"label":"","time":"1445"},{"label":"3 PM","time":"1500"},{"label":"","time":"1515"},{"label":"","time":"1530"},{"label":"","time":"1545"},{"label":"4 PM","time":"1600"},{"label":"","time":"1615"},{"label":"","time":"1630"},{"label":"","time":"1645"},{"label":"5 PM","time":null}]}
          dates={["12042021","13042021","14042021","15042021","16042021"]}
          isSpecificDates={true}
          people={[{"name":"Jenny","availability":["1100-12042021","1100-13042021","1100-14042021","1100-15042021","1115-12042021","1115-13042021","1115-14042021","1115-15042021","1130-12042021","1130-13042021","1130-14042021","1130-15042021","1145-12042021","1145-13042021","1145-14042021","1145-15042021","1200-12042021","1200-13042021","1200-14042021","1200-15042021","1215-12042021","1215-13042021","1215-14042021","1215-15042021","1230-12042021","1230-13042021","1230-14042021","1230-15042021","1245-12042021","1245-13042021","1245-14042021","1245-15042021","1300-12042021","1300-13042021","1300-14042021","1300-15042021","1300-16042021","1315-12042021","1315-13042021","1315-14042021","1315-15042021","1315-16042021","1330-12042021","1330-13042021","1330-14042021","1330-15042021","1330-16042021","1345-12042021","1345-13042021","1345-14042021","1345-15042021","1345-16042021","1400-12042021","1400-13042021","1400-14042021","1400-15042021","1400-16042021","1415-12042021","1415-13042021","1415-14042021","1415-15042021","1415-16042021","1430-12042021","1430-13042021","1430-14042021","1430-15042021","1430-16042021","1445-12042021","1445-13042021","1445-14042021","1445-15042021","1445-16042021","1500-12042021","1500-15042021","1500-16042021","1515-12042021","1515-15042021","1515-16042021","1530-12042021","1530-15042021","1530-16042021","1545-12042021","1545-15042021","1545-16042021","1600-12042021","1600-15042021","1600-16042021","1615-12042021","1615-15042021","1615-16042021","1630-12042021","1630-15042021","1630-16042021","1645-12042021","1645-15042021","1645-16042021"]},{"name":"Dakota","availability":["1300-14042021","1300-15042021","1300-16042021","1315-13042021","1315-14042021","1315-15042021","1315-16042021","1330-13042021","1330-14042021","1330-15042021","1330-16042021","1345-13042021","1345-14042021","1345-15042021","1345-16042021","1400-13042021","1400-14042021","1400-15042021","1400-16042021","1415-13042021","1415-14042021","1415-15042021","1415-16042021","1430-13042021","1430-14042021","1430-15042021","1430-16042021","1445-13042021","1445-14042021","1445-15042021","1445-16042021","1300-13042021","1100-12042021","1100-13042021","1115-12042021","1115-13042021","1130-12042021","1130-13042021","1145-12042021","1145-13042021"]},{"name":"Samson","availability":["1100-16042021","1115-16042021","1130-16042021","1145-16042021","1200-16042021","1215-16042021","1230-16042021","1245-16042021","1300-16042021","1315-16042021","1330-16042021","1345-16042021","1400-16042021","1415-16042021","1430-16042021","1445-16042021","1500-16042021","1515-16042021","1530-16042021","1545-16042021","1600-16042021","1615-16042021","1630-16042021","1645-16042021"]},{"name":"Mark","availability":["1200-12042021","1200-13042021","1200-14042021","1200-16042021","1215-12042021","1215-13042021","1215-14042021","1215-16042021","1230-12042021","1230-13042021","1230-14042021","1230-16042021","1245-12042021","1245-13042021","1245-14042021","1245-16042021","1300-12042021","1300-13042021","1300-14042021","1300-16042021","1315-12042021","1315-13042021","1315-14042021","1315-16042021","1330-12042021","1330-13042021","1330-14042021","1330-16042021","1345-12042021","1345-13042021","1345-14042021","1345-16042021","1400-12042021","1400-13042021","1400-14042021","1400-16042021","1415-12042021","1415-13042021","1415-14042021","1415-16042021","1430-12042021","1430-13042021","1430-14042021","1430-16042021","1445-12042021","1445-13042021","1445-14042021","1445-16042021","1500-12042021","1500-13042021","1500-14042021","1500-16042021","1515-12042021","1515-13042021","1515-14042021","1515-16042021","1530-12042021","1530-13042021","1530-14042021","1530-16042021","1545-12042021","1545-13042021","1545-14042021","1545-16042021"]},{"name":"Alex","availability":["1200-13042021","1200-14042021","1215-13042021","1215-14042021","1230-13042021","1230-14042021","1245-13042021","1245-14042021","1300-13042021","1300-14042021","1315-13042021","1315-14042021","1330-13042021","1330-14042021","1345-13042021","1345-14042021","1400-13042021","1400-14042021","1415-13042021","1415-14042021","1430-13042021","1430-14042021","1445-13042021","1445-14042021","1500-13042021","1500-14042021","1515-13042021","1515-14042021","1530-13042021","1530-14042021","1545-13042021","1545-14042021","1200-12042021","1215-12042021","1545-12042021","1230-12042021","1245-12042021","1300-12042021","1315-12042021","1330-12042021","1345-12042021","1400-12042021","1415-12042021","1430-12042021","1445-12042021","1500-12042021","1515-12042021","1530-12042021","1100-15042021","1100-16042021","1115-15042021","1115-16042021","1130-15042021","1130-16042021","1145-15042021","1145-16042021","1200-15042021","1200-16042021","1215-15042021","1215-16042021","1230-15042021","1230-16042021","1245-15042021","1245-16042021","1300-15042021","1300-16042021","1315-15042021","1315-16042021","1330-15042021","1330-16042021","1345-15042021","1345-16042021","1400-15042021","1400-16042021","1415-15042021","1415-16042021","1430-15042021","1430-16042021","1445-15042021","1445-16042021","1500-15042021","1500-16042021","1515-15042021","1515-16042021","1530-15042021","1530-16042021","1545-15042021","1545-16042021","1600-15042021","1600-16042021","1615-15042021","1615-16042021","1630-15042021","1630-16042021","1645-15042021","1645-16042021"]}]}
          min={0}
          max={5}
        />
			</StyledMain>

			<AboutSection id="about">
				<StyledMain>
					<Center><Button buttonWidth="230px" onClick={() => push('/')}>{t('common:cta')}</Button></Center>
				</StyledMain>
			</AboutSection>

			<Footer />
		</>
	);
};

export default Help;
