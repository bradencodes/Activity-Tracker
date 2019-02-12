class Activity {
    constructor(name, adds, targetTime, onDays) {
        this.name = name;
        this.adds = adds;
        this.targetTime = targetTime; //the amount of time to spend on the activity in milliseconds
        this.onDays = onDays; //ex 0 = weekly, 1 = daily, [0,1,0,1,0,1,0] = MWF
        this.isActive = false; //true if the user is doing this activity
        this.started = []; //holds all the unix times when the activity was started
        this.ended = []; //holds all the unix times when the activity was ended
        this.progress = onDays ? [0,0,0,0,0,0,0] : 0; //Time spent on activity
    }

    start() {
        this.started.push(Date.now());
        this.ended.push(Date.now());
        this.isActive = true;
    }

    update() {
        //update the unix time of the last element in this.ended since the activity is ongoing
        this.ended[this.ended.length-1] = Date.now();

        //helper function to sum using Array.reduce()
        function getSum(total, num) {
            return total + num;
        }
        
        //get the total time spent on the activity by subtracting the total of ended - the total of started
        this.progress = this.ended.reduce(getSum) - this.started.reduce(getSum)
    }

    end() {
        this.update();
        this.isActive = false;
    }
}