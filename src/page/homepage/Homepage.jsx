import {useState,useEffect} from 'react'
import axios from 'axios'
import moment from 'moment/min/moment-with-locales'
import {WbSunny,DarkMode,Search,SettingsOutlined,StarOutlined,StarBorderOutlined,SportsSoccer,ArrowDropDownTwoTone,SportsTennisOutlined,
      SportsBasketballOutlined,SportsHockeyOutlined,SportsGolfOutlined,SportsVolleyballOutlined,SportsBaseballOutlined,
      SportsRugbyOutlined,SportsFootballOutlined,ArrowForwardIosOutlined,ArrowDropDownOutlined,ArrowBackIosOutlined} from '@mui/icons-material';
import diretta from '../../assets/img/diretta.png'
import banner from '../../assets/img/banner.png'
import hauwei from '../../assets/img/hauwei.png'
import calendar from '../../assets/svg/calendar.svg'
import playstore from '../../assets/svg/playstore.svg'
import './homepage.css';

const Homepage = () => {
   const [l1Matches,setL1Matches] = useState([]);
   const [l1Teams,setL1Teames] = useState([]);
   const [blMatches,setBLMatches] = useState([]);
   const [blTeams,setBLTeames] = useState([]);
   const [plMatches,setPLMatches] = useState([]);
   const [plTeams,setPLTeames] = useState([]);
   const [PDmatches,setPDMatches] = useState([]);
   const [pdTeams,setPdTeames] = useState([]);
   const [startDate, setStartDate] = useState(new Date());

   let state = {
        leagues: [
            { id: 2002, name: 'Bundesliga' },
            { id: 2014, name: 'Primera Division' },
            { id: 2015, name: 'Ligue 1' },
            { id: 2019, name: 'Serie A' },
            { id: 2021, name: 'Premier League' }
        ],
        standings: [],
        selectedLeague: ''
    }

    useEffect(() => {
        fetch(`http://api.football-data.org/v2/competitions/${state.leagues[1]["id"]}/matches`,{  
            headers: {'X-Auth-Token':'7f87ae31baf74ee9b7d26dcaf77af710'}})
         .then(res => res.json()).then(response => {
             setPDMatches(response.matches.slice(202,209))
         }).catch(err => console.log(err))
    },[])

    useEffect(() => {
        fetch(`http://api.football-data.org/v2/competitions/${state.leagues[1]["id"]}/teams`,{
                      headers: { 'X-Auth-Token':'7f87ae31baf74ee9b7d26dcaf77af710'}})
         .then(res => res.json()).then(response => {
            setPdTeames(response.teams)
         }).catch(err => console.log(err))
    },[])


    useEffect(() => {
        fetch(`http://api.football-data.org/v2/competitions/${state.leagues[0]["id"]}/matches`,{
                      headers: {'X-Auth-Token':'7f87ae31baf74ee9b7d26dcaf77af710'}})
         .then(res => res.json()).then(response => {
            setBLMatches(response.matches.slice(202,209))
         }).catch(err => console.log(err))
    },[])

    useEffect(() => {
        fetch(`http://api.football-data.org/v2/competitions/${state.leagues[0]["id"]}/teams`,{
                      headers: {'X-Auth-Token':'7f87ae31baf74ee9b7d26dcaf77af710'}})
         .then(res => res.json()).then(response => {
            setBLTeames(response.teams)
         }).catch(err => console.log(err))
    },[])

    useEffect(() => {
        fetch(`http://api.football-data.org/v2/competitions/${state.leagues[2]["id"]}/matches`,{ 
                      headers: {'X-Auth-Token':'7f87ae31baf74ee9b7d26dcaf77af710'}})
         .then(res => res.json()).then(response => {
            setL1Matches(response.matches.slice(202,209))
         }).catch(err => console.log(err))
    },[])

    useEffect(() => {
        fetch(`http://api.football-data.org/v2/competitions/${state.leagues[2]["id"]}/teams`,{
                      headers: {'X-Auth-Token':'7f87ae31baf74ee9b7d26dcaf77af710'}})
         .then(res => res.json()).then(response => {
            setL1Teames(response.teams)
         }).catch(err => console.log(err))
    },[])

    console.log(l1Matches.sort((a,b) => {
        return matchTime(b.utcDate) - matchTime(a.utcDate);
    }))

    const matchTime = (time) => {
       let pmTime = new Date(time);
       let t = pmTime.toLocaleTimeString(navigator.language,{hour:'2-digit',minute:"2-digit"});
       return convertTimeTo24(t); 
    }

    const convertTimeTo24 = (tm) => {
        const [time,modifier] = tm.split(" ");
        let [hours,minutes] = time.split(":");
        if(hours === '12'){
            hours = '00';
        }

        if(modifier === 'PM'){
            hours = parseInt(hours,10) + 12;
        }

        return `${hours}:${minutes}`
    }


   //let datf = moment(today.setDate(today.getDate() + 2)).format('d/MM ddd')
   // let datf = moment(new Date().getDay() + 1).format("DD/MM");
   //const dataStr = moment(new Date()).locale('it-IT').format('ddd');

   function capitalizeDay(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

   var today = moment().format('DD/MM');
   var todayDay = moment().locale('it').format('ddd');
   var todayName = capitalizeDay(todayDay);
   var tomorrow = moment(today).add(2, 'days').format('DD/MM');
   var tomorrowDay = moment(today).add(2, 'days').format("ddd");

    return (
        <div className='homepage'>
            <div className="hpInfSec">
               <div className="hpHeadInf">
                   <h1 className="hpHeadInformation">Risultati calcio in tempo reale, calcio in diretta</h1>
               </div>
            </div>
            <div className="hpHeadSec">
                <div className="hpHeadDiv">
                   <div className="hpHeadDivLeft">
                       <a href="" className='direttaLogoLink'>
                           <div className='direttaLogoDiv'>
                               <img src={diretta} alt="" className='direttaLogo'/>
                           </div>
                           <div className=''>
                               <span className='direttaLogoTxt'>Diretta.it</span>
                           </div>
                       </a>
                   </div>

                   <div className="hpHeadDivRight">
                       <div className='dayOrNight'>
                           <div className="daybutton">
                              <div className='daybuttonD'>
                                 <WbSunny  style={{color:"#ddd1d1",fontSize:'24px'}}/>
                              </div>
                           </div>
                           <div className='nightbutton'>
                               <DarkMode style={{color:"#fff",fontSize:'16px'}}/>
                           </div>
                       </div>
                       <div className="searchbutt">
                           <span>
                              <Search style={{color:"#fff",fontSize:'20px'}}/>
                           </span>
                       </div>
                       <div className="settingsbutt">
                           <span>
                              <SettingsOutlined style={{color:"#fff",fontSize:'20px'}}/>
                           </span>
                       </div>
                       <div className="privacybutts">
                           <div className="accessobutt">
                               <button className='accessobutton'>Accesso</button>
                           </div>
                           <div className="accessobutt">
                               <button className='regiz'>REGISTRAZIONE</button>
                           </div>
                       </div>
                   </div>
                </div>
            </div>
            <div className="sports-top-menu-sec">
                <div className="sports-top-menu">
                    <a className='preferitiSports'>
                        <div className='preferiti-logo'>
                            <StarOutlined  style={{color:"#FFD700",fontSize:"18px"}}/>
                        </div>  
                        <div className='preferiti-txt'>
                            <h2 className='prefer-text'>PREFERITI</h2>
                        </div>  
                        <div className='preferiti-num'>
                            <span className='num-of-preferiti'>0</span>
                        </div>  
                    </a>
                    <div className="groupSports">
                        <div className='type-of-sports calcio'>
                            <SportsSoccer style={{color:"#302e2e",fontSize:"21px"}}/>
                            <span className='type-of-sports-txt clcTxt'>CALCIO</span>
                        </div>
                        <div className='type-of-sports'>
                            <SportsTennisOutlined style={{color:"#fff",fontSize:"18px"}}/>
                            <span className='type-of-sports-txt'>TENNIS</span>
                        </div>
                        <div className='type-of-sports'>
                            <SportsBasketballOutlined style={{color:"#fff",fontSize:"18px"}}/>
                            <span className='type-of-sports-txt'>BASKET</span>
                        </div>
                        <div className='type-of-sports'>
                            <SportsHockeyOutlined style={{color:"#fff",fontSize:"18px"}}/>
                            <span className='type-of-sports-txt'>HOCKEY</span>
                        </div>
                        <div className='type-of-sports'>
                            <SportsGolfOutlined style={{color:"#fff",fontSize:"18px"}}/>
                            <span className='type-of-sports-txt'>GOLF</span>
                        </div>
                        <div className='type-of-sports'>
                            <SportsVolleyballOutlined style={{color:"#fff",fontSize:"18px"}}/>
                            <span className='type-of-sports-txt'>VOLLEY</span>
                        </div>
                        <div className='type-of-sports'>
                            <SportsBaseballOutlined style={{color:"#fff",fontSize:"18px"}}/>
                            <span className='type-of-sports-txt'>BASEBALL</span>
                        </div>
                        <div className='type-of-sports'>
                            <SportsRugbyOutlined style={{color:"#fff",fontSize:"18px"}}/>
                            <span className='type-of-sports-txt'>RUGBY</span>
                        </div>
                        <div className='type-of-sports'>
                            <SportsFootballOutlined style={{color:"#fff",fontSize:"18px"}}/>
                            <span className='type-of-sports-txt'>FOOTBALL</span>
                        </div>
                    </div> 
                    <div className="piuSports">
                        <div className='type-of-sports'>
                            <ArrowDropDownTwoTone style={{color:"#fff",fontSize:"18px"}}/>
                            <span className='type-of-sports-txt'>PIU SPORTS</span>
                        </div>
                    </div> 
                </div>
            </div>
            <div className="hpContainer">
                <div className="content-hpContainer">
                    <div className="main-hpContainer">
                        <div className="mainInnner-hpContainer">
                           <div className="myList-legaue">
                              <div className='myList-legaue-el'>
                                  <div className="myList-legaue-el-head">
                                        <StarOutlined  style={{color:"#FFD700",fontSize:"14px"}}/>
                                        <span className='myList-legaue-el-headTxt'>Meil campionati</span>
                                  </div>
                                  <div className="best-leagues">
                                      <div className='best-leagues-it'>
                                          <a href="" className='go-to-league'>
                                              <div className='league-img'>
                                                  <img src="https://www.diretta.it/res/_fs/build/fr.f5e7288.png" alt="" className='league-flag'/>
                                              </div>
                                              <div className='league-name'>
                                                <span className='league-nameTxt'>Legue 1</span>
                                              </div>
                                          </a>
                                      </div>
                                      <div className='best-leagues-it'>
                                          <a href="" className='go-to-league'>
                                              <div className='league-img'>
                                                  <img src="https://www.diretta.it/res/_fs/build/de.494bda8.png" alt="" className='league-flag'/>
                                              </div>
                                              <div className='league-name'>
                                                <span className='league-nameTxt'>Bundesliga</span>
                                              </div>
                                          </a>
                                      </div>
                                      <div className='best-leagues-it'>
                                          <a href="" className='go-to-league'>
                                              <div className='league-img'>
                                                  <img src="https://www.diretta.it/res/_fs/build/en.12159c6.png" alt="" className='league-flag'/>
                                              </div>
                                              <div className='league-name'>
                                                <span className='league-nameTxt'>Premier League</span>
                                              </div>
                                          </a>
                                      </div>
                                      <div className='best-leagues-it'>
                                          <a href="" className='go-to-league'>
                                              <div className='league-img'>
                                                  <img src="https://www.diretta.it/res/_fs/build/it.225fa57.png" alt="" className='league-flag'/>
                                              </div>
                                              <div className='league-name'>
                                                <span className='league-nameTxt'>Seria A</span>
                                              </div>
                                          </a>
                                      </div>
                                      <div className='best-leagues-it'>
                                          <a href="" className='go-to-league'>
                                              <div className='league-img'>
                                                  <img src="https://www.diretta.it/res/_fs/build/it.225fa57.png" alt="" className='league-flag'/>
                                              </div>
                                              <div className='league-name'>
                                                <span className='league-nameTxt'>Seria B</span>
                                              </div>
                                          </a>
                                      </div>
                                      <div className='best-leagues-it'>
                                          <a href="" className='go-to-league'>
                                              <div className='league-img'>
                                                  <img src="https://www.diretta.it/res/_fs/build/it.225fa57.png" alt="" className='league-flag'/>
                                              </div>
                                              <div className='league-name'>
                                                <span className='league-nameTxt'>Supercoppa</span>
                                              </div>
                                          </a>
                                      </div>
                                      <div className='best-leagues-it'>
                                          <a href="" className='go-to-league'>
                                              <div className='league-img'>
                                                  <img src="https://www.diretta.it/res/_fs/build/nl.dede5ef.png" alt="" className='league-flag'/>
                                              </div>
                                              <div className='league-name'>
                                                <span className='league-nameTxt'>Eredivisie</span>
                                              </div>
                                          </a>
                                      </div>
                                      <div className='best-leagues-it'>
                                          <a href="" className='go-to-league'>
                                              <div className='league-img'>
                                                  <img src="https://www.diretta.it/res/_fs/build/es.ac54d02.png" alt="" className='league-flag'/>
                                              </div>
                                              <div className='league-name'>
                                                <span className='league-nameTxt'>La Liga</span>
                                              </div>
                                          </a>
                                      </div>
                                      <div className='best-leagues-it'>
                                          <a href="" className='go-to-league'>
                                              <div className='league-img'>
                                                  <img src="https://www.diretta.it/res/_fs/build/es.ac54d02.png" alt="" className='league-flag'/>
                                              </div>
                                              <div className='league-name'>
                                                <span className='league-nameTxt'>Supercoppa</span>
                                              </div>
                                          </a>
                                      </div>
                                      <div className="banner">
                                          <div className="bannerAdd">
                                              <img src={banner} alt="" className='bannerImg'/>
                                          </div> 
                                          <div className="bannerPub">Publicita</div> 
                                      </div>

                                      <div className='best-leagues-it'>
                                          <a href="" className='go-to-league'>
                                              <div className='league-img'>
                                                  <img src="https://www.diretta.it/res/_fs/build/world.ee5f190.png" alt="" className='league-flag'/>
                                              </div>
                                              <div className='league-name'>
                                                <span className='league-nameTxt'>African Nations</span>
                                              </div>
                                          </a>
                                      </div>
                                      <div className='best-leagues-it'>
                                          <a href="" className='go-to-league'>
                                              <div className='league-img'>
                                                  <img src="https://www.diretta.it/res/_fs/build/world.ee5f190.png" alt="" className='league-flag'/>
                                              </div>
                                              <div className='league-name'>
                                                <span className='league-nameTxt'>Europei</span>
                                              </div>
                                          </a>
                                      </div>
                                      <div className='best-leagues-it'>
                                          <a href="" className='go-to-league'>
                                              <div className='league-img'>
                                                  <img src="https://www.diretta.it/res/_fs/build/world.ee5f190.png" alt="" className='league-flag'/>
                                              </div>
                                              <div className='league-name'>
                                                <span className='league-nameTxt'>Champions League</span>
                                              </div>
                                          </a>
                                      </div>
                                      <div className='best-leagues-it'>
                                          <a href="" className='go-to-league'>
                                              <div className='league-img'>
                                                  <img src="https://www.diretta.it/res/_fs/build/world.ee5f190.png" alt="" className='league-flag'/>
                                              </div>
                                              <div className='league-name'>
                                                <span className='league-nameTxt'>Europa League</span>
                                              </div>
                                          </a>
                                      </div>
                                      <div className='best-leagues-it'>
                                          <a href="" className='go-to-league'>
                                              <div className='league-img'>
                                                  <img src="https://www.diretta.it/res/_fs/build/world.ee5f190.png" alt="" className='league-flag'/>
                                              </div>
                                              <div className='league-name'>
                                                <span className='league-nameTxt'>Europa Conf</span>
                                              </div>
                                          </a>
                                      </div>
                                      <div className='best-leagues-it'>
                                          <a href="" className='go-to-league'>
                                              <div className='league-img'>
                                                  <img src="https://www.diretta.it/res/_fs/build/world.ee5f190.png" alt="" className='league-flag'/>
                                              </div>
                                              <div className='league-name'>
                                                <span className='league-nameTxt'>Uefa Nations</span>
                                              </div>
                                          </a>
                                      </div>
                                      <div className='best-leagues-it'>
                                          <a href="" className='go-to-league'>
                                              <div className='league-img'>
                                                  <img src="https://www.diretta.it/res/_fs/build/world.ee5f190.png" alt="" className='league-flag'/>
                                              </div>
                                              <div className='league-name'>
                                                <span className='league-nameTxt'>Mondiali</span>
                                              </div>
                                          </a>
                                      </div>
                                      <div className="mynation-list">
                                          <div className='mynation-list-el'>
                                             <StarOutlined  style={{color:"#FFD700",fontSize:"14px",paddingRight:"4px"}}/>
                                             <span className='myList-legaue-el-headTxt'>Mie Squadre</span>
                                          </div>
                                      </div>
                                    <div className="aggungi-nazi">
                                        <a href="" className='find-nazionali'>
                                            <div className='league-nameTxt'>Aggungi la squadra</div>
                                            <div><ArrowForwardIosOutlined style={{color:"#979494",fontSize:"9px"}} /></div>
                                        </a>
                                    </div>
                                    <div className="alle-nazioni">
                                        <div className='nazioni'>
                                            <span>Nazioni</span>
                                        </div>
                                        <div className='nazioni-name'>
                                            <a href="" className='link-to-nazioni'>Albania</a>
                                        </div>
                                        <div className='nazioni-name'>
                                            <a href="" className='link-to-nazioni'>Algeria</a>
                                        </div>
                                        <div className='nazioni-name'>
                                            <a href="" className='link-to-nazioni'>Andorra</a>
                                        </div>
                                        <div className='nazioni-name'>
                                            <a href="" className='link-to-nazioni'>Angola</a>
                                        </div>
                                        <div className='nazioni-name'>
                                            <a href="" className='link-to-nazioni'>Arabia Saudita</a>
                                        </div>
                                        <div className='nazioni-name'>
                                            <a href="" className='link-to-nazioni'>Argentina</a>
                                        </div>                                       
                                         <div className='nazioni-name'>
                                            <a href="" className='link-to-nazioni'>Aruba</a>
                                        </div>
                                        <div className='nazioni-name'>
                                            <a href="" className='link-to-nazioni'>Australia</a>
                                        </div>
                                        <div className='nazioni-name'>
                                            <a href="" className='link-to-nazioni'>Austria</a>
                                        </div>
                                        <div className='nazioni-name'>
                                            <a href="" className='link-to-nazioni'>Azerbaijan</a>
                                        </div>
                                        <div className='nazioni-name'>
                                            <a href="" className='link-to-nazioni'>Bahrain</a>
                                        </div>
                                        <div className='nazioni-name'>
                                            <a href="" className='link-to-nazioni'>Bangladesh</a>
                                        </div>
                                        <div className='nazioni-name'>
                                            <a href="" className='link-to-nazioni'>Belgio</a>
                                        </div>                                       
                                         <div className='nazioni-name'>
                                            <a href="" className='link-to-nazioni'>Benin</a>
                                        </div>
                                        <div className='nazioni-name'>
                                            <a href="" className='link-to-nazioni'>Bermuda</a>
                                        </div>
                                        <div className='nazioni-name'>
                                            <a href="" className='link-to-nazioni'>Bielorussia</a>
                                        </div>
                                        <div className='nazioni-name'>
                                            <a href="" className='link-to-nazioni'>Birmania</a>
                                        </div>
                                        <div className='nazioni-name'>
                                            <a href="" className='link-to-nazioni'>Bosnia</a>
                                        </div>
                                        <div className='nazioni-name'>
                                            <a href="" className='link-to-nazioni'>Botswana</a>
                                        </div>
                                        <div className='nazioni-name'>
                                            <a href="" className='link-to-nazioni'>Brasil</a>
                                        </div>                                       
                                         <div className='di-piu-nazion'>
                                           <div className='di-piu'>
                                               <span className='di-piu-txt'>Di piu</span>
                                               <ArrowDropDownOutlined style={{color:"#979494",fontSize:"12px"}}/>
                                           </div>
                                        </div>
                                    </div>
                                  </div>
                              </div>
                           </div>
                           <div className="matches-by-date">
                               <div className='matches-box'>
                                    <div className='box-left-match'>
                                        <span className='bet'>bet<b>365</b></span>
                                    </div>
                                    <div className='box-right-match'>
                                        <div><h1 className='visita-bet'>Visita bet365.com per maggiori dettagli sulle ultime offerte</h1></div>
                                        <div className='restrizioni'><span className='restrizioni-txt'>Soggetto a geo restrizioni e a T&C. 18+</span></div>
                                    </div>
                               </div>
                               <div className="live-matches-table">
                                   <div className="live-matches-tab">
                                       <div className="tabs-group">
                                            <div className="tabs_tab selected">Tutti</div> 
                                            <div className="tabs_tab">Live</div> 
                                            <div className="tabs_tab">Conclusi</div> 
                                            <div className="tabs_tab">Programma</div> 
                                       </div>
                                       <div className="calendar-group">
                                          <div className="cal-fowr">
                                              <ArrowBackIosOutlined style={{color:"rgb(80 73 73)",fontSize:"8px"}}/>
                                          </div> 
                                          <div className="cal-date">
                                               <div className='cale'>
                                                   <img src={calendar} alt="" />
                                               </div>
                                               <div className='currDay'>{today}
                                                <span className='currDayTxt'>{todayName}</span>
                                               </div>
                                          </div>
                                          <div className="cal-back">
                                              <ArrowForwardIosOutlined style={{color:"rgb(80 73 73)",fontSize:"8px"}} />
                                          </div>
                                       </div>
                                   </div>
                                   <div className="live-matche-event">
                                       <div className="league-live-event">
                                           <div className="league-live-event-header">
                                              <div className="league-star">
                                                 <StarOutlined  style={{color:"#FFD700",fontSize:"12px"}}/>
                                              </div>
                                              <div className="league-inf">
                                                 <div className='league-img'>
                                                    <img src="https://www.diretta.it/res/_fs/build/fr.f5e7288.png" alt="" className='league-flag'/>
                                                 </div>
                                                  <div className='name-of-league'>
                                                    <span className='league-country'>FRANCE:</span>
                                                    <a href="" className='league-name'>Ligue 1</a> 
                                                  </div>
                                              </div>
                                              <div className="league-clasif">
                                                 <div className='league-clasif-it'>
                                                     <a href="" className='league-clasif-link'>Classifiche</a>
                                                 </div>
                                                 <div className='league-clasif-it'>
                                                    <ArrowForwardIosOutlined style={{color:"#6e6969",fontSize:"8px",transform: "translateX(14px) rotate(266deg)"}} />
                                                 </div>
                                              </div>
                                           </div>
                                           
                                         {l1Matches.map(match => (
                                                         <div className="league-live-event-match" key={match.id}>
                                                         <div className='event-match-star'>
                                                             <StarBorderOutlined  style={{color:"#6e6969",fontSize:"14px"}}/>
                                                         </div>
                                                         <div className="event-match-time">
                                                             <span>{matchTime(match.utcDate)}</span>
                                                         </div>
                                                         <div className="event-match-teams">
                                                             <div className="event-match-team">
                                                                 <div className='logo-and-name'>
                                                                 <img src={l1Teams.find(it => it.id === match.awayTeam.id).crestUrl} alt="" className='ev-match-logo-team'/>
                                                                 <span className='name-of-team'>{match.awayTeam.name}</span>
                                                                 </div> 
                                                                 <div className='ev-match-res'>-</div>
                                                             </div>
                                                             <div className="event-match-team">
                                                                 <div className='logo-and-name'>  
                                                                 <img src={l1Teams.find(it => it.id === match.homeTeam.id).crestUrl} alt="" className='ev-match-logo-team'/>
                                                                 <span className='name-of-team'>{match.homeTeam.name}</span>
                                                                 </div> 
                                                                 <div className='ev-match-res'>-</div>
                                                             </div>
                                                         </div>
                                                         <div className="live-event-match">
                                                                 <span className='see-live'>LIVE</span>
                                                         </div>
                                                    </div>
                                         ))}
                                       </div>

                                       <div className="league-live-event">
                                           <div className="league-live-event-header">
                                              <div className="league-star">
                                                 <StarOutlined  style={{color:"#FFD700",fontSize:"12px"}}/>
                                              </div>
                                              <div className="league-inf">
                                                 <div className='league-img'>
                                                    <img src="https://www.diretta.it/res/_fs/build/de.494bda8.png" alt="" className='league-flag'/>
                                                 </div>
                                                  <div className='name-of-league'>
                                                    <span className='league-country'>Germania:</span>
                                                    <a href="" className='league-name'>Bundesliga</a> 
                                                  </div>
                                              </div>
                                              <div className="league-clasif">
                                                 <div className='league-clasif-it'>
                                                     <a href="" className='league-clasif-link'>Classifiche</a>
                                                 </div>
                                                 <div className='league-clasif-it'>
                                                    <ArrowForwardIosOutlined style={{color:"#6e6969",fontSize:"8px",transform: "translateX(14px) rotate(266deg)"}} />
                                                 </div>
                                              </div>
                                           </div>
                                           
                                         {blMatches.map(match => (
                                                         <div className="league-live-event-match" key={match.id}>
                                                         <div className='event-match-star'>
                                                             <StarBorderOutlined  style={{color:"#6e6969",fontSize:"14px"}}/>
                                                         </div>
                                                         <div className="event-match-time">
                                                             <span>{matchTime(match.utcDate)}</span>
                                                         </div>
                                                         <div className="event-match-teams">
                                                             <div className="event-match-team">
                                                                 <div className='logo-and-name'>
                                                                 <img src={blTeams.find(it => it.id === match.awayTeam.id).crestUrl} alt="" className='ev-match-logo-team'/>
                                                                 <span className='name-of-team'>{match.awayTeam.name}</span>
                                                                 </div> 
                                                                 <div className='ev-match-res'>-</div>
                                                             </div>
                                                             <div className="event-match-team">
                                                                 <div className='logo-and-name'>  
                                                                 <img src={blTeams.find(it => it.id === match.homeTeam.id).crestUrl} alt="" className='ev-match-logo-team'/>
                                                                 <span className='name-of-team'>{match.homeTeam.name}</span>
                                                                 </div> 
                                                                 <div className='ev-match-res'>-</div>
                                                             </div>
                                                         </div>
                                                         <div className="live-event-match">
                                                                 <span className='see-live'>LIVE</span>
                                                         </div>
                                                    </div>
                                         ))}
                                       </div>

                                       <div className="league-live-event">
                                           <div className="league-live-event-header">
                                              <div className="league-star">
                                                 <StarOutlined  style={{color:"#FFD700",fontSize:"12px"}}/>
                                              </div>
                                              <div className="league-inf">
                                                 <div className='league-img'>
                                                    <img src="https://www.diretta.it/res/_fs/build/es.ac54d02.png" alt="" className='league-flag'/>
                                                 </div>
                                                  <div className='name-of-league'>
                                                    <span className='league-country'>SPAGNA:</span>
                                                    <a href="" className='league-name'>La Liga</a> 
                                                  </div>
                                              </div>
                                              <div className="league-clasif">
                                                 <div className='league-clasif-it'>
                                                     <a href="" className='league-clasif-link'>Classifiche</a>
                                                 </div>
                                                 <div className='league-clasif-it'>
                                                    <ArrowForwardIosOutlined style={{color:"#6e6969",fontSize:"8px",transform: "translateX(14px) rotate(266deg)"}} />
                                                 </div>
                                              </div>
                                           </div>
                                           {PDmatches.map(match => (
                                                         <div className="league-live-event-match" key={match.id}>
                                                         <div className='event-match-star'>
                                                             <StarBorderOutlined  style={{color:"#6e6969",fontSize:"14px"}}/>
                                                         </div>
                                                         <div className="event-match-time">
                                                             <span>{matchTime(match.utcDate)}</span>
                                                         </div>
                                                         <div className="event-match-teams">
                                                             <div className="event-match-team">
                                                                 <div className='logo-and-name'>
                                                                 <img src={pdTeams.find(it => it.id === match.awayTeam.id).crestUrl} alt="" className='ev-match-logo-team'/>
                                                                 <span className='name-of-team'>{match.awayTeam.name}</span>
                                                                 </div> 
                                                                 <div className='ev-match-res'>-</div>
                                                             </div>
                                                             <div className="event-match-team">
                                                                 <div className='logo-and-name'>  
                                                                 <img src={pdTeams.find(it => it.id === match.homeTeam.id).crestUrl} alt="" className='ev-match-logo-team'/>
                                                                 <span className='name-of-team'>{match.homeTeam.name}</span>
                                                                 </div> 
                                                                 <div className='ev-match-res'>-</div>
                                                             </div>
                                                         </div>
                                                         <div className="live-event-match">
                                                                 <span className='see-live'>LIVE</span>
                                                         </div>
                                                    </div>
                                         ))}
                                       </div>
                                   </div>
                               </div>
                           </div>
                           <div className="banner-zone">

                           </div>
                        </div>
                        <div className="extra-hpContainer">

                        </div>
                    </div>
               </div>    
            </div>
            <div className="hpFooter">
                <div className="footer-div">
                    <div className="footer-top">
                         <div className="top-l-foot">
                              <div className="top-left-head">Diretta.it</div>
                              <div className="top-left-el">
                                  <div className='top-left-it'>
                                      <a href="" className='tl-it-link'>Termini di utilizzo</a>
                                  </div>
                                  <div className='top-left-it'>
                                      <a href="" className='tl-it-link'>Publicitta</a>
                                  </div>
                                  <div className='top-left-it'>
                                      <a href="" className='tl-it-link'>Contatti</a>
                                  </div>
                                  <div className='top-left-it'>
                                      <a href="" className='tl-it-link'>Cellulare</a>
                                  </div>
                                  <div className='top-left-it'>
                                      <a href="" className='tl-it-link'>Livescore</a>
                                  </div>
                                  <div className='top-left-it'>
                                      <a href="" className='tl-it-link'>Links</a>
                                  </div>
                                  <div className='top-left-it'>
                                      <a href="" className='tl-it-link'>FAQ</a>
                                  </div>
                              </div> 
                            </div>
                            <div className="top-social">
                                 <div className='top-soc-h'>Seguici</div>
                                 <div className='top-soc-icon'>
                                    <i class="fab fa-facebook-square fbIco"></i>
                                    <span className='icon-name'>Facebook</span>
                                 </div>
                                 <div className='top-soc-icon'>
                                    <i class="fab fa-twitter-square twitIco"></i>
                                    <span className='icon-name'>Twitter</span>
                                 </div>
                                 <div className='top-soc-icon'>
                                    <i class="fab fa-instagram-square instIco"></i>
                                    <span className='icon-name'>Instagram</span>
                                 </div>
                            </div>
                            <div className="top-appl">
                                <div className="appl-h">
                                    <div className="appl-h-it">APPLICAZIONE CELLULARE</div>
                                    <div className="appl-h-inf">La nostra app è ottimizzata per il tuo dispositivo. Scaricala gratis!</div>
                                </div>
                                <div className="appl-down">
                                    <div className="link-to-down">
                                        <div className="app-icon">
                                            <i class="fab fa-apple appStore"></i>
                                        </div>
                                        <div className="app-inf">
                                            <div className='app-inf-el'>
                                                <h3 className='scarica'>Scarica su</h3>
                                            </div>
                                            <div className='app-inf-el'>
                                                <p className='goTo'>App Store</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="link-to-down">
                                        <div className="app-icon">
                                            <img src={playstore} alt="" />
                                        </div>
                                        <div className="app-inf">
                                            <div className='app-inf-el'>
                                                <h3 className='scarica'>DISPONIBLE SU</h3>
                                            </div>
                                            <div className='app-inf-el'>
                                                <p className='goTo'>Google Play</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="link-to-down">
                                        <div className="app-icon">
                                           <img src={hauwei} alt="" />
                                        </div>
                                        <div className="app-inf">
                                            <div className='app-inf-el'>
                                                <h3 className='scarica'>SCOPRI SU</h3>
                                            </div>
                                            <div className='app-inf-el'>
                                                <p className='goTo'>AppGallery</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="top-log">
                                <div className='promotionL'>
                                    <img src="https://www.diretta.it/res/_fs/images/2_others/promotion.png" alt="" className='promot-img'/>
                                </div>
                            </div>
                    </div>
                     <div className="hr"></div>
                    <div className="footer-bott">
                        <div className="copyrights-etc">
                             <div className='versione'>
                                <a href="" className='versione-link'>Versione Lite</a>
                             </div>
                             <div className="advert">
                                 <div className='gioca'><a href="" className='giocaL'>Gioca Responabile.</a>18+</div>
                                 <div className="advertLogo"></div>
                                 <div className="advertLogo2"></div>
                             </div>
                             <div className="rights">
                                 Copyright © 2006-22 Diretta.it
                             </div>
                        </div>
                        <div className='privacy'>
                            <a href="" className='priv-link'>Imposta Privacy</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Homepage
