// ---------------------------------------------------------------------------------------------
// YOU CAN FREELY MODIFY THE CODE BELOW IN ORDER TO COMPLETE THE TASK
// ---------------------------------------------------------------------------------------------
import {players} from "../../db/data";
import Joi from "joi"
const schema = Joi.object().keys({
  name: Joi.string(),
  position: Joi.string(),
  playerSkills: Joi.array().min(1).required()
});

export default async ({body, params: {id}}, res) => {
  const playerIndex = players.findIndex(o => +o.id === +id);
  const result = schema.validate(body);
  const { error } = result;

  if (playerIndex === -1) {
    res.status(422).json({
      message: 'Player not found'
    })
    return;
  }
  if (error) {
    res.status(422).json({
      message: error.details[0].message
    })
  } else {
    players[playerIndex] = {...players[playerIndex], ...body};
    res.send(players[playerIndex]);
  }
}
