import {connect} from 'react-redux';
import {SEARCH} from '../urls/routes';
import {DARK} from '../styles/colors';
import React, { Component } from 'react';
import PlText from '../components/PLText';
import {Text} from 'react-native-elements';
import {getAllJobs} from '../redux/actions';
import HeaderPage from '../components/HeaderPage';
import JobItemWide from '../components/JobItemWide';
import JobItemCircle from '../components/JobItemCircle';
import BottomPadding from '../components/BottomPadding';
import FullScreenLoader from '../components/FullScreenLoader';
import languageData from '../components/programming-icons/data';
import {isCloseToBottom, isCloseToTop} from '../service/helper';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';
import {Colors, GENERAL_STYLE_SETTING, Typography} from '../styles';
import FetchFailedComponent from '../components/FetchFailedComponent';
import {RefreshControl, ScrollView, StyleSheet, View} from 'react-native';

/**
 * Home Screen
 */
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            showScrollLoader: false,
        }
    }

    componentDidMount() {
        this.loadData();
        // StatusBar.setBackgroundColor(Colors.WHITE_LIGHT, true)
    }

    loadData = () => {
        this.props.getAllJobs(this.props.allJobs.page);
    };

    loadMoreData = () => {
        if (this.props.allJobs.canLoadMore) {
            this.setState({showScrollLoader: true});
            this.props.getAllJobs(this.props.allJobs.page + 1).then(() => {
                this.setState({showScrollLoader: false});
            });
        }
    };

    onRefresh = () => {
        this.setState({refreshing: true});
        this.props.getAllJobs(0, true).then(() => {
            this.setState({refreshing: false});
        });
    };

    render () {
        const { allJobs, loading, error, navigation } = this.props;
        const { refreshing, showScrollLoader } = this.state;

        if (loading && !showScrollLoader && !refreshing) {
            return (<FullScreenLoader />);
        }

        if (error) {
            return (<FetchFailedComponent onRetryClick={this.loadData} />)
        }

        const recentJobs = allJobs.data.slice(0, 10);
        const moreJobs = allJobs.data.slice(11, allJobs.data.length);

        return (
            <View style={styles.wrapper}>
                <FocusAwareStatusBar
                    animated
                    barStyle="dark-content"
                    backgroundColor={Colors.WHITE_LIGHT}
                />
                <HeaderPage
                    headerText={'Home'}
                    navigation={navigation}
                />
                <ScrollView
                    style={styles.container}
                    showsVerticalScrollIndicator={false}
                    onScroll={({nativeEvent})=>{
                        if (isCloseToTop(nativeEvent)) {
                            // do something
                        }

                        if (isCloseToBottom(nativeEvent)) {
                            // do something
                            if (allJobs.canLoadMore && !showScrollLoader) {
                                this.loadMoreData();
                            }
                        }
                    }}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={this.onRefresh}
                            colors={[Colors.PRIMARY, Colors.SECONDARY]}
                        />
                    }
                >
                    <View style={{marginBottom: 15}}>
                        <Text h3 style={{color: DARK}}>Find your dream job</Text>
                    </View>
                    <View style={{marginBottom: 15}}>
                        <Text style={styles.sectionTitle}>Recent jobs</Text>
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {recentJobs.map((job, index) => (
                            <JobItemCircle
                                key={index}
                                color={index % 2 !== 0 ? 'primary' : 'white'}
                                job={job}
                            />
                        ))}
                    </ScrollView>

                    <View style={[styles.sector]}>
                        <Text style={styles.sectionTitle}>Languages & Frameworks</Text>
                    </View>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {languageData.map(({name, component}, index) => (
                            <PlText
                                key={index}
                                name={name}
                                component={component}
                                onPress={() => navigation.navigate(SEARCH, {
                                    searchParams: {
                                        searched: name
                                    }
                                })}
                            />
                        ))}
                    </ScrollView>

                    <View style={[styles.sector, {marginTop: 30}]}>
                        <Text style={styles.sectionTitle}>More jobs</Text>
                    </View>

                    <ScrollView>
                        {moreJobs.map((job, index) => (
                            <JobItemWide
                                key={index}
                                // color={i % 2 !== 0 ? 'primary' : 'white'}
                                job={job}
                            />
                        ))}
                    </ScrollView>
                    <BottomPadding
                        showLoader={showScrollLoader}
                        backgroundColor={Colors.WHITE_LIGHT}
                    />
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        // backgroundColor: Colors.WHITE,
        ...GENERAL_STYLE_SETTING.SCREEN_PADDING,
    },
    wrapper: {
        flex: 1,
        backgroundColor: Colors.WHITE_LIGHT
    },
    sectionTitle: {
        ...Typography.FONT_BOLD,
        color: DARK,
        fontSize: 19,
    },
    mt_15: {
        marginVertical: 15,
    },
    mt_30: {
        marginVertical: 30,
    },
    sector: {
        marginTop: 30,
        marginBottom: 15
    }
});

const mapStateToProps = ({ allJobs }) => {
    return {
        allJobs: allJobs.member,
        error: allJobs.error,
        loading: allJobs.loading,
    };
};

