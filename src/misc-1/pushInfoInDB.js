/* eslint-disable max-len */
/* eslint-disable guard-for-in */
// @ts-check
const express = require('express');

module.exports = async (obj) => {
  const answers = [];
  for (const key in obj) {
    try {
      const { sumId, sumName, win, solo, flex, normal } = obj[key];
      const { champName, champId, kills, deaths, assists, physical, magic, trueDmg, restore, shield, cs, gold, vision, wards } = obj[key].champion;
      const { date, matchType, dmgTaken, CC, killingSpree, double, triple, quadra, penta } = obj[key].champion;
      const role = (obj[key].role)?.toLowerCase();

      const dmg = physical + magic + trueDmg;
      const heal = restore + shield;
      const kda = calcRatio((kills + assists), deaths);
      const records = { kda, kills, deaths, assists, dmg, heal, cs, gold, vision, wards, dmgTaken, CC, killingSpree, double, triple, quadra, penta };

      let type = '';
      if (solo) type = 'solo';
      if (flex) type = 'flex';
      if (normal) type = 'normal';

      await summoner.updateOne(
        { sumId },
        { /**/ },
        { upsert: true }
      );
      answers.push(sumId);

      for (let key in records) {
        const value = records[key];
        await summoner.updateOne(
          { sumId: sumId, [`records.${key}.value`]: { $lt: value } },
          { /**/ }
        );
      }
    } catch (err) {
      console.error(err);
    }
  }
  return answers;
};
