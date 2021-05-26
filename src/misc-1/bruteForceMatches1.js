// @ts-check
module.exports = async (matchList) => {
  const answers = [];
  for (const matchId of matchList) {
    const doc = await match.findOne({ matchId });
    if (doc) {
      continue;
    }
    try {
      const matchURL = `https://europe.api.riotgames.com/lol/match/v5/matches/${matchId}`;
      const matchInfo = await getData(matchURL);
      if (Object.keys(matchInfo).length === 0) {
        continue;
      }

      const timelineURL = `https://europe.api.riotgames.com/lol/match/v5/matches/${matchId}/timeline`;
      const timeline = await getData(timelineURL);

      const allowedTypeIds = [400, 420, 440];
      const typeId = matchInfo.info.queueId;
      const timelineInfo = collectTimelineInfo(timeline);

      await pushMatchInDB(matchInfo, timelineInfo);

      if (allowedTypeIds.includes(typeId) && matchInfo.info) {
        await pushInfoInDB(matchInfo.info);
        answers.push(matchId);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return answers;
};
