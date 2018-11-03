exports.JobCityList = {
  USA: {
    uri: "https://www.indeed.com/jobs?q=Javascript+Developer&l=United+States&jt=fulltime",
    transform: function (body) {
      return cheerio.load(body);
    }
  },
  NYC: {
    uri: "`https://www.indeed.com/jobs?q=Javascript+Developer&l=New+York,+NY&jt=fulltime`",
    transform: function (body) {
      return cheerio.load(body);
    }
  },
  LA: {
    uri: `https://www.indeed.com/jobs?q=Javascript+Developer&l=Los+Angeles,+CA&jt=fulltime`,
    transform: function (body) {
      return cheerio.load(body);
    }
  },
  Chicago: {
    uri: `https://www.indeed.com/jobs?q=Javascript+Developer&l=Chicago,+IL&jt=fulltime`,
    transform: function (body) {
      return cheerio.load(body);
    }
  },
  Dallas: {
    uri: `https://www.indeed.com/jobs?q=Javascript+Developer&l=Dallas,+TX&jt=fulltime`,
    transform: function (body) {
      return cheerio.load(body);
    }
  },
  Philly: {
    uri: `https://www.indeed.com/jobs?q=Javascript+Developer&l=Philadelphia,+PA&jt=fulltime`,
    transform: function (body) {
      return cheerio.load(body);
    }
  },
  Houston: {
    uri: `https://www.indeed.com/jobs?q=Javascript+Developer&l=Houston,+TX&jt=fulltime`,
    transform: function (body) {
      return cheerio.load(body);
    }
  },
  DC: {
    uri: `https://www.indeed.com/jobs?q=Javascript+Developer&l=Washington,+DC&jt=fulltime`,
    transform: function (body) {
      return cheerio.load(body);
    }
  },
  Miami: {
    uri: `https://www.indeed.com/jobs?q=Javascript+Developer&l=Miami,+FL&jt=fulltime`,
    transform: function (body) {
      return cheerio.load(body);
    }
  },
  Atlanta: {
    uri: `https://www.indeed.com/jobs?q=Javascript+Developer&l=Atlanta,+GA&jt=fulltime`,
    transform: function (body) {
      return cheerio.load(body);
    }
  },
  Boston: {
    uri: `https://www.indeed.com/jobs?q=Javascript+Developer&l=Boston,+MA&jt=fulltime`,
    transform: function (body) {
      return cheerio.load(body);
    }
  },
  SF: {
    uri: `https://www.indeed.com/jobs?q=Javascript+Developer&l=San+Francisco,+CA&jt=fulltime`,
    transform: function (body) {
      return cheerio.load(body);
    }
  },
  Detroit: {
    uri: `https://www.indeed.com/jobs?q=Javascript+Developer&l=Detroit,+MI&jt=fulltime`,
    transform: function (body) {
      return cheerio.load(body);
    }
  },
  Riverside: {
    uri: `https://www.indeed.com/jobs?q=Javascript+Developer&l=Riverside,+CA&jt=fulltime`,
    transform: function (body) {
      return cheerio.load(body);
    }
  },
  Phoenix: {
    uri: `https://www.indeed.com/jobs?q=Javascript+Developer&l=Phoenix,+AZ&jt=fulltime`,
    transform: function (body) {
      return cheerio.load(body);
    }
  },
  Seattle: {
    uri: `https://www.indeed.com/jobs?q=Javascript+Developer&l=Seattle,+WA&jt=fulltime`,
    transform: function (body) {
      return cheerio.load(body);
    }
  },
  Minneapolis: {
    uri: `https://www.indeed.com/jobs?q=Javascript+Developer&l=Minneapolis,+MN&jt=fulltime`,
    transform: function (body) {
      return cheerio.load(body);
    }
  },
  SanDiego: {
    uri: `https://www.indeed.com/jobs?q=Javascript+Developer&l=San+Diego,+CA&jt=fulltime`,
    transform: function (body) {
      return cheerio.load(body);
    }
  },
  StLouis: {
    uri: `https://www.indeed.com/jobs?q=Javascript+Developer&l=St.+Louis,+MO&jt=fulltime`,
    transform: function (body) {
      return cheerio.load(body);
    }
  },
  Tampa: {
    uri: `https://www.indeed.com/jobs?q=Javascript+Developer&l=Tampa,+FL&jt=fulltime`,
    transform: function (body) {
      return cheerio.load(body);
    }
  },
  Baltimore: {
    uri: `https://www.indeed.com/jobs?q=Javascript+Developer&l=Baltimore,+MD&jt=fulltime`,
    transform: function (body) {
      return cheerio.load(body);
    }
  },
  Denver: {
    uri: `https://www.indeed.com/jobs?q=Javascript+Developer&l=Denver,+CO&jt=fulltime`,
    transform: function (body) {
      return cheerio.load(body);
    }
  },
  Pittsburgh: {
    uri: `https://www.indeed.com/jobs?q=Javascript+Developer&l=Pittsburgh,+PA&jt=fulltime`,
    transform: function (body) {
      return cheerio.load(body);
    }
  },
  Portland: {
    uri: `https://www.indeed.com/jobs?q=Javascript+Developer&l=Portland,+OR&jt=fulltime`,
    transform: function (body) {
      return cheerio.load(body);
    }
  },
  Charlotte: {
    uri: `https://www.indeed.com/jobs?q=Javascript+Developer&l=Charlotte,+NC&jt=fulltime`,
    transform: function (body) {
      return cheerio.load(body);
    }
  },
  Sacramento: {
    uri: `https://www.indeed.com/jobs?q=Javascript+Developer&l=Sacramento,+CA&jt=fulltime`,
    transform: function (body) {
      return cheerio.load(body);
    }
  },
  SanAntonio: {
    uri: `https://www.indeed.com/jobs?q=Javascript+Developer&l=San+Antonio,+TX&jt=fulltime`,
    transform: function (body) {
      return cheerio.load(body);
    }
  },
  Orlando: {
    uri: `https://www.indeed.com/jobs?q=Javascript+Developer&l=Orlando,+FL&jt=fulltime`,
    transform: function (body) {
      return cheerio.load(body);
    }
  },
  Cincinnati: {
    uri: `https://www.indeed.com/jobs?q=Javascript+Developer&l=Cincinnati,+OH&jt=fulltime`,
    transform: function (body) {
      return cheerio.load(body);
    }
  },
  Cleveland: {
    uri: `https://www.indeed.com/jobs?q=Javascript+Developer&l=Cleveland,+OH&jt=fulltime`,
    transform: function (body) {
      return cheerio.load(body);
    }
  },
  KC: {
    uri: `https://www.indeed.com/jobs?q=Javascript+Developer&l=Kansas+City,+MO&jt=fulltime`,
    transform: function (body) {
      return cheerio.load(body);
    }
  },
  LasVegas: {
    uri: `https://www.indeed.com/jobs?q=Javascript+Developer&l=Las+Vegas,+NV&jt=fulltime`,
    transform: function (body) {
      return cheerio.load(body);
    }
  },
  Columbus: {
    uri: `https://www.indeed.com/jobs?q=Javascript+Developer&l=Columbus,+OH&jt=fulltime`,
    transform: function (body) {
      return cheerio.load(body);
    }
  },
  Indianapolis: {
    uri: `https://www.indeed.com/jobs?q=Javascript+Developer&l=Indianapolis,+IN&jt=fulltime`,
    transform: function (body) {
      return cheerio.load(body);
    }
  },
  SanJose: {
    uri: `https://www.indeed.com/jobs?q=Javascript+Developer&l=San+Jose,+CA&jt=fulltime`,
    transform: function (body) {
      return cheerio.load(body);
    }
  },
  Austin: {
    uri: `https://www.indeed.com/jobs?q=Javascript+Developer&l=Austin,+TX&jt=fulltime`,
    transform: function (body) {
      return cheerio.load(body);
    }
  },
  VirginiaBeach: {
    uri: `https://www.indeed.com/jobs?q=Javascript+Developer&l=Virginia+Beach,+VA&jt=fulltime`,
    transform: function (body) {
      return cheerio.load(body);
    }
  },
  Nashville: {
    uri: `https://www.indeed.com/jobs?q=Javascript+Developer&l=Nashville,+TN&jt=fulltime`,
    transform: function (body) {
      return cheerio.load(body);
    }
  },
  Providence: {
    uri: `https://www.indeed.com/jobs?q=Javascript+Developer&l=Providence,+RI&jt=fulltime`,
    transform: function (body) {
      return cheerio.load(body);
    }
  },
  Milwaukee: {
    uri: `https://www.indeed.com/jobs?q=Javascript+Developer&l=Milwaukee&jt=fulltime`,
    transform: function (body) {
      return cheerio.load(body);
    }
  },
  Jacksonville: {
    uri: `https://www.indeed.com/jobs?q=Javascript+Developer&l=Jacksonville,+FL&jt=fulltime`,
    transform: function (body) {
      return cheerio.load(body);
    }
  },
  Memphis: {
    uri: `https://www.indeed.com/jobs?q=Javascript+Developer&l=Memphis,+TN&jt=fulltime`,
    transform: function (body) {
      return cheerio.load(body);
    }
  },
  OklahomaCity: {
    uri: `https://www.indeed.com/jobs?q=Javascript+Developer&l=Oklahoma+City,+OK&jt=fulltime`,
    transform: function (body) {
      return cheerio.load(body);
    }
  },
  Louisville: {
    uri: `https://www.indeed.com/jobs?q=Javascript+Developer&l=Louisville,+KY&jt=fulltime`,
    transform: function (body) {
      return cheerio.load(body);
    }
  },
  Hartford: {
    uri: `https://www.indeed.com/jobs?q=Javascript+Developer&l=Hartford,+CT&jt=fulltime`,
    transform: function (body) {
      return cheerio.load(body);
    }
  },
  Richmond: {
    uri: `https://www.indeed.com/jobs?q=Javascript+Developer&l=Richmond,+VA&jt=fulltime`,
    transform: function (body) {
      return cheerio.load(body);
    }
  },
  NewOrleans: {
    uri: `https://www.indeed.com/jobs?q=Javascript+Developer&l=New+Orleans,+LA&jt=fulltime`,
    transform: function (body) {
      return cheerio.load(body);
    }
  },
  Buffalo: {
    uri: `https://www.indeed.com/jobs?q=Javascript+Developer&l=Buffalo,+NY&jt=fulltime`,
    transform: function (body) {
      return cheerio.load(body);
    }
  },
  Raleigh: {
    uri: `https://www.indeed.com/jobs?q=Javascript+Developer&l=Raleigh,+NC&jt=fulltime`,
    transform: function (body) {
      return cheerio.load(body);
    }
  },
  Birmingham: {
    uri: `https://www.indeed.com/jobs?q=Javascript+Developer&l=Birmingham,+AL&jt=fulltime`,
    transform: function (body) {
      return cheerio.load(body);
    }
  },
  SaltLakeCity: {
    uri: `https://www.indeed.com/jobs?q=Javascript+Developer&l=Salt+Lake+City,+UT&jt=fulltime`,
    transform: function (body) {
      return cheerio.load(body);
    }
  }
}