/**
 * Created by horacio on 3/9/16.
 */

define(['enums', 'font'], function (Enums, Font) {

    class ComandosChat {
        constructor(game, acciones) {
            this.game = game;
            this.acciones = acciones;
        }

        _checkearYescribirMuerto() {
            if (this.game.player.muerto) {
                this.game.escribirMsgConsola(Enums.MensajeConsola.ESTAS_MUERTO, Font.NOTIFICATION);
                return true;
            }
            return false;
        }

        parsearChat(message) {
            //#cli guilds
            if (message[0] === '/') {
                var args = message.match(/\S+/g);
                var valido = true;
                if (args !== undefined) {
                    var comando = args[0].toUpperCase();
                    args.shift();
                    switch (comando) {
                        case "/ONLINE":
                            this.game.client.sendOnline();
                            break;

                        case "/SALIR":
                            if (this.game.playerState.paralizado) {
                                this.game.escribirMsgConsola("No puedes salir estando paralizado.", Font.WARNING);
                            } else {
                                if (this.game.macroActivado) {
                                    this.game.desactivarMacro();
                                }
                                this.game.client.sendQuit();
                            }
                            break;

                        case "/SALIRCLAN":
                            this.game.client.sendGuildLeave();
                            break;

                        case "/BALANCE":
                            if (!this._checkearYescribirMuerto()) {
                                this.game.client.sendRequestAccountState();
                            }
                            break;

                        case "/QUIETO":
                            if (!this._checkearYescribirMuerto()) {
                                this.game.client.sendPetStand();
                            }
                            break;

                        case "/ACOMPAÑAR":
                            if (!this._checkearYescribirMuerto()) {
                                this.game.client.sendPetFollow();
                            }
                            break;

                        case "/LIBERAR":
                            if (!this._checkearYescribirMuerto()) {
                                this.game.client.sendReleasePet();
                            }
                            break;

                        case "/ENTRENAR":
                            if (!this._checkearYescribirMuerto()) {
                                this.game.client.sendTrainList();
                            }
                            break;

                        case "/DESCANSAR":
                            if (!this._checkearYescribirMuerto()) {
                                this.game.client.sendRest();
                            }
                            break;

                        case "/MEDITAR":
                            this.acciones.meditar();
                            break;

                        case "/CONSULTA":
                            this.game.client.sendConsultation();
                            break;

                        case "/RESUCITAR":
                            this.game.client.sendResucitate();
                            break;

                        case "/CURAR":
                            this.game.client.sendHeal();
                            break;

                        case "/EST":
                            this.game.client.sendRequestStats();
                            break;

                        case "/AYUDA":
                            this.game.client.sendHelp();
                            break;

                        case "/COMERCIAR":
                            if (!this._checkearYescribirMuerto()) {

                                if (this.game.comerciando) {
                                    this.game.escribirMsgConsola("Ya estás comerciando", Font.INFO);
                                } else {
                                    this.game.client.sendCommerceStart();
                                }
                            }
                            break;

                        case "/BOVEDA":
                            if (!this._checkearYescribirMuerto()) {
                                this.game.client.sendBankStart();
                            }
                            break;

                        case "/ENLISTAR":
                            this.game.client.sendEnlist();
                            break;

                        case "/RECOMPENSA":
                            this.game.client.sendReward();
                            break;

                        case "/MOTD":
                            this.game.client.sendRequestMOTD();
                            break;

                        case "/UPTIME":
                            this.game.client.sendUpTime();
                            break;

                        case "/SALIRPARTY":
                            this.game.client.sendPartyLeave();
                            break;

                        case "/CREARPARTY":
                            if (!this._checkearYescribirMuerto()) {
                                this.game.client.sendPartyCreate();
                            }
                            break;

                        case "/PARTY":
                            if (!this._checkearYescribirMuerto()) {
                                this.game.client.sendPartyJoin();
                            }
                            break;

                        case "/COMPARTIRNPC":
                            if (!this._checkearYescribirMuerto()) {
                                this.game.client.sendShareNpc();
                            }
                            break;

                        case "/NOCOMPARTIRNPC":
                            if (!this._checkearYescribirMuerto()) {
                                this.game.client.sendStopSharingNpc();
                            }
                            break;

                        case "/ENCUESTA":
                            if (args.length === 0) {
                                this.game.client.sendInquiry();
                            } else {
                                if (!isNaN(args[0]) && (args[0] < 256)) {
                                    this.game.client.sendInquiryVote(args[0]);
                                } else {
                                    this.game.escribirMsgConsola("Para votar una opción, escribe /ENCUESTA NUMERODEOPCION, por ejemplo para votar la opcion 1, escribe /encuesta 1.", Font.WARNING);
                                }
                            }
                            break;

                        case "/CMSG":
                            if (args.length) {
                                this.game.client.sendGuildMessage(args.join(" "));
                            } else {
                                this.game.escribirMsgConsola("Escriba un mensaje.");
                            }
                            break;

                        case "/PMSG":
                            if (args.length) {
                                this.game.client.sendPartyMessage(args.join(" "));
                            } else {
                                this.game.escribirMsgConsola("Escriba un mensaje.");
                            }
                            break;

                        case "/CENTINELA":
                            if (args.length) {
                                if (!isNaN(args[0]) && (args[0] < 65536)) {
                                    this.game.client.sendCentinelReport(args[0]);
                                } else {
                                    this.game.escribirMsgConsola("El código de verificación debe ser numérico. Utilice /CENTINELA X, siendo X el código de verificación.");
                                }
                            }
                            else {
                                this.game.escribirMsgConsola("Faltan parámetros. Utilice /CENTINELA X, siendo X el código de verificación.");
                            }
                            break;

                        case "/ONLINECLAN":
                            this.game.client.sendGuildOnline();

                            break;
                        case "/ONLINEPARTY":
                            this.game.client.sendPartyOnline();

                            break;
                        case "/BMSG":
                            if (args.length) {
                                this.game.client.sendCouncilMessage(args.join(" "));
                            } else {
                                this.game.escribirMsgConsola("Escriba un mensaje.");
                            }
                            break;

                        case "/ROL":
                            if (args.length) {
                                this.game.client.sendRoleMasterRequest(args.join(" "));
                            } else {
                                this.game.escribirMsgConsola("Escriba una pregunta.");
                            }
                            break;

                        case "/GM":
                            this.game.client.sendGMRequest();
                            break;

                        case "/_BUG":
                            if (args.length) {
                                this.game.client.sendBugReport(args.join(" "));
                            } else {
                                this.game.escribirMsgConsola("Escriba una descripción del bug.");
                            }
                            break;

                        case "/DESC":
                            if (!this._checkearYescribirMuerto()) {
                                this.game.client.sendChangeDescription(args.join(" "));
                            }
                            break;

                        case "/VOTO":
                            if (args.length) {
                                this.game.client.sendGuildVote(args.join(" "));
                            } else {
                                this.game.escribirMsgConsola("Faltan parámetros. Utilice /VOTO NICKNAME.");
                            }
                            break;

                        case "/PENAS":
                            if (args.length) {
                                this.game.client.sendPunishments(args.join(" "));
                            } else {
                                this.game.escribirMsgConsola("Faltan parámetros. Utilice /PENAS NICKNAME.");
                            }
                            break;

                        // case "/CONTRASEÑA":
                        //     this.game.client.frmNewPassword.Show(vbModal, frmMain);
                        //     break;

                        case "/APOSTAR":
                            if (!this._checkearYescribirMuerto()) {
                                if (args.length) {
                                    if (!isNaN(args[0]) && (args[0] < 65536)) {
                                        this.game.client.sendGamble(args[0]);
                                    } else {
                                        this.game.escribirMsgConsola("Cantidad incorrecta. Utilice /APOSTAR CANTIDAD.");
                                    }
                                }
                                else {
                                    this.game.escribirMsgConsola("Faltan parámetros. Utilice /APOSTAR CANTIDAD.");
                                }
                            }
                            break;

                        case "/RETIRARFACCION":
                            if (!this._checkearYescribirMuerto()) {
                                this.game.client.sendLeaveFaction();
                            }
                            break;

                        case "/RETIRAR":
                            if (!this._checkearYescribirMuerto()) {
                                if (args.length) {
                                    if (!isNaN(args[0])) {
                                        this.game.client.sendBankExtractGold(args[0]);
                                    } else {
                                        this.game.escribirMsgConsola("Cantidad incorrecta. Utilice /RETIRAR CANTIDAD.");
                                    }
                                }
                                else {
                                    this.game.escribirMsgConsola("Cantidad incorrecta. Utilice /RETIRAR CANTIDAD.");
                                }
                            }
                            break;

                        case "/DEPOSITAR":
                            if (!this._checkearYescribirMuerto()) {
                                if (args.length) {
                                    if (!isNaN(args[0])) {
                                        this.game.client.sendBankDepositGold(args[0]);
                                    } else {
                                        this.game.escribirMsgConsola("Cantidad incorecta. Utilice /DEPOSITAR CANTIDAD.");
                                    }
                                }
                                else {
                                    this.game.escribirMsgConsola("Faltan parámetros. Utilice /DEPOSITAR CANTIDAD.");
                                }
                            }
                            break;

                        case "/DENUNCIAR":
                            if (args.length) {
                                this.game.client.sendDenounce(args.join(" "));
                            } else {
                                this.game.escribirMsgConsola("Formule su denuncia.");
                            }
                            break;

                        case "/FUNDARCLAN":
                            if (this.game.atributos.nivel > 24) {
                                this.game.client.sendGuildFundate();
                            } else {
                                this.game.escribirMsgConsola("Para fundar un clan tienes que ser nivel 25 y tener 90 skills en liderazgo.");
                            }
                            break;

                        case "/ECHARPARTY":
                            if (args.length) {
                                this.game.client.sendPartyKick(args.join(" "));
                            } else {
                                this.game.escribirMsgConsola("Faltan parámetros. Utilice /ECHARPARTY NICKNAME.");
                            }
                            break;

                        case "/PARTYLIDER":
                            if (args.length) {
                                this.game.client.sendPartySetLeader(args.join(" "));
                            } else {
                                this.game.escribirMsgConsola("Faltan parámetros. Utilice /PARTYLIDER NICKNAME.");
                            }
                            break;
                            
                        case "/ACCEPTPARTY":
                            if (args.length) {
                                this.game.client.sendPartyAcceptMember(args.join(" "));
                            } else {
                                this.game.escribirMsgConsola("Faltan parámetros. Utilice /ACCEPTPARTY NICKNAME.");
                            }
                            break;

                        case "/HOGAR":
                            this.game.client.sendHome();
                            break;

                        case "/CI":
                            if (args.length == 1 && !isNaN(args[0])) {
                                this.game.client.sendCreateItem(args[0]);
                            } else {
                                this.game.escribirMsgConsola("Faltan parámetros. Utilice /CI OBJ.");
                            }
                            break;

                        case "/DEST":
                            this.game.client.sendDestroyItems();
                            break;

                        case "/SUM":
                            if (args.length == 1) {
                                this.game.client.sendSummonChar(args[0]);
                            } else {
                                this.game.escribirMsgConsola("Faltan parámetros. Utilice /SUM USUARIO.");
                            }
                            break;

                        // TO DO: agregar mas validaciones/error handling
                        case "/TELEP":
                            if (args.length) {
                                if (args.length == 4) {
                                    this.game.client.sendWarpChar(args[0], args[1], args[2], args[3]);
                                } else {
                                    this.game.escribirMsgConsola("Faltan parámetros. Utilice /TELEP USUARIO MAPA X Y.");
                                }
                            } else {
                                this.game.escribirMsgConsola("Faltan parámetros. Utilice /TELEP USUARIO MAPA X Y.");
                            }
                            break;

                        case "/INVISIBLE":
                            this.game.client.sendInvisible();
                            break;

                        case "/TRABAJANDO":
                            this.game.client.sendWorking();
                            break;

                        case "/OCULTANDO":
                            this.game.client.sendHiding();
                            break;

                        case "/TELEPLOC":
                            this.game.client.sendWarpMeToTarget();
                            break;

                        case "/IRA":
                            if (args.length == 1) {
                                this.game.client.sendGoToChar(args[0]);
                            } else {
                                this.game.escribirMsgConsola("Faltan parámetros. Utilice /ira NICKNAME.");
                            }
                            break;

                        case "/SILENCIAR":
                            if (args.length == 1) {
                                this.game.client.sendSilence(args[0]);
                            } else {
                                this.game.escribirMsgConsola("Faltan parámetros. Utilice /silenciar NICKNAME.");
                            }
                            break;

                        // TO DO: crear popup con la lista de /GM requests
                        case "/SHOW":
                            if (args.length == 1) {
                                switch (args[0].toUpperCase()) {
                                    case "SOS":
                                        this.game.client.sendSOSShowList();
                                        break;
                                    default:
                                        break;
                                }
                            }
                            break;

                        case "/DENUNCIAS":
                            this.game.client.sendEnableDenounces();
                            break;

                        case "/BORRAR":
                            if (args.length == 1) {
                                switch (args[0].toUpperCase()) {
                                    case "SOS":
                                        this.game.client.sendSOSRemove();
                                        break;
                                    default:
                                        break;
                                }
                            }
                            break;

                        case "/CARCEL":
                            if (args.length == 3) {
                                this.game.client.sendJail(args[0], args[1], args[2]);
                            } else {
                                this.game.escribirMsgConsola("Faltan parámetros. Utilice /carcel NICKNAME MOTIVO TIEMPO.");
                            }
                            break;

                        case "/GMSG":
                            if (args.length) {
                                this.game.client.sendGMMessage(args.join(" "));
                            } else {
                                this.game.escribirMsgConsola("Escriba un mensaje.");
                            }
                            break;
                        
                        case "/SHOWNAME":
                            this.game.client.sendShowName();
                            break;
                        
                        case "/ONLINEREAL":
                            this.game.client.sendOnlineRoyalArmy();
                            break;

                        case "/ONLINECAOS":
                            this.game.client.sendOnlineChaosLegion();
                            break;

                        case "/IRCERCA":
                            if (args.length == 1) {
                                this.game.client.sendGoNearby(args[0]);
                            } else {
                                this.game.escribirMsgConsola("Faltan parámetros. Utilice /ircerca NICKNAME.");
                            }
                            break;
                            
                        case "/REM":
                            if (args.length) {
                                this.game.client.sendComment(args.join(" "));
                            } else {
                                this.game.escribirMsgConsola("Escriba un comentario.");
                            }
                            break;

                        case "/ONLINEGM":
                            this.game.client.sendOnlineGM();
                            break;

                        case "/SEGUIR":
                            this.game.client.sendNPCFollow();
                            break;

                        // TO DO: crear popup con lista de NPCs
                        case "/CC":
                            this.game.client.sendSpawnListRequest();
                            break;
                        
                        case "/RESETINV":
                            this.game.client.sendResetNPCInventory();
                            break;

                        case "/DONDE":
                            if (args.length == 1) {
                                this.game.client.sendWhere(args[0]);
                            } else {
                                this.game.escribirMsgConsola("Faltan parámetros. Utilice /donde NICKNAME.");
                            }
                            break;

                        case "/NENE":
                            if (args.length == 1 && !isNaN(args[0])) {
                                this.game.client.sendCreaturesInMap(args[0]);
                            } else {
                                this.game.escribirMsgConsola("Faltan parámetros. Utilice /nene MAPA.");
                            }
                            break;

                        case "/HORA":
                            this.game.client.sendServerTime();
                            break;

                        case "/RMATA":
                            this.game.client.sendKillNPC();
                            break;

                        case "/INFO":
                            if (args.length == 1) {
                                this.game.client.sendRequestCharInfo(args[0]);
                            } else {
                                this.game.escribirMsgConsola("Faltan parámetros. Utilice /info NICKNAME.");
                            }
                            break;

                        case "/EJECUTAR":
                            if (args.length == 1) {
                                this.game.client.sendExecute(args[0]);
                            } else {
                                this.game.escribirMsgConsola("Faltan parámetros. Utilice /ejecutar NICKNAME.");
                            }
                            break;
                        
                        case "/STAT":
                            if (args.length == 1) {
                                this.game.client.sendRequestCharStats(args[0]);
                            } else {
                                this.game.escribirMsgConsola("Faltan parámetros. Utilice /stat NICKNAME.");
                            }
                            break;

                        case "/BAL":
                            if (args.length == 1) {
                                this.game.client.sendRequestCharGold(args[0]);
                            } else {
                                this.game.escribirMsgConsola("Faltan parámetros. Utilice /bal NICKNAME.");
                            }
                            break;

                        case "/INV":
                            if (args.length == 1) {
                                this.game.client.sendRequestCharInventory(args[0]);
                            } else {
                                this.game.escribirMsgConsola("Faltan parámetros. Utilice /inv NICKNAME.");
                            }
                            break;
                        
                        case "/BOV":
                            if (args.length == 1) {
                                this.game.client.sendRequestCharBank(args[0]);
                            } else {
                                this.game.escribirMsgConsola("Faltan parámetros. Utilice /bov NICKNAME.");
                            }
                            break;

                        case "/SKILLS":
                            if (args.length == 1) {
                                this.game.client.sendRequestCharSkills(args[0]);
                            } else {
                                this.game.escribirMsgConsola("Faltan parámetros. Utilice /skills NICKNAME.");
                            }
                            break;

                        case "/REVIVIR":
                            if (args.length == 1) {
                                this.game.client.sendReviveChar(args[0]);
                            } else {
                                this.game.escribirMsgConsola("Faltan parámetros. Utilice /revivir NICKNAME.");
                            }
                            break;

                        case "/PERDON":
                            if (args.length == 1) {
                                this.game.client.sendForgive(args[0]);
                            } else {
                                this.game.escribirMsgConsola("Faltan parámetros. Utilice /perdon NICKNAME.");
                            }
                            break;

                        case "/LLUVIA":
                            this.game.client.sendRainToggle();
                            break;

                        case "/ONLINEMAP":
                            if (args.length == 1) {
                                this.game.client.sendOnlineMap(args[0]);
                            } else {
                                this.game.escribirMsgConsola("Faltan parámetros. Utilice /onlinemap MAPA.");
                            }
                            break;

                        case "/BAN":
                            if (args.length == 2) {
                                this.game.client.sendBanChar(args[0], args[1]);
                            } else {
                                this.game.escribirMsgConsola("Formato incorrecto. Utilice /ban NICKNAME MOTIVO.");
                            }
                            break;

                        case "/UNBAN":
                            if (args.length == 1) {
                                this.game.client.sendUnbanChar(args[0]);
                            } else {
                                this.game.escribirMsgConsola("Faltan parámetros. Utilice /unban NICKNAME.");
                            }
                            break;

                        case "/LIMPIAR":
                            this.game.client.sendCleanWorld();
                            break;

                        case "/RMSG":
                            if (args.length) {
                                this.game.client.sendServerMessage(args.join(" "));
                            } else {
                                this.game.escribirMsgConsola("Escriba un mensaje.");
                            }
                            break;
                        
                        case "/MAPMSG":
                            if (args.length) {
                                this.game.client.sendMapMessage(args.join(" "));
                            } else {
                                this.game.escribirMsgConsola("Escriba un mensaje.");
                            }
                            break;

                        case "/NICK2IP":
                            if (args.length == 1) {
                                this.game.client.sendNickToIP(args[0]);
                            } else {
                                this.game.escribirMsgConsola("Faltan parámetros. Utilice /nick2ip NICKNAME.");
                            }
                            break;

                        case "/IP2NICK":
                            if (args.length == 1) {
                                this.game.client.sendIPToNick(args[0]);
                            } else {
                                this.game.escribirMsgConsola("Faltan parámetros. Utilice /ip2nick IP.");
                            }
                            break;

                        case "/ONCLAN":
                            if (args.length) {
                                this.game.client.sendGuildOnlineMembers(args.join(" "));
                            } else {
                                this.game.escribirMsgConsola("Formato incorrecto. Utilice /onclan nombre del clan.");
                            }
                            break;

                        case "/CT":
                            if (args.length) {
                                if (args.length == 4) {
                                    this.game.client.sendTeleportCreate(args[0], args[1], args[2], args[3]);
                                } else {
                                    this.game.escribirMsgConsola("Faltan parámetros. Utilice /CT MAPA X Y RADIO.");
                                }
                            } else {
                                this.game.escribirMsgConsola("Faltan parámetros. Utilice /CT MAPA X Y RADIO.");
                            }
                            break;

                        case "/DT":
                            this.game.client.sendTeleportDestroy();
                            break;

                        case "/SETDESC":
                            if (args.length == 1) {
                                this.game.client.sendSetCharDescription(args[0]);
                            } else {
                                this.game.escribirMsgConsola("Faltan parámetros. Utilice /SETDESC DESCRIPCION.");
                            }
                            break;
                        
                        case "/FORCEMIDIMAP":
                            if (args.length == 2) {
                                this.game.client.sendForceMIDIToMap(args[0], args[1]);
                            } else {
                                this.game.escribirMsgConsola("Formato incorrecto. Utilice /FORCEMIDIMAP MIDI MAPA.");
                            }
                            break;
                            
                        case "/FORCEWAVMAP":
                            if (args.length == 2) {
                                this.game.client.sendForceWAVEToMap(args[0], args[1]);
                            } else {
                                this.game.escribirMsgConsola("Formato incorrecto. Utilice /FORCEWAVMAP WAV MAP.");
                            }
                            break;

                        case "/REALMSG":
                            if (args.length == 1) {
                                this.game.client.sendRoyalArmyMessage(args.join(" "));
                            } else {
                                this.game.escribirMsgConsola("Escriba un mensaje.");
                            }
                            break;
                            
                        case "/CAOSMSG":
                            if (args.length == 1) {
                                this.game.client.sendChaosLegionMessage(args.join(" "));
                            } else {
                                this.game.escribirMsgConsola("Escriba un mensaje.");
                            }
                        break;

                        case "/CIUMSG":
                            if (args.length == 1) {
                                this.game.client.sendCitizenMessage(args.join(" "));
                            } else {
                                this.game.escribirMsgConsola("Escriba un mensaje.");
                            }
                        break;

                        case "/CRIMSG":
                            if (args.length == 1) {
                                this.game.client.sendCriminalMessage(args.join(" "));
                            } else {
                                this.game.escribirMsgConsola("Escriba un mensaje.");
                            }
                        break;

                        case "/TALKAS":
                            if (args.length) {
                                this.game.client.sendTalkAsNPC(args.join(" "));
                            } else {
                                this.game.escribirMsgConsola("Escriba un mensaje.");
                            }
                        break;

                        case "/MASSDEST":
                            this.game.client.sendDestroyAllItemsInArea();
                            break;

                        case "/ACEPTCONSE":
                            if (args.length == 1) {
                                this.game.client.sendAcceptRoyalCouncilMember(args[0]);
                            } else {
                                this.game.escribirMsgConsola("Faltan parámetros. Utilice /ACEPTCONSE NICKNAME.");
                            }
                        break;

                        case "/ACEPTCONSECAOS":
                            if (args.length == 1) {
                                this.game.client.sendAcceptChaosCouncilMember(args[0]);
                            } else {
                                this.game.escribirMsgConsola("Faltan parámetros. Utilice /ACEPTCONSECAOS NICKNAME.");
                            }
                        break;

                        case "/PISO":
                            this.game.client.sendItemsInTheFloor();
                            break;

                        case "/KICK":
                            if (args.length == 1) {
                                this.game.client.sendKick(args[0]);
                            } else {
                                this.game.escribirMsgConsola("Faltan parámetros. Utilice /KICK NICKNAME.");
                            }
                        break;

                        case "/ESTUPIDO":
                            if (args.length == 1) {
                                this.game.client.sendMakeDumb(args[0]);
                            } else {
                                this.game.escribirMsgConsola("Faltan parámetros. Utilice /ESTUPIDO NICKNAME.");
                            }
                        break;

                        case "/NOESTUPIDO":
                            if (args.length == 1) {
                                this.game.client.sendMakeDumbNoMore(args[0]);
                            } else {
                                this.game.escribirMsgConsola("Faltan parámetros. Utilice /NOESTUPIDO NICKNAME.");
                            }
                        break;

                        case "/KICKCONSE":
                            if (args.length == 1) {
                                this.game.client.sendCouncilKick(args[0]);
                            } else {
                                this.game.escribirMsgConsola("Faltan parámetros. Utilice /KICKCONSE NICKNAME.");
                            }
                        break;

                        case "/TRIGGER":
                            if (args.length == 1 && !isNaN(args[0])) {
                                this.game.client.sendSetTrigger(args[0]);
                            } else {
                                this.game.escribirMsgConsola("Formato incorrecto. Utilice /TRIGGER NUMERO.");
                            }
                        break;

                        case "/ASKTRIGGER":
                            this.game.client.sendAskTrigger();
                        break;

                        case "/BANIPLIST":
                            this.game.client.sendBannedIPList();
                        break;

                        case "/BANIPRELOAD":
                            this.game.client.sendBannedIPReload();
                        break;

                        case "/MIEMBROSCLAN":
                            if (args.length == 1) {
                                this.game.client.sendGuildMemberList(args[0]);
                            } else {
                                this.game.escribirMsgConsola("Faltan parámetros. Utilice /MIEMBROSCLAN GUILDNAME.");
                            }
                        break;

                        case "/BANCLAN":
                            if (args.length == 1) {
                                this.game.client.sendGuildBan(args[0]);
                            } else {
                                this.game.escribirMsgConsola("Faltan parámetros. Utilice /BANCLAN GUILDNAME.");
                            }
                        break;

                        case "/BANIP":
                            if (args.length == 2) {
                                this.game.client.sendBanIP(args[0], args[1]);
                            } else {
                                this.game.escribirMsgConsola("Faltan parámetros. Utilice /BANIP IP MOTIVO o /BANIP NICK MOTIVO.");
                            }
                        break;

                        case "/UNBANIP":
                            if (args.length == 1) {
                                this.game.client.sendUnbanIP(args[0]);
                            } else {
                                this.game.escribirMsgConsola("Faltan parámetros. Utilice /unbanip IP.");
                            }
                        break;

                        case "/NOCAOS":
                            if (args.length == 2) {
                                this.game.client.sendChaosLegionKick(args[0]);
                            } else {
                                this.game.escribirMsgConsola("Faltan parámetros. Utilice /NOCAOS NICKNAME@MOTIVO.");
                            }
                        break;

                        case "/NOREAL":
                            if (args.length == 2) {
                                this.game.client.sendRoyalArmyKick(args[0]);
                            } else {
                                this.game.escribirMsgConsola("Faltan parámetros. Utilice /NOREAL NICKNAME@MOTIVO.");
                            }
                        break;

                        case "/FORCEMIDI":
                            if (args.length == 1 && !isNaN(args[0])) {
                                this.game.client.sendForceMIDIAll(args[0]);
                            } else {
                                this.game.escribirMsgConsola("Formato incorrecto. Utilice /FORCEMIDI MIDI.");
                            }
                        break;

                        case "/FORCEWAV":
                            if (args.length == 1 && !isNaN(args[0])) {
                                this.game.client.sendForceWAVEAll(args[0]);
                            } else {
                                this.game.escribirMsgConsola("Formato incorrecto. Utilice /FORCEWAV WAV.");
                            }
                        break;

                        case "/BORRARPENA":
                            if (args.length == 3) {
                                this.game.client.sendRemovePunishment(args[0], args[1], args[2]);
                            } else {
                                this.game.escribirMsgConsola("Formato incorrecto. Utilice /borrarpena NICK PENA NuevaPena.");
                            }
                        break;

                        case "/BLOQ":
                            this.game.client.sendTileBlockedToggle();
                        break;

                        case "/MATA":
                            this.game.client.sendKillNPCNoRespawn();
                        break;

                        case "/MASSKILL":
                            this.game.client.sendKillAllNearbyNPCs();
                        break;

                        case "/LASTIP":
                            if (args.length == 1) {
                                this.game.client.sendLastIP(args[0]);
                            } else {
                                this.game.escribirMsgConsola("Faltan parámetros. Utilice /LASTIP NICKNAME.");
                            }
                        break;

                        case "/MOTDCAMBIA":
                            if (args.length) {
                                this.game.client.sendSetMOTD(args.join(" "));
                            } else {
                                this.game.escribirMsgConsola("Escriba un nuevo MOTD.");
                            }
                        break;

                        case "/SMSG":
                            if (args.length) {
                                this.game.client.sendSystemMessage(args.join(" "));
                            } else {
                                this.game.escribirMsgConsola("Escriba un mensaje.");
                            }
                        break;

                        case "/ACC":
                            if (args.length == 1 && !isNaN(args[0])) {
                                this.game.client.sendCreateNPC(args[0]);
                            } else {
                                this.game.escribirMsgConsola("Faltan parámetros. Utilice /ACC NPC.");
                            }
                            break;

                        case "/RACC":
                            if (args.length == 1 && !isNaN(args[0])) {
                                this.game.client.sendCreateNPCWithRespawn(args[0]);
                            } else {
                                this.game.escribirMsgConsola("Faltan parámetros. Utilice /RACC NPC.");
                            }
                            break;

                        case "/AI":
                            if (args.length == 2) {
                                this.game.client.sendImperialArmour(args[0], args[1]);
                            } else {
                                this.game.escribirMsgConsola("Faltan parámetros. Utilice /AI ARMADURA OBJETO.");
                            }
                        break;

                        case "/AC":
                            if (args.length == 2) {
                                this.game.client.sendChaosArmour(args[0], args[1]);
                            } else {
                                this.game.escribirMsgConsola("Faltan parámetros. Utilice /AC ARMADURA OBJETO.");
                            }
                        break;

                        case "/NAVE":
                            this.game.client.sendNavigateToggle();
                        break;

                        case "/HABILITAR":
                            this.game.client.sendServerOpenToUsersToggle();
                        break;

                        case "/APAGAR":
                            this.game.client.sendTurnOffServer();
                        break;

                        case "/CONDEN":
                            if (args.length == 1) {
                                this.game.client.sendTurnCriminal(args[0]);
                            } else {
                                this.game.escribirMsgConsola("Faltan parámetros. Utilice /CONDEN NICKNAME.");
                            }
                        break;

                        case "/RAJAR":
                            if (args.length == 1) {
                                this.game.client.sendResetFactions(args[0]);
                            } else {
                                this.game.escribirMsgConsola("Faltan parámetros. Utilice /RAJAR NICKNAME.");
                            }
                        break;

                        case "/RAJARCLAN":
                            if (args.length == 1) {
                                this.game.client.sendRemoveCharFromGuild(args[0]);
                            } else {
                                this.game.escribirMsgConsola("Faltan parámetros. Utilice /RAJARCLAN NICKNAME.");
                            }
                        break;

                        case "/LASTEMAIL":
                            if (args.length == 1) {
                                this.game.client.sendRequestCharMail(args[0]);
                            } else {
                                this.game.escribirMsgConsola("Faltan parámetros. Utilice /LASTEMAIL NICKNAME.");
                            }
                        break;

                        case "/APASS":
                            if (args.length == 2) {
                                this.game.client.sendAlterPassword(args[0], args[1]);
                            } else {
                                this.game.escribirMsgConsola("Faltan parámetros. Utilice /APASS PJSINPASS@PJCONPASS.");
                            }
                        break;

                        case "/AEMAIL":
                            if (args.length == 2) {
                                this.game.client.sendAlterMail(args[0], args[1]);
                            } else {
                                this.game.escribirMsgConsola("Faltan parámetros. Utilice /AEMAIL NICKNAME-NUEVOMAIL.");
                            }
                        break;

                        case "/ANAME":
                            if (args.length == 2) {
                                this.game.client.sendAlterName(args[0], args[1]);
                            } else {
                                this.game.escribirMsgConsola("Faltan parámetros. Utilice /ANAME ORIGEN@DESTINO.");
                            }
                        break;

                        case "/CENTINELAACTIVADO":
                            this.game.client.sendToggleCentinelActivated();
                        break;

                        case "/DOBACKUP":
                            this.game.client.sendDoBackUp();
                        break;

                        case "/SHOWCMSG":
                            if (args.length == 1) {
                                this.game.client.sendShowGuildMessages(args[0]);
                            } else {
                                this.game.escribirMsgConsola("Faltan parámetros. Utilice /SHOWCMSG GUILDNAME.");
                            }
                        break;

                        case "/GUARDAMAPA":
                            this.game.client.sendSaveMap();
                        break;

                        case "/MODMAPINFO":
                            if (args.length == 2) {
                                switch (args[0].toUpperCase()) {
                                    case "PK":
                                        this.game.client.sendChangeMapInfoPK(args[1]);
                                        break;
                                    case "BACKUP":
                                        this.game.client.sendChangeMapInfoBackup(args[1]);
                                        break;
                                    case "RESTRINGIR":
                                        this.game.client.sendChangeMapInfoRestricted(args[1]);
                                        break;
                                    case "MAGIASINEFECTO":
                                        this.game.client.sendChangeMapInfoNoMagic(args[1]);
                                        break;
                                    case "INVISINEFECTO":
                                        this.game.client.sendChangeMapInfoNoInvi(args[1]);
                                        break;
                                    case "RESUSINEFECTO":
                                        this.game.client.sendChangeMapInfoNoResu(args[1]);
                                        break;
                                    case "TERRENO":
                                        this.game.client.sendChangeMapInfoLand(args[1]);
                                        break;
                                    case "ZONA":
                                        this.game.client.sendChangeMapInfoZone(args[1]);
                                        break;             
                                    case "ROBONPC":
                                        this.game.client.sendChangeMapInfoStealNpc(args[1]);
                                        break;
                                    case "OCULTARSINEFECTO":
                                        this.game.client.sendChangeMapInfoNoOcultar(args[1]);
                                        break;
                                    case "INVOCARSINEFECTO":
                                        this.game.client.sendChangeMapInfoNoInvocar(args[1]);
                                        break;
                                    default:
                                        break;
                                }
                            }
                        break;

                        case "/GRABAR":
                            this.game.client.sendSaveChars();
                        break;

                        case "/BORRARSOS":
                            this.game.client.sendCleanSOS();
                        break;
                        
                        case "/NOCHE":
                            this.game.client.sendNight();
                        break;

                        case "/ECHARTODOSPJS":
                            this.game.client.sendKickAllChars();
                        break;

                        case "/NOCHE":
                            this.game.client.sendNight();
                        break;

                        case "/RELOADNPCS":
                            this.game.client.sendReloadNPCs();
                        break;

                        case "/RELOADSINI":
                            this.game.client.sendReloadServerIni();
                        break;

                        case "/RELOADHECHIZOS":
                            this.game.client.sendReloadSpells();
                        break;

                        case "/RELOADOBJ":
                            this.game.client.sendReloadObjects();
                        break;

                        case "/REINICIAR":
                            this.game.client.sendRestart();
                        break;

                        case "/AUTOUPDATE":
                            this.game.client.sendResetAutoUpdate();
                        break;

                        case "/CHATCOLOR":
                            if (args.length == 3) {
                                this.game.client.sendChatColor(args[0], args[1], args[2]);
                            } else {
                                this.game.escribirMsgConsola("Faltan parámetros. Utilice /CHATCOLOR R G B.");
                            }
                        break;

                        case "/IGNORADO":
                            this.game.client.sendIgnored();
                        break;

                        case "/SLOT":
                             if (args.length == 2) {
                                 this.game.client.sendCheckSlot(args[0], args[1]);
                             } else {
                                this.game.escribirMsgConsola("Faltan parámetros. Utilice /SLOT NICK@SLOT.");
                            }
                        break;

                        // TO DO: handlePong
                        case "/PING":
                            this.game.client.sendPing();
                        break;

                        case "/SETINIVAR":
                             if (args.length == 3) {
                                 this.game.client.sendSetIniVar(args[0], args[1], args[2]);
                             } else {
                                this.game.escribirMsgConsola("Faltan parámetros. Utilice /SETINIVAR LLAVE CLAVE VALOR.");
                            }
                        break;

                        case "/CREARPRETORIANOS":
                            if (args.length == 3) {
                                this.game.client.sendCreatePretorianClan(args[0], args[1], args[2]);
                            }
                        break;

                        case "/ELIMINARPRETORIANOS":
                            if (args.length == 1) {
                                this.game.client.sendRemovePretorianClan(args[0]);
                            }
                        break;

                        case "/SETDIALOG":
                            if (args.length) {
                                this.game.client.sendSetDialog(args.join(" "));
                            } else {
                                this.game.escribirMsgConsola("Faltan parámetros. Utilice /SETDIALOG DIALOGO.");
                            }
                        break;

                        case "/IMPERSONAR":
                            this.game.client.sendImpersonate();
                        break;

                        case "/MIMETIZAR":
                            this.game.client.sendImitate();
                        break;

                        case "/ACLAN":
                            if (args.length == 2) {
                                this.game.client.sendAlterGuildName(args[0], args[1]);
                            } else {
                                this.game.escribirMsgConsola("Formato incorrecto. Utilice /ACLAN ORIGEN@DESTINO.");
                            }
                        break;

                        case "/DMSG":
                            if (args.length) {
                                this.game.client.sendHigherAdminsMessage(args.join(" "));
                            } else {
                                this.game.escribirMsgConsola("Escriba un mensaje.");
                            }
                        break;

                        case "/FUNDARCLANGM":
                            this.game.client.sendGuildFundation();
                            break;

                        default:
                            valido = false;
                            break;

                    }

                }
                else {
                    valido = false;
                }
                if (!valido) {
                    this.game.escribirMsgConsola("Comando invalido", Font.WARNING);
                }
            }

            else {
                return message;
            }
        }

    }

    return ComandosChat;
});