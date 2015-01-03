var express = require('express');
var router = express.Router();
var fs = require('fs');


/* GET home page. */
router.get('/', function(req, res, next) {
	_getEvents(function(err, events){
		if (err) return next(err);
		var blogEntries = [];
		blogEntries[0] = {id:1, title: 'USSA Race 12/21/14 cancelled', posted_on: '12/17/2014', content: 'Hi to All,<br/><br/>In order to have a solid snow base for a slalom race on Sunday with eighty competitors, the Bootlegger trail would need more snow coverage.  But we will start on Saturday with the ski team clinics at 8:45 am.  The Future Stars will meet at 10 am at the meeting place in front of the ski lodge.<br/><br/>Think Snow,<br/>The Coaches'}
		blogEntries[1] = {id:1, title: 'Equipment Rule Changes', posted_on: '10/10/2014', content: 'As FIS introduced new rules for U14 and U16 racers for 2014/15, a proposal was passed at the 2014 USSA Congress in the Alpine Sports Committee to implement ski dimension regulations down to the U14 level of USSA ski racing. These standards were created in cooperation with representatives from the ski industry to progress athletes gradually from U14 to U18 standards, and were distributed widely in June 2014.<br/><br/>Unfortunately, at this point in time, the recommended skis are not widely available for purchase everywhere across the country. Given the difficulty some athletes are having acquiring skis that meet the new standards, a recommendation has been made to the Alpine Sports Committee to amend the equipment rules to the following:<br/><br/><b>U16 and U14 athletes may use the equipment of their choice in 2014/15, EXCEPT for athletes competing at the U16 National Championship and Assessment Project, where the standards in the matrix must be adhered to. In addition, any athletes participating in NTG projects in Europe will also be expected to use skis conforming to these standards.</b><br/><br/>The alpine equipment guide may be viewed here: http://alpine.usskiteam.com/alpine- programs/athletes/rules<br/><br/>It is the firm conviction of the coaching staff of the U.S. Ski Team and USSA development staff that athletes wishing to pursue ski racing at the FIS level should follow the guidelines passed in May.'}
		blogEntries[2] = {id:1, title: 'Ski Racing Families', posted_on: '9/30/2014', content: 'Hey Race Families,<br/><br/>The nights are getting cooler and the fall time has nestled in.  Our ski area employees are hard working to finish the snowmaking addition on Redeye.<br/><br/>Attached you will find the forms for the Future Star and Ski Team and the tentative SARA race schedule, which will be finalized at the SARA meeting on November 8th at Bryce Resort.<br/><br/>Current USSA members who have not renewed their membership yet, please renew it before October to avoid a late fee.<br/><br/>Thanks,<br/><br/>Horst & Ryan'}
		var params = {title: 'Express', events: events, blogEntries: blogEntries };
		_renderPageWithRandomBackground(res, 'index', params, next);
	});		
});

router.get('/overview', function(req, res, next) {
	_getOverviewFAQS(function(err, faqs){
		if (err) return next(err);
		var params = {title: 'Express', faqs: faqs };
		_renderPageWithRandomBackground(res, 'overview', params, next);
	});
});

router.get('/racing', function(req, res, next) {
	_getRacingFAQS(function(err, faqs){
		if (err) return next(err);
		var params = {title: 'Express', faqs: faqs };
		_renderPageWithRandomBackground(res, 'racing', params, next);
	});
});

router.get('/equipment', function(req, res, next) {
	_getEquipmentFAQS(function(err, faqs){
		if (err) return next(err);
		var params = {title: 'Express', faqs: faqs };
		_renderPageWithRandomBackground(res, 'equipment', params, next);
	});
});


router.get('/calendar', function(req, res, next){
	var params = {};
	_renderPageWithRandomBackground(res, 'calendar', params, next);
});

router.get('/photos', function(req, res, next){
	var params = {title: 'Express' };
	_renderPageWithRandomBackground(res, 'photos', params, next);
});

