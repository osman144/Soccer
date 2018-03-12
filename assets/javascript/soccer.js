$(document).ready(function(){
    //set variables
    let inProgress = false;
    let goalSFX = new Audio('./assets/images/goal.wav');
    let crowdSFX = new Audio('./assets/images/crowd.wav');
    let lwSFX = new Audio('./assets/images/lw.wav');
    let swSFX = new Audio('./assets/images/sw.aiff');

    //volume, adjust as needed 

    if (typeof crowdSFX.loop == 'boolean')
    {
        crowdSFX.loop = true;
    }
    else
    {
        crowdSFX.addEventListener('ended', function() {
            this.currentTime = 0;
            this.play();
        }, false);
    }

    goalSFX.volume;
    lwSFX.volume;
    swSFX.volume;

    //Generate a random number 
    function randUpTo(number){
        return Math.floor(Math.random () * number) + 1;
    }

    //Start Game
    $('.button').click(function(){
        if (inProgress == true){
            //Game in progress
            return false;
        }

        //Game not in progress. Load sounds, begin game 
        crowdSFX.play();
        lwSFX.play();

        $('.time').text('0');

        //More in game variables 

        let minute = $('.time');
        let halftime = 45;

        //Set game as in progress

        inProgress = true;

        let events = [
            'have scored!',
            'shot and missed',
            'missed by a mile',
            'received a yellow card',
            'have had a player sent off',
            'have a corner',
            'have a free-kick',
        ]

        let teams = [
            'Arsenal',
            'Chelsea'
        ];

        // Start displaying facts 
        $('.fact-card').append('<p class="one-event">And we\'re off!');

        //Start Interval

        let match = setInterval(function(){
            //loop 5 times per sec

            //Increment time 
            minute.text(parseInt(minute.text())+1);

            //Check if game finished 
            if(parseInt(minute.text()) == 90) {
                //Is 90th minute
                clearInterval(match);
                crowdSFX.pause();
                crowdSFX.currentTime = 0;
            }
        },200);

    })




});