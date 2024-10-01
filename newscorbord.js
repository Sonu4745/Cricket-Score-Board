//Cretae dropDownId down
let dropDownId = document.getElementById("players-slected");
let optionHTML = "<option value='' selected disabled></option>";
//all Players Data
let allPlayerDetails = [
    {
        playerName: "Player 1",
        id: "1",
        runs: 0,
        balls: 0,
        playingStatus: 1,
        onstrike: false,
    },
    {
        playerName: "Player 2",
        id: "2",
        runs: 0,
        balls: 0,
        playingStatus: 1,
        onstrike: false,
    },
    {
        playerName: "Player 3",
        id: "3",
        runs: 0,
        balls: 0,
        playingStatus: 0,
        onstrike: false,
    },
    {
        playerName: "Player 4",
        id: "4",
        runs: 0,
        balls: 0,
        playingStatus: 0,
        onstrike: false,
    },
    {
        playerName: "Player 5",
        id: "5",
        runs: 0,
        balls: 0,
        playingStatus: 0,
        onstrike: false,
    },
    {
        playerName: "Player 6",
        id: "6",
        runs: 0,
        balls: 0,
        playingStatus: 0,
        onstrike: false,
    },
    {
        playerName: "Player 7",
        id: "7",
        runs: 0,
        balls: 0,
        playingStatus: 0,
        onstrike: false,
    },
    {
        playerName: "Player 8",
        id: "8",
        runs: 0,
        balls: 0,
        playingStatus: 0,
        onstrike: false,
    },
    {
        playerName: "Player 9",
        id: "9",
        runs: 0,
        balls: 0,
        playingStatus: 0,
        onstrike: false,
    },
    {
        playerName: "Player 10",
        id: "10",
        runs: 0,
        balls: 0,
        playingStatus: 0,
        onstrike: false,
    },
    {
        playerName: "Player 11",
        id: "11",
        runs: 0,
        balls: 0,
        playingStatus: 0,
        onstrike: false,
    },
];
//dropDownId down for Loop
for (let index = 0; index < allPlayerDetails.length; index++) {
    const element = allPlayerDetails[index];
    optionHTML += `<option value="${element.id}">${element.playerName} </option>`;
}
dropDownId.innerHTML = optionHTML;
let ball = document.getElementById("balls").value;

// create variable
let totalTeamBalls = 0;
let teamExtraRun = 0;
let totalExtraRunTeam = 0;
let notRunPlayer = 0;
let totalTeamRun = 0;
let totalTeamRun2 = 0;
let totalwideBallCount = 0;
let wicket = 0;
let outPlayerIndex = null;

const teamSummaryObject = {
    balls: 0,
    runs: 0,
    wicket: 0,
    extra: {
        totalExtraRuns: 0,
        wideBall: 0,
        wideExtraRuns: 0,
        noBall: 0,
        noBallExtraRuns: 0,
        legBy: 0,
        legByExtraRuns: 0,
    },
};

