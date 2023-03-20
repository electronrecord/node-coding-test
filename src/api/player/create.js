// ---------------------------------------------------------------------------------------------
// YOU CAN FREELY MODIFY THE CODE BELOW IN ORDER TO COMPLETE THE TASK
// ---------------------------------------------------------------------------------------------
import {players} from '../../db/data';
const Joi = require('joi');
const schema = Joi.object().keys({
  name: Joi.string().required(),
  position: Joi.string().required(),
  playerSkills: Joi.array().min(1).required()
});

export default async ({body}, res) => {
  const result = schema.validate(body);
  const { error } = result;
  if (error) {
    res.status(422).json({
      message: error.details[0].message
    })
  } else {
    body.id = players.length + 1;
    players.push(body);
    res.send(body);
  }
}
