// @ts-check
const express = require('express');

router.post('/summoner', async (req, res) => {
  const name = encodeURI(req.body.summoner);
  const region = (req.body.region).toUpperCase();

  const profileURL = `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}`;
  const summonerInfo = await getData(profileURL, collectSummonerInfo, region);

  const leagueURL = `https://${region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerInfo.sumId}`;
  const rankedInfo = await getData(leagueURL, collectRankedInfo);

  const { puuId } = summonerInfo;
  const matchList = [];
  const start = 0;
  const matchListURL = `https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuId}/ids?start=${start}&count=5`;
  matchList.push(...await getData(matchListURL));

  const result = await bruteForceMatches(matchList);

  if (result === 'hey') {
    console.log(4, result);
    res.send(JSON.stringify({ ...summonerInfo, ...rankedInfo }));
  }
});