//start function
function updateScore(isOut = false) {
    if (!dropDownId.value) {
        alert("Please select a player");
        return;
    }

    let selectedPlayerIndex = dropDownId.selectedIndex;
    let onStrikePlayer = allPlayerDetails[selectedPlayerIndex - 1];
    onStrikePlayer.onstrike = true;
    let nonStrikePlayer = allPlayerDetails.find(
        (el) => el.playingStatus == 1 && el.onstrike == false
    );

    // balls in one over
    const totalBallInOver = 6;

    //print first table
    let print = `<br> <table class="table table-bordered "> 
    <tr>  
    <th>Player Name</th><th >Player Run</th>  
    <th>Player Ball</th> <th> Score Avrg</th> 
    </tr> `;

    //print second table
    let print2 = ` <table class="table table-bordered text-center"> 
    <tr><th>Score</th>
    <th> Overs</th>
    <th> No Ball</th>
    <th> Wide Ball</th>
    <th>Extra Run</th>
    <th> Team Avg</th>
    </tr>`;

    // get value by id and assign in variable
    let ball = document.getElementById("balls").value;
    let run = document.getElementById("playerRun").value;
    let outReason = document.getElementById("player-out").value;

    let newRun = !run ? 0 : parseInt(run);
    if (isOut) {
        if (outReason == "catchOut" || outReason == "bowled") {
            newRun = 0;
            allPlayerDetails[outPlayerIndex].balls++;
        }

        // player runs increased when player is run-out
        if (outReason == "runOut") {
            allPlayerDetails[outPlayerIndex].runs += newRun;
            allPlayerDetails[outPlayerIndex].balls++;
        }

        // player balls increased when player is out
    }

    if (isNaN(newRun)) {
        alert('Please enter a valid number in "Player Run" field');
        return;
    }

    if (ball == "regular") {
        totalTeamBalls++;
        teamSummaryObject.balls++;
        teamSummaryObject.runs += newRun;
    } else if (ball == "noBall") {
        teamSummaryObject.extra.noBall++;
        teamSummaryObject.extra.noBallExtraRuns++;
        teamSummaryObject.extra.totalExtraRuns++;
        teamSummaryObject.runs++;
        teamSummaryObject.runs += newRun;
    } else if (ball == "wide") {
        teamSummaryObject.extra.wideBall++;
        teamSummaryObject.extra.wideExtraRuns++;
        teamSummaryObject.extra.totalExtraRuns++;
        teamSummaryObject.extra.totalExtraRuns += newRun;
        teamSummaryObject.runs++;
        teamSummaryObject.runs += newRun;
    } else if (ball == "legBy") {
        totalTeamBalls++;
        teamSummaryObject.balls++;
        teamSummaryObject.runs += newRun;
        teamSummaryObject.extra.legBy++;
        teamSummaryObject.extra.legByExtraRuns += newRun;
        teamSummaryObject.extra.totalExtraRuns += newRun;
    }

    for (let i = 0; i < allPlayerDetails.length; i++) {
        const details = allPlayerDetails[i];

        //starting condition if selected input option and player id same to run work
        if (dropDownId.value == details.id) {
            if (ball == "noBall" || ball == "regular") {
                if (isOut && outReason == "runOut") {
                } else {
                    details.runs += newRun;
                }
            }
            if (ball == "noBall" || ball == "regular" || ball == "legBy") {
                if (!isOut) {
                    details.balls++;
                }
            }
        }
    }

    let teamOver = totalTeamBalls / totalBallInOver;
    let firstOver = parseInt(teamOver);
    let teamOverBall = totalTeamBalls % totalBallInOver;

    // strike work here
    if (newRun % 2 == 0) {
        // 0,2,4,6
        if (teamOverBall == 0) {
            onStrikePlayer.onstrike = false;
            nonStrikePlayer.onstrike = true;
            dropDownId.value = nonStrikePlayer.id;
        }
    } else {
        // 1,3,5
        if (teamOverBall != 0) {
            onStrikePlayer.onstrike = false;
            nonStrikePlayer.onstrike = true;
            dropDownId.value = nonStrikePlayer.id;
        }
    }
    // starting loop outer object all player data
    for (let j = 0; j < allPlayerDetails.length; j++) {
        let playerStatus = allPlayerDetails[j].playingStatus == 2 ? " - OUT" : "";
        let onStrikeStatus =
            allPlayerDetails[j].playingStatus == 1 &&
                allPlayerDetails[j].onstrike == true
                ? " - On Strike"
                : allPlayerDetails[j].playingStatus == 1 &&
                    allPlayerDetails[j].onstrike == false
                    ? " - Non Strike"
                    : "";
        let bgColorOut;
        let txtColor;
        if (allPlayerDetails[j].playingStatus == 2) {
            bgColorOut = "red";
            txtColor = "white";
        }
        if (allPlayerDetails[j].playingStatus == 1 &&
            allPlayerDetails[j].onstrike == true) {
            bgColorOut = "#55945f";
            txtColor = "white";
        }
        if (
            allPlayerDetails[j].playingStatus == 1 &&
            allPlayerDetails[j].onstrike == false
        ) {
            bgColorOut = "#99a899";
            txtColor = "white";
        }
        const avg = isNaN(allPlayerDetails[j].runs / allPlayerDetails[j].balls)
            ? "0.00": (allPlayerDetails[j].runs / allPlayerDetails[j].balls).toFixed(2);
            
        print += `<tr  id=${allPlayerDetails[j].id}><td  style="background-color: ${bgColorOut} ;  color: ${txtColor};" >${allPlayerDetails[j].playerName} ${playerStatus} ${onStrikeStatus}  </td>
         <td style="background-color: ${bgColorOut} ;  color: ${txtColor};">${allPlayerDetails[j].runs}</td><td style="background-color: ${bgColorOut} ;  color: ${txtColor};">${allPlayerDetails[j].balls}</td>
         <td style="background-color: ${bgColorOut};  color: ${txtColor}; " >${avg}</td></tr>`;
    }
    // table first closing tag
    print += `</table>`;
    //print table upper div round box to count ball
    let firstNoBall = "";
    if (ball == "noBall") {
        firstNoBall = "NB";
    } else if (ball == "legBy") {
        firstNoBall = "LB";
    } else if (ball == "wide") {
        firstNoBall = "WB";
    }
    let outColorChange;
    let outTxtColor;

    if (
        (ball == "noBall") && (outReason == "catchOut" || outReason == "bowled")
    ) {
        newRun = "";
        firstNoBall = "N.Out";
        wicket--;
        teamSummaryObject.wicket--;
    }

    if (wicket && isOut) {

        if (outReason == "catchOut") {
            newRun = "";
            firstNoBall = "C.Out";
        } else if (outReason == "bowled") {
            newRun = "";
            firstNoBall = "Bold";
        } else if (outReason == "runOut") {
            newRun = "";
            firstNoBall = "R.Out";
        }
        outColorChange = "red";
        outTxtColor = "white";
    } else {
        outTxtColor = "black";
    }
    if (newRun == 4 || newRun == 6)
        (outColorChange = "green"), (outTxtColor = "white");

    playerOverBall = `<span id="bgred" style="height: 35px; font-size:11px; 
       display:flex; align-items: center;background-color: ${outColorChange} ; color: ${outTxtColor}; 
        justify-content: center;  width: 35px; border: 1px solid ${outTxtColor} ;
        
         border-radius: 100px;">${newRun}${firstNoBall}</span>`;
    //second table count teams run
    let teamAvrg = teamSummaryObject.runs / teamOver;
    let teamDecimal = teamAvrg.toFixed(2);
    print2 += `<tr><td>${teamSummaryObject.runs} - ${teamSummaryObject.wicket}</td>
    <td>${firstOver}.${teamOverBall}</td>
    <td>${teamSummaryObject.extra.noBall}</td><td>${teamSummaryObject.extra.wideBall}</td>
    <td>${teamSummaryObject.extra.totalExtraRuns}</td>
    <td>${teamDecimal}</td></tr>`;

    //closing second  table  tag
    print2 += `</table>`;
    if (totalTeamBalls % 6 == 1) {
        document.getElementById("printing5").innerHTML = "";
        document.getElementById("printing5").innerHTML += playerOverBall;
    } else {
        document.getElementById("printing5").innerHTML += playerOverBall;
    }
    document.getElementById("printing").innerHTML = print;
    document.getElementById("printingTeams").innerHTML = print2;
    outPlayerIndex = null;
}

function out() {
    if (!dropDownId.value) {
        alert("Please select a player");
        return;
    }
    wicket++;
    teamSummaryObject.wicket++;
    let ball = document.getElementById("balls").value;
    if (ball == "noBall") {
        updateScore(false);
        return;
    }
    const selectedPlayerIndex = dropDownId.selectedIndex;
    outPlayerIndex = selectedPlayerIndex - 1;
    const onStrikePlayer = allPlayerDetails[outPlayerIndex];
    dropDownId.options[selectedPlayerIndex].disabled = true;
    onStrikePlayer.playingStatus = 2;
    onStrikePlayer.onstrike = false;
    for (let k = 0; k < allPlayerDetails.length; k++) {
        let el = allPlayerDetails[k];
        if (el.playingStatus == 0) {
            el.playingStatus = 1;
            dropDownId.value = el.id;
            break;
        }
    }
    if (wicket == 10) {
        const exampleModal = new bootstrap.Modal("#myModal", {
            keyboard: false,
        });
        exampleModal.show();
    }
    updateScore(true);
}

