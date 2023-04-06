/* eslint-disable @calm/react-intl/missing-formatted-message */
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, List, ListItem, ListItemText, Typography} from '@ellucian/react-design-system/core';
import { withStyles } from '@ellucian/react-design-system/core/styles';
import { spacingXSmall } from '@ellucian/react-design-system/core/styles/tokens';
import PropTypes from 'prop-types';
import React from 'react';


const styles = theme => ({
  root: {
    padding: spacingXSmall,
    color: theme.palette.secondary.main
  }
});

const ResourceOnCamp = (props) => {
    const {
        classes
    } = props;

    let id = 0;

    function createData(name, link) {
      id += 1;
      const object ={id, name, link};
      return object;
    }

    const academicResources = [
      createData('University Advisement', 'https://www.life.edu/academic-pages/academic-resources/university-advising/'),
      createData('Catalog', 'http://catalog.life.edu/'),
      createData('Quarterly Announcements', 'https://life.edu//quarterlyannouncements'),
      createData('Graduation Information', 'https://www.life.edu/academic-pages/registrar/applying-for-graduation/'),
      createData('EagleNet', 'https://eaglenet.life.edu/'),
      createData('Academic Calendar', 'https://www.life.edu/academic-pages/academic-calendar/'),
      createData('Course Evaluations FAQ', 'https://www.life.edu/course-evaluation-student-faq/'),
      createData('Library Resources', 'https://life.libguides.com/home')

    ];

    const campusLifeResources = [
      createData('Campus Safety', 'https://www.life.edu/campus-life-pages/campus-safety/'),
      createData('Directions to LIFE', 'https://www.life.edu/about-pages/basic-information/driving-directions/'),
      createData('Parking & Vehicle Information', 'https://www.life.edu/about-pages/basic-information/parking-visitor-info/'),
      createData('Socrates Cafe & Menu', 'https://www.life.edu/campus-life-pages/dining-services/'),
      createData('Online Vital Source', 'https://vitalsourcelife.wordpress.com/'),
      createData('Athletics', 'https://www.life.edu/athletics/'),
      createData('Student Clubs', 'https://engage.life.edu/'),
      createData('Engage', 'https://engage.life.edu/'),
      createData('Shuttle Schedule', 'https://www.life.edu/campus-life-pages/transportation/shuttles/'),
      createData('Housing', 'https://www.life.edu/campus-life-pages/housing-overview/'),
      createData('LIFE License Plates', 'https://www.life.edu/campus-life-pages/life-license-plates/'),
      createData('Wellness Center', 'https://www.life.edu/campus-life-pages/wellness-center/'),
      createData('LIFE News', 'https://www.life.edu/news/'),
      createData('Career Services', 'https://www.life.edu/campus-life-pages/career-services/'),
      createData('LIFE Village Retreat', 'https://www.lifesvillageretreat.com/'),
      createData('Student Ambassadors', 'https://www.life.edu/about-pages/university-leadership/student-ambassadors/')
    ];

    const courseStudyResources = [
      createData('Blackboard', 'https://blackboard.life.edu/webapps/login/'),
      createData('Student Email', 'https://mail.google.com/a/student.life.edu'),
      createData('PAR Center', 'https://www.life.edu/academic-pages/par-center/'),
      createData('IT Department', 'https://www.life.edu/campus-life-pages/technology/it-help-desk/'),
      createData('Library', 'https://life.libguides.com/home'),
      createData('Password Management', 'https://sso.life.edu/PasswordManager/'),
      createData('Life University Online Bookstore', 'https://life.textbookx.com/institutional/index.php'),
      createData('LIFE U Shop', 'https://www.life.edu/campus-life-pages/life-u-shop/')
    ];

    const universityResources = [
      createData('Directory', 'http://directory.life.edu/Direct.html'),
      createData('Alumni', 'http://alumni.life.edu/'),
      createData('Disability Services', 'https://www.life.edu/campus-life-pages/student-success-center/disability-services/'),
      createData('Distance Education Complaint Process', 'https://www.life.edu/academic-pages/distance-education-complaint-procedure/'),
      createData('Counseling Services', 'https://www.life.edu/campus-life-pages/student-success-center/counseling/'),
      createData('LIFE News Submission', 'https://www.life.edu/news/'),
      createData('C-HOP', 'https://www.life.edu/about-pages/basic-information/public-clinics/'),
      createData('CC-HOP', 'https://www.life.edu/campus-life-pages/health-services/'),
      createData('Lasting Purpose', 'https://www.life.edu/standards-of-lasting-purpose/'),
      createData('Mobile App', 'http://www.past.life.edu/app/'),
      createData('Credit Card Privacy/Security Policy', 'http://www.past.life.edu/app/'),
      createData('Office of Diversity, Equity & Inclusion', 'https://www.life.edu/about-pages/office-of-diversity-equity-inclusion/')
    ];

    const studentResources = [
      createData('CARE', 'https://www.life.edu/campus-life-pages/care/'),
      createData('Career Services', 'https://www.life.edu/campus-life-pages/career-services/'),
      createData('Financial Aid', 'https://www.life.edu/admissions-pages/financial-aid/'),
      createData('Student Affairs', 'https://www.life.edu/campus-life-pages/welcome-from-student-affairs/'),
      createData('Student Success Center', 'https://www.life.edu/campus-life-pages/student-success-center/'),
      createData('Student Accounts', 'https://www.life.edu/admissions-pages/student-accounts/'),
      createData('Registrar', 'https://www.life.edu/academic-pages/registrar/forms/'),
      createData('Registrar Forms', 'https://www.life.edu/academic-pages/registrar/forms/'),
      createData('EagleNet', 'https://eaglenet.life.edu/Student'),
      createData('My Emergency Info', 'https://eaglenet.life.edu/Student/UserProfile/EmergencyInformation'),
      createData('Student Business Cards', 'https://www.life.edu/business-cards/'),
      createData('Orientation', 'https://www.life.edu/campus-life-pages/orientation/'),
      createData('LIFE Leadership Weekend', 'https://www.life.edu/admissions-pages/visit-life/life-leadership-weekend/'),
      createData('Thank a Teacher', 'https://www.life.edu/thank-a-teacher/'),
      createData('Student Work Study Opportunities', 'https://www.life.edu/about-pages/human-resources/employment-opportunities/')
    ];

    const adminResources = [
      createData('Student Handbook', 'https://life.edu/studenthandbook'),
      createData('Honor Code', 'https://www.life.edu/campus-life-pages/student-conduct/honor-code/'),
      createData('Student Conduct', 'https://www.life.edu/campus-life-pages/conflict-resolution-and-accountability/'),
      createData('Emergency Action Plan', 'https://www.life.edu/campus-life-pages/campus-safety/emergency-action-plan/'),
      createData('Sexual Misconduct', 'https://www.life.edu/campus-life-pages/student-conduct/sexual-misconduct/'),
      createData('Student of Concern', 'https://www.life.edu/campus-life-pages/behavioral-assessment-team/')
    ];


    return (
        <div className={classes.root}>
        {
            // Student Resources
            studentResources &&(
              <div className={classes.root}>
            <ExpansionPanel>
              <ExpansionPanelSummary
                  aria-controls="panel1a-content"
                  id="panel1a-header"
              >
                  <Typography variant="h5">Student</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <List>
                  {studentResources.map(n => (
                    <ListItem
                    divider
                    key={n.id}
                    component="a"
                    href={n.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                  <ListItemText
                    primary={n.name}
                  />
                  </ListItem>
                  ))}
                </List>
              </ExpansionPanelDetails>
              </ExpansionPanel>
          </div>
            )
          }
          {
            // Academic Resources
            academicResources &&(
              <div className={classes.root}>
            <ExpansionPanel>
              <ExpansionPanelSummary
                  aria-controls="panel1a-content"
                  id="panel1a-header"
              >
                  <Typography variant="h5">Academic Resources</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <List>
                  {academicResources.map(n => (
                    <ListItem
                    divider
                    key={n.id}
                    component="a"
                    href={n.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                  <ListItemText
                    primary={n.name}
                  />
                  </ListItem>
                  ))}
                </List>
              </ExpansionPanelDetails>
              </ExpansionPanel>
          </div>
            )
          }
          {
            // University Resources
            universityResources &&(
              <div className={classes.root}>
            <ExpansionPanel>
              <ExpansionPanelSummary
                  aria-controls="panel1a-content"
                  id="panel1a-header"
              >
                  <Typography variant="h5">University</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <List>
                  {universityResources.map(n => (
                    <ListItem
                    divider
                    key={n.id}
                    component="a"
                    href={n.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                  <ListItemText
                    primary={n.name}
                  />
                  </ListItem>
                  ))}
                </List>
              </ExpansionPanelDetails>
              </ExpansionPanel>
          </div>
            )
          }
          {
            // Campus Life Resources
            campusLifeResources &&(
              <div className={classes.root}>
            <ExpansionPanel>
              <ExpansionPanelSummary
                  aria-controls="panel1a-content"
                  id="panel1a-header"
              >
                  <Typography variant="h5">Campus Life</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <List>
                  {campusLifeResources.map(n => (
                    <ListItem
                    divider
                    key={n.id}
                    component="a"
                    href={n.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                  <ListItemText
                    primary={n.name}
                  />
                  </ListItem>
                  ))}
                </List>
              </ExpansionPanelDetails>
              </ExpansionPanel>
          </div>
            )
          }
          {
            // Course & Study
            courseStudyResources &&(
              <div className={classes.root}>
            <ExpansionPanel>
              <ExpansionPanelSummary
                  aria-controls="panel1a-content"
                  id="panel1a-header"
              >
                  <Typography variant="h5">Course & Study</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <List>
                  {courseStudyResources.map(n => (
                    <ListItem
                    divider
                    key={n.id}
                    component="a"
                    href={n.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                  <ListItemText
                    primary={n.name}
                  />
                  </ListItem>
                  ))}
                </List>
              </ExpansionPanelDetails>
              </ExpansionPanel>
          </div>
            )
          }
          {
            // Administrative Resources
            adminResources &&(
              <div className={classes.root}>
            <ExpansionPanel>
              <ExpansionPanelSummary
                  aria-controls="panel1a-content"
                  id="panel1a-header"
              >
                  <Typography variant="h5">Administrative</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <List>
                  {adminResources.map(n => (
                    <ListItem
                    divider
                    key={n.id}
                    component="a"
                    href={n.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                  <ListItemText
                    primary={n.name}
                  />
                  </ListItem>
                  ))}
                </List>
              </ExpansionPanelDetails>
              </ExpansionPanel>
          </div>
            )
          }

        </div>
    );
};

ResourceOnCamp.propTypes = {
    classes: PropTypes.object.isRequired
};
export default (withStyles(styles)(ResourceOnCamp));