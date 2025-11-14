function generateLetter()
{
    var letter;
    while(true)
    {
        letter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        if(letter != "X")
        {
            break;
        }
    }
    return letter;
}

export {generateLetter};