export default connect(mapStateToProps, {getAllJobs})(Home);

/*const job = new Job({
    id: "6af16da1-8939-452c-b1b7-a79a4ed343d3",
    type: "Full Time",
    url: "https://jobs.github.com/positions/6af16da1-8939-452c-b1b7-a79a4ed343d3",
    created_at: "Tue Nov 03 15:17:45 UTC 2020",
    company: "Wonder",
    company_url: "https://www.wonder.me/",
    location: "Berlin ",
    title: "Senior Fullstack Engineer (f/m/d)",
    description: `<p>**We're looking for a coder to build the world's best online meeting app.</p> <p>Our mission is to give the world a space where groups can meet and talk.** Online meetings are transactional. This means that the human side of getting together gets lost, the side that lives off spontaneous chats, random encounters or unexpected conversations. We believe that’s at the core of ‘Zoom fatigue’ – not poor video connection or audio issues.</p> <p>Wonder is a virtual space where you can connect to others in a more spontaneous and fluid way. You walk around freely and choose what groups you want to join. It’s fun, creative, energizing and we believe it's the future of how people will get together online. You can check it out <strong><a href="https://www.wonder.me/">here</a></strong>.</p> <p>We’re a VC-backed team based in Kreuzberg, Berlin. If you want to learn more about us and what it's like to work at Wonder, have a look at this <a href="https://app.pitch.com/app/public/presentation/42d003b8-ae38-4b00-9181-428307bea501"><strong>presentation</strong></a> we created for you.</p> <p><strong>You will be part of our world-class product team</strong></p> <p>The mission of our product team is to define and execute the product vision. We ship major new features bi-weekly while making sure the product runs smoothly and without bugs.</p> <p><strong>As part of that team, you will:</strong></p> <ul> <li>Take ownership over parts of the code base.</li> <li>Help us reach difficult architectural decisions.</li> <li>Contribute your best knowledge and experience about technology, products and processes.</li> <li>Shape the product roadmap with us.</li> <li>Write code (duh).</li> </ul> <p><strong>Who we look for</strong></p> <p>Broadly speaking, we look for product people. Concretely, this means you:</p> <ul> <li>Know the latest state of technology and what we can do with it.</li> <li>Have a strong instinct for great products and what makes them great.</li> <li>Don’t need anyone to manage you and you motivate everyone around you.</li> <li>Love Wonder as much as we do.</li> <li>Have experience in JavaScript and one or more programming languages (e.g. C/C++, Python, Go, Java).</li> <li>Have experience across the full JS-based stack (both Node.JS and ReactJS).</li> <li>Ideally, you have experience with PostgreSQL, Kubernetes, WebRTC, Redis, CI/CD.</li> </ul> <p>We strongly encourage female and diverse candidates to apply. The role is based in Berlin, with flexible working arrangements, a generous equity package and competitive pay.</p> <p><strong>Why you should join us</strong></p> <ul> <li>Our work is technically challenging: we're using WebGL for rendering 3-dimensional rooms that expand when more users join. Now, we are starting to build our own WebRTC backend. It's incredibly challenging to enable real-time communication and data-flow between thousands of users.</li> <li>The future of work is a hot topic: remote communication will transform the way humans live and work. We want to become a core pillar of the online working stack. You'll tell your grandchildren that you were part of it.</li> <li>We have a world-class engineering team: we're a product-focused company and are assembling some of the smartest and and most talented developers and designers to build Wonder.</li> <li>It's an exciting stage: You will shape a product from the very beginning and see its fastest growth. If you want to build something, this is just the right time.</li> </ul> <p><strong>Interested?</strong></p> <p>Apply via the <a href="https://ltpx.nl/MEi67Qn"><strong>application form</strong></a>.</p> <p><em>Agency calls are not appreciated.</em><img src="https://camo.githubusercontent.com/361f5e74dcaabfc57e7a5f83f35c1c52086b2c89/68747470733a2f2f62636f6e74726f6c2e62726f636b6d657965722e6e6c2f747261636b2e7068703f6f7264657269643d313937353636"></p> `,
    how_to_apply: `<p><a href="https://ltpx.nl/ZPNYZGO">Click here to apply</a></p> `,
    company_logo: "https://jobs.github.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBc0dOIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--a9b1bf9c3a3a8319d8e511d046a7c818730d17f9/wonder.jpg"
});

const _jobs = [{"id":"a38eb19d-6451-420e-a1f7-f78979701a3a","type":"Full Time","url":"https://jobs.github.com/positions/a38eb19d-6451-420e-a1f7-f78979701a3a","created_at":"Fri Nov 20 16:54:27 UTC 2020","company":"Bright Cellars","company_url":"https://www.brightcellars.com","location":"Remote (USA)","title":"Full Stack Engineer (React, Python)","description":"\u003cp\u003e\u003ca href=\"https://www.brightcellars.com\"\u003eBright Cellars\u003c/a\u003e is the monthly wine subscription startup designed to help new wine drinkers discover and define their taste in wine! We curate wines from around the world with the goal of making wine fun, accessible and educational.\u003c/p\u003e\n\u003cp\u003e\u003cstrong\u003eHow Bright Cellars works\u003c/strong\u003e\u003c/p\u003e\n\u003cp\u003eOur members join Bright Cellars by taking a 7 question-quiz to share their taste preferences. The Bright Points learning algorithm evaluates these preferences to determine the best wine matches for each member’s taste. Each month, members receive four or six unique bottles in the mail, which they are then able to rate and provide personalized feedback on their profile. Similar to Netflix’s collaborative filtering algorithm, Bright Cellars’s algorithm uses this feedback to improve members’ monthly matches going forward.\u003c/p\u003e\n\u003cp\u003eThe ideal candidate is someone who thrives in a highly collaborative culture and adapts in a rapidly changing environment. To succeed in this role, you should be a self-starter who is constantly challenging yourself and your colleagues to grow.\u003c/p\u003e\n\u003cp\u003e\u003cstrong\u003eWhat You’ll be Working On:\u003c/strong\u003e\u003c/p\u003e\n\u003cul\u003e\n\u003cli\u003eCrafting a frontend dashboard using React, Redux, Highcharts, and any other JS libraries identified along the way that’ll help supercharge the product (e.g. D3.js)\u003c/li\u003e\n\u003cli\u003eDesigning and implementing a backend API using Python’s Flask framework\u003c/li\u003e\n\u003c/ul\u003e\n\u003cp\u003e\u003cstrong\u003eKey Technical Skills You’ll Bring:\u003c/strong\u003e\u003c/p\u003e\n\u003cul\u003e\n\u003cli\u003eJS, ReactJS, Redux\u003c/li\u003e\n\u003cli\u003eHTML, CSS, SASS / SCSS, Webpack\u003c/li\u003e\n\u003cli\u003ePython, Flask, unittest, flask_testing, MySQL, PostgreSQL\u003c/li\u003e\n\u003cli\u003eAWS ECS, RDS, Redshift\u003c/li\u003e\n\u003cli\u003eDocker, nginx\u003c/li\u003e\n\u003cli\u003eGit, Github, CircleCI\u003c/li\u003e\n\u003c/ul\u003e\n\u003cp\u003e\u003cstrong\u003eAdditional Skills:\u003c/strong\u003e\u003c/p\u003e\n\u003cul\u003e\n\u003cli\u003eData ETL experience, Apache airflow\u003c/li\u003e\n\u003cli\u003eExperience with advanced data visualization tool  (e.g. D3.js, observable, and vega)\u003c/li\u003e\n\u003cli\u003eExperience with designing and implementing REST APIs\u003c/li\u003e\n\u003c/ul\u003e\n\u003cp\u003e\u003cstrong\u003eExperience You’ll Bring:\u003c/strong\u003e\u003c/p\u003e\n\u003cul\u003e\n\u003cli\u003eBachelor's degree in Computer Science (or a related field) and 3+ years of relevant experience\u003c/li\u003e\n\u003cli\u003eProficient with HTML, CSS, React (or a similar frontend framework), Python, and MySQL\u003c/li\u003e\n\u003cli\u003eExperience with AWS and CI / CD processes\u003c/li\u003e\n\u003cli\u003eKnowledge of other programming languages a plus\u003c/li\u003e\n\u003cli\u003eWriting testable code\u003c/li\u003e\n\u003c/ul\u003e\n","how_to_apply":"\u003cp\u003ePlease apply via our careers site:\n\u003ca href=\"https://jobs.lever.co/brightcellars/d419c64c-6870-44b0-9e59-b2196d61b2cc?lever-source=Github\"\u003ehttps://jobs.lever.co/brightcellars/d419c64c-6870-44b0-9e59-b2196d61b2cc?lever-source=Github\u003c/a\u003e\u003c/p\u003e\n","company_logo":"https://jobs.github.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBdW1PIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--77702f2fe294ad121315a511e54096e3e20202f8/bright-cellars-badge-logo.png"},{"id":"68633180-4186-42f7-ab28-2b762a3bf794","type":"Full Time","url":"https://jobs.github.com/positions/68633180-4186-42f7-ab28-2b762a3bf794","created_at":"Thu Nov 19 09:57:50 UTC 2020","company":"Wonder","company_url":"https://www.wonder.me/","location":"Berlin, BE, DE","title":"Engineering Manager (f/m/d)","description":"\u003cp\u003eEngineering Manager (f/m/d)\u003c/p\u003e\n\u003cp\u003eOur mission is to give the world a space where groups can meet and talk**\nOnline meetings are transactional. This means that the human side of getting together gets lost, the side that lives off spontaneous chats, random encounters or unexpected conversations. We believe that's at the core of 'Zoom fatigue' - not poor video connection or audio issues.\u003c/p\u003e\n\u003cp\u003eWonder is a virtual space where you can connect to others in a more spontaneous and fluid way. You walk around freely and choose what groups you want to join. It's fun, creative, energizing and we believe it's the future of how people will get together online. You can check it out \u003ca href=\"https://www.wonder.me/r?id=wonder-team-office\"\u003e\u003cstrong\u003ehere\u003c/strong\u003e\u003c/a\u003e\u003c/p\u003e\n\u003cp\u003eWe're a VC-backed team based in Kreuzberg, Berlin. If you want to learn more about us and what it's like to work at Wonder, have a look at this \u003ca href=\"https://app.pitch.com/app/public/presentation/79be9368-d12b-41a1-b2a3-fb3e9f50c420\"\u003e\u003cstrong\u003epresentation\u003c/strong\u003e\u003c/a\u003e we created for you.\u003c/p\u003e\n\u003cp\u003e\u003cstrong\u003eYou will be part of our world-class product team\u003c/strong\u003e\nThe mission of our product team is to define and execute the product vision. We ship major new features bi-weekly while making sure the product runs smoothly and without bugs. We're fast.\u003c/p\u003e\n\u003cp\u003e\u003cstrong\u003eAs part of that team, you will:\u003c/strong\u003e\u003c/p\u003e\n\u003cul\u003e\n\u003cli\u003eLead the technical development of the product.\u003c/li\u003e\n\u003cli\u003eOwn the ongoing refactoring process.\u003c/li\u003e\n\u003cli\u003eHelp developers grow and learn along technical and non-technical dimensions.\u003c/li\u003e\n\u003cli\u003eContribute your best knowledge and experience about technology, products, and processes.\u003c/li\u003e\n\u003cli\u003eShape the product roadmap with us.\u003c/li\u003e\n\u003cli\u003eWrite code (duh).\u003c/li\u003e\n\u003c/ul\u003e\n\u003cp\u003e\u003cstrong\u003eWho we look for\u003c/strong\u003e\nBroadly speaking, we look for product people. Concretely, this means you:\u003c/p\u003e\n\u003cul\u003e\n\u003cli\u003eHave experience in building an engaged and high-performance team.\u003c/li\u003e\n\u003cli\u003eYou are a strong communicator around hard concepts and have a pragmatic approach.\u003c/li\u003e\n\u003cli\u003eKnow the latest state of technology and what we can do with it.\u003c/li\u003e\n\u003cli\u003eHave a strong instinct for great products and what makes them great.\u003c/li\u003e\n\u003cli\u003eLove Wonder as much as we do.\u003c/li\u003e\n\u003cli\u003eExperience in JavaScript and one or more programming languages (e.g. C/C++, Python, Go, Java).\u003c/li\u003e\n\u003cli\u003eExperience across the full JS-based stack (both Node.JS and ReactJS).\u003c/li\u003e\n\u003cli\u003eIdeally, you have experience with PostgreSQL, Kubernetes, WebRTC, Redis, CI/CD.\u003c/li\u003e\n\u003c/ul\u003e\n\u003cp\u003eWe strongly encourage female and diverse candidates to apply. The role is based in Berlin, with flexible working arrangements, a generous equity package, and competitive pay.\u003c/p\u003e\n\u003cp\u003e\u003cstrong\u003eWhy you should join us\u003c/strong\u003e\u003c/p\u003e\n\u003cul\u003e\n\u003cli\u003eOur work is technically challenging: we're using WebGL for rendering 3-dimensional rooms that expand when more users join. Now, we are starting to build our own WebRTC backend. It's incredibly challenging to enable real-time communication and data-flow between thousands of user.\u003c/li\u003e\n\u003cli\u003eThe future of work is a hot topic: remote communication will transform the way humans live and work. We want to become a core pillar of the online working stack. You'll tell your grandchildren that you were part of it.\u003c/li\u003e\n\u003cli\u003eWe have a world-class engineering team: we're a product-focused company and are assembling some of the smartest and most talented developers and designers to build Wonder.\u003c/li\u003e\n\u003cli\u003eIt's an exciting stage: You will shape a product from the very beginning and see its fastest growth. If you want to build something, this is just the right time.\u003c/li\u003e\n\u003c/ul\u003e\n\u003cp\u003e\u003cstrong\u003eInterested?\u003c/strong\u003e\nApply via the online \u003ca href=\"https://ltpx.nl/jLQj7wM\"\u003e\u003cstrong\u003eapplication form\u003c/strong\u003e\u003c/a\u003e.\u003c/p\u003e\n\u003cp\u003e\u003cem\u003eAgency calls are not appreciated.\u003c/em\u003e\u003cimg src=\"https://camo.githubusercontent.com/043b19c9a2a9e79b91089ecb661e02dc67dbeeaa/68747470733a2f2f62636f6e74726f6c2e62726f636b6d657965722e6e6c2f747261636b2e7068703f6f7264657269643d323034333334\"\u003e\u003c/p\u003e\n","how_to_apply":"\u003cp\u003e\u003ca href=\"https://ltpx.nl/8k8r075\"\u003eClick here to apply\u003c/a\u003e\u003c/p\u003e\n","company_logo":"https://jobs.github.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBdGFPIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--dcf8ec40e54f148e3cc0c98858553486f016ec36/wonder.jpg"},{"id":"35653573-d7f2-4489-94ea-ce446ecdf465","type":"Full Time","url":"https://jobs.github.com/positions/35653573-d7f2-4489-94ea-ce446ecdf465","created_at":"Mon Nov 16 13:48:54 UTC 2020","company":"Localist","company_url":"https://www.localist.com","location":"Remote","title":"Full Stack Ruby Developer","description":"\u003ch1\u003eDescription\u003c/h1\u003e\n\u003cp\u003eHumans are born for connection\u003c/p\u003e\n\u003cp\u003eLocalist is \u003cstrong\u003ebuilt to connect\u003c/strong\u003e\u003c/p\u003e\n\u003cp\u003eLocalist is a first of its kind community event platform for brands. Our mission is to help organizations leverage the power of events to spark ideas and spur movements. Our team thinks big, dreams big and delivers big. This is an excellent opportunity to join a high energy company with a dynamic team culture, at just the right time.\u003c/p\u003e\n\u003cp\u003etime.\u003c/p\u003e\n\u003ch2\u003eWhat you’ll do:\u003c/h2\u003e\n\u003cul\u003e\n\u003cli\u003eLead contributions to Localist, our flagship event CMS. Localist is a large Rails app that requires fluency in Javascript and web technologies: Ruby, Rails, ReactJS, HTML, CSS, MySQL.\u003c/li\u003e\n\u003cli\u003eShip simple, approachable, performant, testable code.\u003c/li\u003e\n\u003cli\u003eCommunicate your recommended solutions and work to balance constraints in the short-term to reach your vision for the user in the long-term.\u003c/li\u003e\n\u003cli\u003eFacilitate multiple types of research, identify customer pain points, and ensure usability of new designs.\u003c/li\u003e\n\u003cli\u003eCollaborate with the head of product to ensure consistency across products, embrace our UX standards, best practices, styles, patterns, and guidelines as well as contribute to our design system.\u003c/li\u003e\n\u003cli\u003eFacilitate and make informed technical decisions that drive the long term vision of connecting communities through events.\u003c/li\u003e\n\u003cli\u003eBuild workflow tools that enable our customers and event admins to publish beautiful event content faster and easier.\u003c/li\u003e\n\u003cli\u003eSolve complex architecture problems in an extensible, maintainable way. Brings clarity to complex technical problems across the organization.\u003c/li\u003e\n\u003cli\u003eWork closely on new features with others on the product team.\u003c/li\u003e\n\u003cli\u003eMentor your fellow product team members, participating in code reviews and working hand-in-hand with other developers.\u003c/li\u003e\n\u003c/ul\u003e\n\u003ch2\u003eRequirements\u003c/h2\u003e\n\u003cul\u003e\n\u003cli\u003e5+ years of experience developing user interfaces for large scale applications, utilizing Ruby, Rails, ReactJS, HTML, CSS, MySQL\u003c/li\u003e\n\u003cli\u003eAble to write approachable, performant code with comprehensive tests and thorough documentation.\u003c/li\u003e\n\u003cli\u003eLove to make your customers and colleagues jobs easier through automation.\u003c/li\u003e\n\u003cli\u003eKeep the big picture in mind, and strive to solve the root problem.\u003c/li\u003e\n\u003cli\u003eDeep understanding of \"designing for grandma,\" employing best-practice UX patterns, simplifying complex problems that require the least amount of UI possible.\u003c/li\u003e\n\u003cli\u003eExperience developing a product from concept to launch (if you have public examples of existing products, that’s a huge plus).\u003c/li\u003e\n\u003cli\u003eExperience collaborating with product managers, designers, and engineers.\u003c/li\u003e\n\u003cli\u003eExperience developing user interfaces using a client-side technology such as React and Redux.\u003c/li\u003e\n\u003cli\u003eProficiency and ability to mentor others in web technologies.\u003c/li\u003e\n\u003cli\u003eExperience in authoring UI for single page applications that meet WCAG 2.0 AA web accessibility standards to support customers who use assistive technologies.\u003c/li\u003e\n\u003cli\u003eExpertise in design patterns, unit tests, and version control systems, especially git.\u003c/li\u003e\n\u003cli\u003eSolid experience implementing features from style guides and user stories.\u003c/li\u003e\n\u003cli\u003eStrong written and verbal communication skills.\u003c/li\u003e\n\u003c/ul\u003e\n\u003ch2\u003eBenefits\u003c/h2\u003e\n\u003cul\u003e\n\u003cli\u003eCompetitive wages and flexible schedules\u003c/li\u003e\n\u003cli\u003eGenerous benefits package including:\u003c/li\u003e\n\u003cli\u003e100% paid medical, dental, vision\u003c/li\u003e\n\u003cli\u003e401(k) with company match\u003c/li\u003e\n\u003cli\u003eLife insurance\u003c/li\u003e\n\u003cli\u003eLong/short-term disability insurance\u003c/li\u003e\n\u003cli\u003e21 days PTO\u003c/li\u003e\n\u003cli\u003e4 paid days per year to volunteer for a not-for-profit of your choice\u003c/li\u003e\n\u003c/ul\u003e\n","how_to_apply":"\u003cp\u003eApply at \u003ca href=\"https://apply.workable.com/localist/j/F658FD35BE/\"\u003ehttps://apply.workable.com/localist/j/F658FD35BE/\u003c/a\u003e\u003c/p\u003e\n","company_logo":"https://jobs.github.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBcktPIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--a432bd0282ef2a2b2899e84d03e53c31cb31f02e/localist-logo(1).png"},{"id":"4926de97-addf-4f0e-afde-44b83dad5d73","type":"Full Time","url":"https://jobs.github.com/positions/4926de97-addf-4f0e-afde-44b83dad5d73","created_at":"Sun Nov 08 23:03:35 UTC 2020","company":"ResoluteAI","company_url":"https://www.resolute.ai","location":"New York City","title":"Full Stack Engineer","description":"\u003cp\u003eResoluteAI is a fast-growth data aggregation and intelligent search startup, with a mission to enable scientifically driven organizations to make their next big discovery. Our tools allow our clients to find relevant results in an efficient manner, across patents, clinical trials, publications, drug and medical device datasets, and within their own internal corporate documents (enterprise search). We accomplish this through our proprietary machine learning algorithms. We are proud to count amongst our clients two of the top four (and five of the top twelve) global pharmaceutical firms by market cap.\u003c/p\u003e\n\u003cp\u003eWe are looking for full-stack developers to help build out our capabilities as we continue to grow.\u003c/p\u003e\n\u003cp\u003eDuties and Responsibilities:\u003c/p\u003e\n\u003cul\u003e\n\u003cli\u003eIntegrate public domain datasets into the search platform using our ETL framework.\u003c/li\u003e\n\u003cli\u003eDesign and implement new features that integrate and highlight the various public datasets.\u003c/li\u003e\n\u003cli\u003eWork with various external enterprise search APIs to ingest and enrich clients’ documents for search.\u003c/li\u003e\n\u003cli\u003eAssist machine learning engineers with deploying their models into production\u003c/li\u003e\n\u003cli\u003eCommunicate directly with clients on requirements, progress, and setting expectations.\u003c/li\u003e\n\u003cli\u003eAssist with bug fixes and writing of regression and unit tests.\u003c/li\u003e\n\u003c/ul\u003e\n\u003cp\u003eEducation and Previous Experience:\u003c/p\u003e\n\u003cul\u003e\n\u003cli\u003eBachelor’s degree in Computer Science, or equivalent experience in software development\u003c/li\u003e\n\u003cli\u003e5+ years in related experience and training\u003c/li\u003e\n\u003c/ul\u003e\n\u003cp\u003eKnowledge and Skills:\u003c/p\u003e\n\u003cul\u003e\n\u003cli\u003eStrongly skilled in Python. Experience with SQL and an ORM (e.g. sqlalchemy).\u003c/li\u003e\n\u003cli\u003eCan hold your own on the frontend UI in ReactJS\u003c/li\u003e\n\u003cli\u003eComfortable working with Docker and in a Linux environment\u003c/li\u003e\n\u003cli\u003eExperience with ElasticSearch – very strong plus\u003c/li\u003e\n\u003cli\u003eExperience with Elastic Map Reduce or Spark is a plus\u003c/li\u003e\n\u003cli\u003eKnowledge of networking, especially AWS services and infrastructure is a plus\u003c/li\u003e\n\u003cli\u003eMust have a self-starter mentality and willingness to dig deep into the code.\u003c/li\u003e\n\u003cli\u003eAbility to own your work and adopt an outcomes-based approach, in a fast paced environment of quickly evolving requirements.\u003c/li\u003e\n\u003c/ul\u003e\n\u003cp\u003eWhat we offer:\u003c/p\u003e\n\u003cul\u003e\n\u003cli\u003eCompetitive salary\u003c/li\u003e\n\u003cli\u003eFull benefits (Medical, Dental, Vision, FSA, Commuter benefit)\u003c/li\u003e\n\u003cli\u003e401(k) and matching\u003c/li\u003e\n\u003cli\u003eEquity in the company\u003c/li\u003e\n\u003cli\u003eUnlimited Paid Time Off\u003c/li\u003e\n\u003cli\u003eFlexible Work Environment\u003c/li\u003e\n\u003c/ul\u003e\n","how_to_apply":"\u003cp\u003ePlease apply at the following website:\n\u003ca href=\"https://resoluteai.applytojob.com/apply/qEBd0FBx4a/Full-Stack-Developer?source=Github\"\u003ehttps://resoluteai.applytojob.com/apply/qEBd0FBx4a/Full-Stack-Developer?source=Github\u003c/a\u003e\u003c/p\u003e\n","company_logo":"https://jobs.github.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaVNPIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--31ebcafc76d4d80670dd7fdb6e385ec835429a19/Resolute-logo-dark-250px.png"},{"id":"6af16da1-8939-452c-b1b7-a79a4ed343d3","type":"Full Time","url":"https://jobs.github.com/positions/6af16da1-8939-452c-b1b7-a79a4ed343d3","created_at":"Tue Nov 03 15:17:45 UTC 2020","company":"Wonder","company_url":"https://www.wonder.me/","location":"Berlin ","title":"Senior Fullstack Engineer (f/m/d)","description":"\u003cp\u003e**We're looking for a coder to build the world's best online meeting app.\u003c/p\u003e\n\u003cp\u003eOur mission is to give the world a space where groups can meet and talk.**\nOnline meetings are transactional. This means that the human side of getting together gets lost, the side that lives off spontaneous chats, random encounters or unexpected conversations. We believe that’s at the core of ‘Zoom fatigue’ – not poor video connection or audio issues.\u003c/p\u003e\n\u003cp\u003eWonder is a virtual space where you can connect to others in a more spontaneous and fluid way. You walk around freely and choose what groups you want to join. It’s fun, creative, energizing and we believe it's the future of how people will get together online. You can check it out \u003cstrong\u003e\u003ca href=\"https://www.wonder.me/\"\u003ehere\u003c/a\u003e\u003c/strong\u003e.\u003c/p\u003e\n\u003cp\u003eWe’re a VC-backed team based in Kreuzberg, Berlin. If you want to learn more about us and what it's like to work at Wonder, have a look at this \u003ca href=\"https://app.pitch.com/app/public/presentation/42d003b8-ae38-4b00-9181-428307bea501\"\u003e\u003cstrong\u003epresentation\u003c/strong\u003e\u003c/a\u003e we created for you.\u003c/p\u003e\n\u003cp\u003e\u003cstrong\u003eYou will be part of our world-class product team\u003c/strong\u003e\u003c/p\u003e\n\u003cp\u003eThe mission of our product team is to define and execute the product vision. We ship major new features bi-weekly while making sure the product runs smoothly and without bugs.\u003c/p\u003e\n\u003cp\u003e\u003cstrong\u003eAs part of that team, you will:\u003c/strong\u003e\u003c/p\u003e\n\u003cul\u003e\n\u003cli\u003eTake ownership over parts of the code base.\u003c/li\u003e\n\u003cli\u003eHelp us reach difficult architectural decisions.\u003c/li\u003e\n\u003cli\u003eContribute your best knowledge and experience about technology, products and processes.\u003c/li\u003e\n\u003cli\u003eShape the product roadmap with us.\u003c/li\u003e\n\u003cli\u003eWrite code (duh).\u003c/li\u003e\n\u003c/ul\u003e\n\u003cp\u003e\u003cstrong\u003eWho we look for\u003c/strong\u003e\u003c/p\u003e\n\u003cp\u003eBroadly speaking, we look for product people. Concretely, this means you:\u003c/p\u003e\n\u003cul\u003e\n\u003cli\u003eKnow the latest state of technology and what we can do with it.\u003c/li\u003e\n\u003cli\u003eHave a strong instinct for great products and what makes them great.\u003c/li\u003e\n\u003cli\u003eDon’t need anyone to manage you and you motivate everyone around you.\u003c/li\u003e\n\u003cli\u003eLove Wonder as much as we do.\u003c/li\u003e\n\u003cli\u003eHave experience in JavaScript and one or more programming languages (e.g. C/C++, Python, Go, Java).\u003c/li\u003e\n\u003cli\u003eHave experience across the full JS-based stack (both Node.JS and ReactJS).\u003c/li\u003e\n\u003cli\u003eIdeally, you have experience with PostgreSQL, Kubernetes, WebRTC, Redis, CI/CD.\u003c/li\u003e\n\u003c/ul\u003e\n\u003cp\u003eWe strongly encourage female and diverse candidates to apply. The role is based in Berlin, with flexible working arrangements, a generous equity package and competitive pay.\u003c/p\u003e\n\u003cp\u003e\u003cstrong\u003eWhy you should join us\u003c/strong\u003e\u003c/p\u003e\n\u003cul\u003e\n\u003cli\u003eOur work is technically challenging: we're using WebGL for rendering 3-dimensional rooms that expand when more users join. Now, we are starting to build our own WebRTC backend. It's incredibly challenging to enable real-time communication and data-flow between thousands of users.\u003c/li\u003e\n\u003cli\u003eThe future of work is a hot topic: remote communication will transform the way humans live and work. We want to become a core pillar of the online working stack. You'll tell your grandchildren that you were part of it.\u003c/li\u003e\n\u003cli\u003eWe have a world-class engineering team: we're a product-focused company and are assembling some of the smartest and and most talented developers and designers to build Wonder.\u003c/li\u003e\n\u003cli\u003eIt's an exciting stage: You will shape a product from the very beginning and see its fastest growth. If you want to build something, this is just the right time.\u003c/li\u003e\n\u003c/ul\u003e\n\u003cp\u003e\u003cstrong\u003eInterested?\u003c/strong\u003e\u003c/p\u003e\n\u003cp\u003eApply via the \u003ca href=\"https://ltpx.nl/MEi67Qn\"\u003e\u003cstrong\u003eapplication form\u003c/strong\u003e\u003c/a\u003e.\u003c/p\u003e\n\u003cp\u003e\u003cem\u003eAgency calls are not appreciated.\u003c/em\u003e\u003cimg src=\"https://camo.githubusercontent.com/361f5e74dcaabfc57e7a5f83f35c1c52086b2c89/68747470733a2f2f62636f6e74726f6c2e62726f636b6d657965722e6e6c2f747261636b2e7068703f6f7264657269643d313937353636\"\u003e\u003c/p\u003e\n","how_to_apply":"\u003cp\u003e\u003ca href=\"https://ltpx.nl/ZPNYZGO\"\u003eClick here to apply\u003c/a\u003e\u003c/p\u003e\n","company_logo":"https://jobs.github.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBc0dOIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--a9b1bf9c3a3a8319d8e511d046a7c818730d17f9/wonder.jpg"},{"id":"740dc327-a38f-4e49-86a4-106f9d50aef8","type":"Full Time","url":"https://jobs.github.com/positions/740dc327-a38f-4e49-86a4-106f9d50aef8","created_at":"Wed Oct 28 13:16:13 UTC 2020","company":"Trakken Web Services GmbH","company_url":null,"location":"Hamburg","title":"DEVELOPER - JAVASCRIPT","description":"\u003cp\u003eDEINE AUFGABEN BEI UNS:\u003c/p\u003e\n\u003cul\u003e\n\u003cli\u003eIndividulles erstellen von JavaScript (ES5+) Injections\u003c/li\u003e\n\u003cli\u003eReverse Engeneering von Angular, ReactJS, VueJS\u003c/li\u003e\n\u003cli\u003eBackendentwicklung mit NodeJS\u003c/li\u003e\n\u003cli\u003eErstellen und bearbeiten von Datensätzen in JSON-Format\u003c/li\u003e\n\u003cli\u003eBetreuen und erstellen von Web-Hosting mit Google Cloud \u0026amp; AWS\u003c/li\u003e\n\u003cli\u003eEntwicklung mit Gulp \u0026amp; Webpack\u003c/li\u003e\n\u003cli\u003eEntwicklung mit (S)CSS und Animationen\u003c/li\u003e\n\u003cli\u003eArbeiten mit Sketch, Adobe Photoshop\u003c/li\u003e\n\u003cli\u003eBeratung und technische Prüfungen neuer Projekte\u003c/li\u003e\n\u003c/ul\u003e\n\u003cp\u003eUNSERE ANFORDERUNGEN AN DICH:\u003c/p\u003e\n\u003cul\u003e\n\u003cli\u003eUmgang mit NodeJS, Angular, ReactJS, VueJS, jQuery, ES5+\u003c/li\u003e\n\u003cli\u003eUmsetzung von Responsive Designs\u003c/li\u003e\n\u003cli\u003eHosting sollte keine Unbekannte sein\u003c/li\u003e\n\u003cli\u003eKenntnisse der Optimierung für verschiedene Browser\u003c/li\u003e\n\u003cli\u003eUmgang mit Gitlab\u003c/li\u003e\n\u003cli\u003eUX/UI Verständnis\u003c/li\u003e\n\u003cli\u003eKreativität\u003c/li\u003e\n\u003c/ul\u003e\n\u003cp\u003eWIR BIETEN DIR:\u003c/p\u003e\n\u003cul\u003e\n\u003cli\u003eVerwirklichung: Bring Dein Potential mit, bei uns hast Du den Raum zur Entfaltung\u003c/li\u003e\n\u003cli\u003eAbwechslung: Bei Trakken arbeiten bedeutet alles andere als ein 08/15 JobScreen\u003c/li\u003e\n\u003cli\u003eAuswirkung: Mit Technologie, Skills und ständiger Weiterentwicklung haben wir Einfluss auf den Trend der Branche Aufstieg: Zeig uns was du kannst und wir belohnen Dich mit Karrieremöglichkeiten in In- und Ausland\u003c/li\u003e\n\u003cli\u003eSubkultur und Grenzgänger: Das, was die Kollegen bei Trakken vereint, ist ihr Streben danach, dass Durchschnitt nicht genug ist. Werde Teil eines Teams, welches sich gegenseitig hilft besser zu werden\u003c/li\u003e\n\u003cli\u003eTeamstärke: Die Trakken Family ist keine leere Worthülse. Unsere Kollegen arbeiten auch international auf freundschaftlicher Basis miteinander\u003c/li\u003e\n\u003c/ul\u003e\n","how_to_apply":"\u003cp\u003eEmail your resume to \u003ca href=\"mailto:bewerbung@trakken.de\"\u003ebewerbung@trakken.de\u003c/a\u003e\u003c/p\u003e\n","company_logo":"https://jobs.github.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaWVOIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--0692c76156e77aa36140c3b8154b2ba55a80b3cc/Trakken_web_services_logo_2_72dpi%20(3).jpg"}]
.map(j => new Job(j));*/
