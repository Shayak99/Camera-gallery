let video = document.querySelector("video");
let recordbtncont = document.querySelector(".record-btn-cont");
let capturebtncont = document.querySelector(".capture-btn-cont");
let recordbtn = document.querySelector(".record-btn");
let capturebtn = document.querySelector(".capture-btn");

let recordflag = false;

let constraints ={
    video: true,
    audio: true
}
// navigator - global, browser info
let recorder;
let chunks = [];  // media data in chunks

navigator.mediaDevices.getUserMedia(constraints)
.then((stream) => {
     video.srcObject = stream;
     recorder = new MediaRecorder(stream);
     recorder.addEventListener("start", e => {
         chunks = [];
     })
     recorder.addEventListener("dataavailable", e => {
         chunks.push(e.data);
     })
     recorder.addEventListener("stop", e => {
        // conversion of chunks to video
        let blob = new Blob(chunks, { type: "video-mp4" })
        let videourl = URL.createObjectURL(blob)

        let a = document.createElement("a");
        a.href = videourl;
        a.download = "stream.mp4";
        a.click();
     })
})

recordbtncont.addEventListener("click", (e) => {
    if(!recorder) return;

    recordflag = !recordflag;

    if(recordflag) {
        //start
        recorder.start();
        recordbtn.classList.add("scale-record");
        starttimer();
    }
    else{
        //stop
        recorder.stop();
        recordbtn.classList.remove("scale-record");
        stoptimer();
    }
})

let timerid;
let counter =0; // represents total seconds
let timer = document.querySelector(".timer");

const starttimer = () =>{

    timer.style.display = "block";
    const displaytimer =() =>{
        let totalsec = counter;

        let hrs = Number.parseInt(totalsec/36000);
        totalsec = totalsec % 3600;

        let min = Number.parseInt(totalsec/60);
        totalsec = totalsec % 60;

        hrs = (hrs <10) ? `0${hrs}` : hrs;
        min = (min <10) ? `0${min}` : min;
        totalsec = (totalsec <10) ? `0${totalsec}` : totalsec;


        timer.innerText = `${hrs}:${min}:${totalsec}`;

        counter++;
    }
    timerid = setInterval(displaytimer, 1000)
}

const stoptimer =() =>{
    clearInterval(timerid)
    timer.innerText = "00:00:00";
    timer.style.display = "none"

}

// starttimer();