router.get('/roster', function(req, res, next){
	var members = [];
	members.push({id:1, name: 'Lawson Calhoon', avatar:'/images/skis.jpg'});
	members.push({id:1, name: 'Annika Dellinger', avatar:'/images/roster/annika.jpg'});
	members.push({id:1, name: 'Eli Dellinger', avatar:'/images/roster/eli.jpg'});
	members.push({id:1, name: 'Emma Harrison', avatar:'/images/roster/emma.jpg'});
	members.push({id:1, name: 'Tyler Jensen', avatar:'/images/roster/tylerjensen.jpg'});
	members.push({id:1, name: 'Liam Kelly', avatar:'/images/skis.jpg'});
	members.push({id:1, name: 'Shane Kelly', avatar:'/images/skis.jpg'});
	members.push({id:1, name: 'Bryce Liquerman', avatar:'/images/roster/bryce.jpg'});
	members.push({id:1, name: 'Andrew McAlister', avatar:'/images/roster/andrew.jpg'});
	members.push({id:1, name: 'Nina Palmer', avatar:'/images/skis.jpg'});
	members.push({id:1, name: 'Robert Palmer', avatar:'/images/skis.jpg'});
	members.push({id:1, name: 'Jake Rowen', avatar:'/images/roster/jake.jpg'});
	members.push({id:1, name: 'Bradley Wacker', avatar:'/images/skis.jpg'});
	members.push({id:1, name: 'Tristan Williams', avatar:'/images/skis.jpg'});
	members.push({id:1, name: 'Baylen Williams', avatar:'/images/skis.jpg'});
	members.push({id:1, name: 'Doug Grayson', avatar:'/images/skis.jpg'});
	members.push({id:1, name: 'Kathy Hurdcarrillo', avatar:'/images/roster/kathy.jpg'});
	members.push({id:1, name: 'Horst Locher', avatar:'/images/skis.jpg'});

	var params = {title: 'Express', members: members};
	_renderPageWithRandomBackground(res, 'roster', params, next);
});

_getEvents = function(cb){
	var events = [];
	events[0] = {id:1, event_type:1, occurs_on: '1/4/2015', title: 'Massanutten GS', event_sub_type: 'GS', event_class: 'U14 and below'}
	events[1] = {id:1, event_type:1, occurs_on: '1/10/2015', title: 'Bryce GS', event_sub_type: 'GS', event_class: 'All/Separate'}
	events[2] = {id:1, event_type:1, occurs_on: '1/11/2015', title: 'Bryce SL', event_sub_type: 'SL', event_class: 'All/Separate'}
	events[3] = {id:1, event_type:1, occurs_on: '1/24/2015', title: 'Timberline SL', event_sub_type: 'SL', event_class: 'U14 and below'}
	events[4] = {id:1, event_type:1, occurs_on: '1/25/2015', title: 'Timberline GS', event_sub_type: 'GS', event_class: 'U14 and below'}
	events[5] = {id:1, event_type:1, occurs_on: '1/24/2015', title: 'Beech SL', event_sub_type: 'SL', event_class: 'All/Separate', ussa_points: true}
	events[6] = {id:1, event_type:1, occurs_on: '1/25/2015', title: 'Sugar GS', event_sub_type: 'GS', event_class: 'All/Separate', ussa_points: true}
	events[7] = {id:1, event_type:1, occurs_on: '1/31/2015', title: 'Snowshoe GS', event_sub_type: 'GS', event_class: 'U16-21/M', ussa_points: true}
	events[8] = {id:1, event_type:1, occurs_on: '2/1/2015', title: 'Snowshoe SL', event_sub_type: 'SL', event_class: 'U16-21/M', ussa_points: true}
	events[9] = {id:1, event_type:1, occurs_on: '2/7/2015', title: 'Wintergreen GS', event_sub_type: 'GS', event_class: 'All/Separate', ussa_points: true}
	events[10] = {id:1, event_type:1, occurs_on: '2/8/2015', title: 'Wintergreen SL', event_sub_type: 'SL', event_class: 'All/Separate', ussa_points: true}
	events[11] = {id:1, event_type:1, occurs_on: '2/21/2015', title: 'Sugar SL', event_sub_type: 'SL', event_class: 'U16-21 Champs', ussa_points: true}
	events[12] = {id:1, event_type:1, occurs_on: '2/22/2015', title: 'Sugar GS', event_sub_type: 'GS', event_class: 'U16-21 Champs', ussa_points: true}
	events[13] = {id:1, event_type:1, occurs_on: '2/21/2015', title: 'Snowshoe GS', event_sub_type: 'GS', event_class: 'U14 and below', ussa_points: false}
	events[14] = {id:1, event_type:1, occurs_on: '2/22/2015', title: 'Snowshoe SL', event_sub_type: 'SL', event_class: 'U14 and belows', ussa_points: false}
	events[15] = {id:1, event_type:1, occurs_on: '2/28/2015', title: 'Massanuttn SL', event_sub_type: 'SL', event_class: 'U10-14 Champs', ussa_points: false}
	events[16] = {id:1, event_type:1, occurs_on: '3/1/2015', title: 'Massanutten GS', event_sub_type: 'GS', event_class: 'U10-14 Champs', ussa_points: false}

	return cb(null, events);
};

