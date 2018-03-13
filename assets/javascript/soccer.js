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
        let ht = 0;

        //Set game as in progress

        inProgress = true;

        let events = [
            'have scored!',
            'shot and missed',
            'missed by a mile',
            'received a yellow card',
            'have a corner',
            'have a free-kick',
            'have wasted a really good chance wasted',
            'with the decent build but not much to show for it',
            'with the long ball',
            'hold the ball'
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

            //Check if game finished 
            if(parseInt(minute.text()) == 90) {
                //Is 90th minute
                clearInterval(match);


                //Check for winner
                if(parseInt($('span[data-id="' + teams[0] + '"]').text()) > parseInt($('span[data-id="' + teams[1] + '"]').text())){
                    //Team 1 wins
                    $('.fact-card').append(`<p class="one-event">` + teams[0] `wins!</p>`)
                }else if (parseInt($('span[data-id="' + teams[1] + '"]').text()) > parseInt($('span[data-id="' + teams[0] + '"]').text())) {
                    //Team 2 wins
                    $('.fact-card').append(`<p class="one-event">` + teams[1] `wins!</p>`)
                }else{
                    //Draw
                    $('.fact-card').append('<p class="one-event">It\'s a draw!</p>')
                }

                //Keep div scrolled to bottom
                $('.fact-card').scrollTop(1E10);
                
                //Play end whistle
                lwSFX.play();
    
                //Pause crowd
                crowdSFX.pause();

                return false;
            }

            //Check if half time 
            if (parseInt(minute.text()) == 45){
                //Is half time
                if(ht <= 20){
                    //Pause for 20 game minutes
                    if (ht == 0){
                        $('.fact-card').append('<p class="one-event">It\'s half time</p>')

                        //Play half time whistle
                        swSFX.play();
                    }
                

                    if(ht == 20){
                        //Ready to start second half
                        $('.fact-card').append('<p class="one-event">The second half has started</p>');
                        //Play whistle
                        swSFX.play();

                    }
                    $('.fact-card').scrollTop(1E10);
                    ht++;
                    return false;
                }
                
            }

            //Increment time 

            minute.text(parseInt(minute.text())+1);

            //Create some events
            let thisEvent = randUpTo(100);

            if(thisEvent < 20){
                //1 in 20 chance = 20 to 1 chance of being an event in this loop
                
                //Decide team event is occuring with
                let whichTeam = randUpTo(2);

                //Get the event was 
                let eventHappened = randUpTo(events.length);

                //Add event to fact card 
                $('.fact-card').append('<p class="one-event">' + minute.text() + ' - ' + teams[whichTeam - 1] + ' ' + events[eventHappened - 1] + '</p>')

                //Keep scrolling
                $('.fact-card').scrollTop(1E10);

                if(eventHappened - 1 == 0){
                    //Goal!

                    //Play goal sound

                    let score = $('span[data-id="'+ teams[whichTeam - 1] + '"]');

                    //Add goal to scorecard
                    score.text(parseInt(score.text()) + 1);
                    goalSFX.play();
                }
            }

        }, 200);

    })




});