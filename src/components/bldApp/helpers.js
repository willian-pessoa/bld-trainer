export const accurateTimer = (fn, time = 1000) => {
    // nextAt is the value for the next time the timer should fire.
    // timeout holds the timeoutID so the timer can be stopped.
    let nextAt, timeout;
    // Initilzes nextAt as now + the time in milliseconds you pass
    // to accurateTimer.
    nextAt = new Date().getTime() + time;

    // This function schedules the next function call.
    const wrapper = () => {
        // The next function call is always calculated from when the
        // timer started.
        nextAt += time;
        // this is where the next setTimeout is adjusted to keep the
        //time accurate.
        timeout = setTimeout(wrapper, nextAt - new Date().getTime());
        // the function passed to accurateTimer is called.
        fn();
    };

    // this function stops the timer.
    const cancel = () => clearTimeout(timeout);

    // the first function call is scheduled.
    timeout = setTimeout(wrapper, nextAt - new Date().getTime());

    // the cancel function is returned so it can be called outside
    // accurateTimer.
    return { cancel };
};

// to format the timer receive in thSeconds
export const formatTime = (time) => {
    let min = Math.trunc(time / 600);
    let sec = (time / 10) % 60;

    return(
        (min < 10 ? "0" + min : min) + ":" + 
        (sec < 10 ? "0" + sec : sec)
    );
  }

// function to generate 
export const generateRandom = (amount, max) => {
  let arrRandoms = [];
  while (arrRandoms.length < amount){
    let random = Math.floor(Math.random() * max);
    if (!arrRandoms.some(item => item === random)){
      arrRandoms.push(random);
    }
  }
  return arrRandoms;
} 