_getEquipmentFAQS = function(cb){
	var faqs = [];
	faqs.push({id: 1, question: 'What type of skis should I be using at my level?', answer: 'This should be discussed between you and your coaches. You may want to include Mom or Dad if they are footing the bill.'});
	faqs.push({id: 1, question: 'How do I get a cool Bryce Ski Team jacket?', answer: 'The Bryce Ski Jackets are available for rental to the Bryce Ski Team, Masters, and Coaches who are members of the "Friends of Bryce Ski Team" and are actively in good standing with their yearly membership dues paid. Jackets are available to registered racers ONLY.'});
	faqs.push({id: 1, question: 'How often should I wax my skis?', answer: 'In this region of the country, the snow is wet and heavy and can really wear on your skis. You may want to wax them at least weekly.'});
	faqs.push({id: 1, question: 'Should I wax my skis before a race?', answer: 'You should always make sure your skis are well maintained, including waxing and tuning.'});
	faqs.push({id: 1, question: 'How often should my skis be tuned?', answer: 'This really depends on how often you ski and the type of snow you ski on. Tuning once a month may be sufficient for most skiers'});
	faqs.push({id: 1, question: 'What should I wear on race day?', answer: 'Be prepared. Where an effective under-layer and lightweight clothing that will break the wind when racing. Dress in layers. Turtleneck shirts, sweaters, long underwear and footless tights work well as under layers. Avoid wearing cotton next to your skin because it will absorb sweat and snow and make you cold. Wool or acrylic socks are better than cotton athletic socks, but make sure the socks are long so they will extend up above your ski boot. Wear one thin pair of socks. Ski and snowboard boots are designed to be warm so thick socks will just be in the way. For pants, you will want a pair of waterproof shell pants over long underwear. You may not need as many layers of clothing as you think. On a sunny day, you may need only two layers – the waterproof outer layer and the turtleneck/long underwear first layer. But bring a middle layer (fleece or wool sweater) just in case. Where your Ski Jacket and then take it off before the beginning of the race.'});
	faqs.push({id: 1, question: 'Are shin guards required for SARA or NASTAR races?', answer: 'Shin guards are usually used by the older and more aggressive skiers and are not required.'});
	faqs.push({id: 1, question: 'Are helmets required for SARA or NASTAR races?', answer: 'Helmets ARE required for all SARA races, however they are not required for NASTAR races. They are HIGHLY recommended.'});
	faqs.push({id: 1, question: 'Are chin guards required for SARA or NASTAR races?', answer: 'Chin guards are usually used by the older and more aggressive skiers and are not required. Chin guards MUST be removed for GS races.'});
	faqs.push({id: 1, question: 'Should I wear a race suit on race day?', answer: 'That is up to you. They are not required and some racers find them uncomfortable. Try a non-padded suit if you decide to wear one.'});
	faqs.push({id: 1, question: 'Should I wear my Bryce Ski jacket on race day?', answer: 'You should wear your Jacket to all events in which you are representing Bryce Resort. The Jacket provides a sense of unity and allows the Bryce Ski Team to be easily noticeable to others who may be looking for the group on race day. The Jacket can be taken off before the race and will usually be brought down with others by your Ski coach.'});
 	return cb(null, faqs);
};

