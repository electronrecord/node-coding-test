// ---------------------------------------------------------------------------------------------
// YOU CAN FREELY MODIFY THE CODE BELOW IN ORDER TO COMPLETE THE TASK
// ---------------------------------------------------------------------------------------------
import {players} from "../../db/data"

const key = 'SkFabTZibXE1aE14ckpQUUxHc2dnQ2RzdlFRTTM2NFE2cGI4d3RQNjZmdEFITmdBQkE=';

export default async ({headers: {authorization}, params: {id}}, res) => {
  const isAuth = authorization === `Bearer ${key}`;
  if (!isAuth) {
    res.status(401).json({
      message: 'You are not authorized to execute this action.'
    })
    return;
  }
  const playerIndex = players.findIndex(o => +o.id === +id);
  if (playerIndex === -1) {
    res.status(422).json({
      message: 'Player not found.'
    });
  } else {
    players.splice(playerIndex, 1);
    res.send({message: 'Player deleted successfully.'});
  }

}
