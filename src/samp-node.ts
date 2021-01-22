import {
    ManualVehicleEngineAndLights,
    OnGameModeInit,
    OnPlayerCommandText
} from "samp-node-lib";
 
OnGameModeInit(() => {
    ManualVehicleEngineAndLights();
});
 
//
 
OnPlayerCommandText((player, cmdtext) => {
    player.SendClientMessage('rgba(255,0,0,1)', cmdtext)
});