_getOverviewFAQS = function(cb){
	var faqs = [];
	faqs.push({id: 1, question: 'What is the Bryce Ski Team', answer:'The Bryce Resort Ski Racing Club is a United States Ski Association (USSA) member club whose objectives are to focus on fun and build strong fundamental skills for junior and adult racers.'});

	faqs.push({id: 1, question: 'What is FOBST?', answer: 'FOBST stands for Friends of the Bryce Ski Team. The purpose of the FOBST shall be to promote recreational ski racing clinics and competitions for the benefit of youth and adult skiers at Bryce Mountain Resort, Basye, Virginia. <br/>The mission of the FOBST is to foster the principles of good sportsmanship, competitive spirit, tolerance and friendship for the participating skiers at Bryce Mountain.'});
	faqs.push({id: 1, question: 'What are the are the ages for being part of the team?', answer: 'TALK TO DOUG!!!'});
	faqs.push({id: 1, question: 'Are the Future Stars part of the Bryce Ski Team?', answer: 'The Future Stars are part of the Bryce Resort Racing Club, which includes the Bryce Ski Team and Master Team. The Junior Superstars do NOT race.'});	
	faqs.push({id: 1, question: 'What days are the Ski clinics scheduled for?', answer: 'The Ski Clinics usually begin in late December and run through the end of February. There is a clinic on Saturday and Sunday morning and during the week of Christmas.'});
	faqs.push({id: 1, question: 'What time do the clinics begin and how long do they last?', answer: 'The Bryce Ski Team clinic runs from 8:30am-11:30am and the Junior Rising Stars clinic runs from 10:00am - 11:30am and 1:30pm - 3:00.'});
	faqs.push({id: 1, question: 'When should I renew my USSA and SARA memberships?', answer: 'TBD'});
	faqs.push({id: 1, question: 'What is the cost for new memberships or renewal?', answer: 'For all fees associated with USSA and SARA, please visit their web site for the current fee schedule.'});
 	return cb(null, faqs);
};


