// ---------------------------------------------------------------------------------------------
// YOU CAN FREELY MODIFY THE CODE BELOW IN ORDER TO COMPLETE THE TASK
// ---------------------------------------------------------------------------------------------
import {players} from "../../db/data";

export default async ({body}, res) => {
  const sortByPositions = body.reduce((acc, curr) => {
    const filteredByPosition = players
      .filter(o => o.position === curr.position)
      .filter(o => o.playerSkills.some(o => o.skill === curr.mainSkill))
    const sorted = filteredByPosition.sort((a, z) => {
      return z.playerSkills.find(skill => skill.skill === curr.mainSkill).value - a.playerSkills.find(skill => skill.skill === curr.mainSkill).value;
    });
    const count =  Array.from({length: curr.numberOfPlayers}, (_, i) => i);
    count.forEach(val => {
      acc.push(sorted[val]);
    })
    return acc;
  }, []);
  res.send(sortByPositions);
}
