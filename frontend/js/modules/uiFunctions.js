const messageScreen = document.querySelector(".messages-screen");
const informationSection = document.querySelector(".information-section");
const playSection = document.querySelector(".play-section");
const questionTextElement = document.querySelector("#question");

function setMessageScreen(message , bgcolor , durationToReset)
{
    let durationInMilliseconds = durationToReset * 1000;
    messageScreen.innerHTML = message;
    messageScreen.style.backgroundColor = bgcolor;
    setTimeout(() => {
        resetMessageScreen();
    } , durationInMilliseconds)
}

function showPlaySection() 
{
    informationSection.classList.remove("showInformationSection");
    informationSection.classList.add("hideInformationSection")

    setTimeout(() => {
        playSection.classList.remove("hidePlaySection");
        playSection.classList.add("showPlaySection");
    }, 300)
}

function showWaitSection()
{
    playSection.classList.remove("showPlaySection");
    playSection.classList.add("hidePlaySection")

    setTimeout(() => {
        informationSection.classList.remove("hideInformationSection");
        informationSection.classList.add("showInformationSection");
    }, 300)
}

function setWaitingScreen(team="" , state="active")
{
    if(state === "win")
    {    
        informationSection.innerHTML = `${team.name} Won!`;
        informationSection.style.backgroundColor = team.hexcode;
    }
    else if(state === "draw")
    {
        informationSection.innerHTML = `It's a draw`;
    }
    else if(state === "active")
    {    
        informationSection.innerHTML = `${team.name} Picking`;
        informationSection.style.backgroundColor = team.hexcode;
    }
}

function setStartingScreen(activeTeam)
{
    if(activeTeam.name === "Green")
    {
        informationSection.innerHTML = "Green Starting";
        informationSection.style.backgroundColor = activeTeam.hexcode;
    }
    else
    {
        informationSection.innerHTML = "Orange Starting";
        informationSection.style.backgroundColor = activeTeam.hexcode;
    }
}

function setQuestionToScreen(questionText)
{
    questionTextElement.innerHTML = questionText;
}


export {setMessageScreen ,  showPlaySection , showWaitSection , setWaitingScreen , setQuestionToScreen , setStartingScreen}

// ! HELPERS FUNCTION 
export function resetMessageScreen()
{
    messageScreen.innerHTML = "";
    messageScreen.style.backgroundColor = "white";
} 