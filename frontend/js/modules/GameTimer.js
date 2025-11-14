class GameTimer
{
    constructor(elementID , duration)
    {
        this.timerElement = document.getElementById(elementID);
        this.duration = duration;
        this.timeLeft = duration;
        this.timeRunning = false;
        this.countdown = null;
        this.onTimeFinishFunction = null;
    }


    startTimer(onTimeFinishFunc){
        if(this.timeRunning)
        {
            this.stop();
        }

        this.onTimeFinishFunction = onTimeFinishFunc;

        this.timeLeft = this.duration;
        this.timeRunning = true;

        this.timerElement.textContent = this.timeLeft;

        this.countdown = setInterval(() => {
            this.timeLeft--;
            this.timerElement.textContent = this.timeLeft;

            if(this.timeLeft <= 0)
            {
                this.stop();
                if(this.onTimeFinishFunction)
                {
                    this.onTimeFinishFunction();
                }
            }
        },1000)
    }

    stop(){
        clearInterval(this.countdown);
        this.timeRunning = false;
    }

    reset(){
        this.stop();
        this.timeLeft = this.duration;
        this.timerElement.textContent = this.duration;
    }
}

export {GameTimer}