_getRacingFAQS = function(cb){
	var faqs = [];
	faqs.push({id: 1, question: 'What types of races can the kids participate in?', answer: 'There are several types of races that can be raced in during the season.  A great way to introduce first time racers is via NASTAR races that occur here at Bryce.  These races are open to anyone and are a great way to start experiencing racing here on our home mountain.  You can register within the ski school for $7 which will get you two runs.  You can learn more about NASTAR at <a href="http://www.nastar.com">http://www.naster.com</a>.  The next step up after NASTAR is SARA racing which provides competitive races against the other ski resorts in our conference (Beech, Massanutten, Snowshoe, Sugar, Timberline, and Wintergreen).'});
	faqs.push({id: 1, question: 'When and where do NASTAR races occur?', answer: 'NASTAR races occur most Saturday and Sunday afternoons and sometimes during the week during Christmas week.  All the NASTAR races will occur on Bootlegger.'});
	faqs.push({id: 1, question: 'When and where do SARA races occur?', answer: 'Bryce usually hosts a SARA race or two and there will be handful of away SARA races at our fellow resorts within SARA.  These races occur on weekends, usually first thing in the morning.'});
	faqs.push({id: 1, question: 'Can parents watch these races?', answer: 'Most definitely yes! For NASTAR and home SARA races you can walk up to the base of Bootlegger and watch from behind the fence at the race shack.  For away races your options are as follows:<ul><li>Beech - </li><li>Massanutten - </li><li>Snowshoe - </li><li>Sugar - </li><li>Timberline - </li><li>Wintergreen - </li></ul>'});
	faqs.push({id: 1, question: 'What do I need to do to sign up for NASTAR races?', answer: ''});
	faqs.push({id: 1, question: 'What do I need to do to sign up for SARA races?', answer: ''});
	faqs.push({id: 1, question: 'How do I find out race results?', answer: ''});
	faqs.push({id: 1, question: 'Where do we stay when we travel to other resorts for SARA races?', answer: ''});
	
	faqs.push({id: 1, question: 'What is course inspection?', answer: ''});
	faqs.push({id: 1, question: 'What happens if I miss course inspection?', answer: 'Try to avoid this at all costs, however if this does happen, please get together with your coach as soon as possible.'});
	faqs.push({id: 1, question: 'Can the Future Stars race in SARA races?', answer: 'Anyone who is a registered member of USSA and SARA and is current on their yearly dues may race in any USSA sanctioned race.'});
	faqs.push({id: 1, question: 'How do I qualify to be invited to the SARA championships?', answer: 'The list of requirements can be found on the SARA web site.'});
	faqs.push({id: 1, question: 'I registered for a SARA race, but now I cannot go. What should I do?', answer: 'You should notify the Ski Director and you Ski coaches as soon as you learn you can not compete in a registered race. Ski coaches are assigned to races based on a list of registered Ski Team members they receive from SARA. It is only courteous to notify the Ski Director when you cancel.'});
	faqs.push({id: 1, question: 'What does NASTAR National recommend about the number of gates set vs the course length?', answer: 'Each course is essentially a modified GS course with anywhere from 12 - 20 gates that racers must maneuver around. Gates are set with 18-20 meters of space between gates vertically and 4-8 meters of offset. NASTAR encourages resorts across the country to standardize their course(s) to have a par time of 23 seconds and set courses so that no course is within 5% of the cap time. The "cap time" is defined as the time it takes a pacesetter to tuck from the start to the finish of their course without going around gates and is the fastest possible time the venue will allow. It is important to remember that due to a number of variables at each resort (terrain, pitch, overall conditions, etc.), the look and feel of each race venue will vary according to the resort.'});
	faqs.push({id: 1, question: 'Where can I find the results for NASTAR at Bryce Resort?', answer: 'You can find that information on the Resorts Results Page at nastar.com.'});
	
	faqs.push({id: 1, question: 'How do you calculate your NASTAR handicap?', answer: 'Okay, first let us deal with the par time of the Pacesetter. You take their time divided by their handicap. The formula is Time/1.11=Par time (this example the Pacesetter is a 11 HC) Once you have the par time, it is time to calculate your HC off of the Par Time. Simply take your time and divide it by the Par Time. You will get a number like 1.135558. That would be a 13.56 HC. Your Time / Par time = HC<br/>OR<br/>You can subtract the Par Time from your Time, then divide the difference by the Par Time. (I believe you get the same number or very close to it, just no 1. in front of the result) Your Time - Par Time = result / Par time = HC. Take your Handicap and locate your age group listed in the NASTAR Handicap Chart to find your medal.'});
 
 	return cb(null, faqs);
};

_getBackgroundPic = function(cb){
	fs.readdir(__dirname + '/../public/images/backgrounds', function(err,files) {
		if (err) return cb(err, null);
		var randomNum = Math.floor(Math.random() * files.length);
		return cb(null, files[randomNum]);
	});
};

_renderPageWithRandomBackground = function(res, viewName, params, next){
	_getBackgroundPic(function(err, backgroundImage){
		if (err) return next(err, null);
		params.backgroundImage = backgroundImage;
		res.render(viewName, params);
	});
};

module.exports = router;
