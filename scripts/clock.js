// Data
const schedule = {
    "Monday": [
        { name: "A Period", start: "07:56", end: "08:46" },
        { name: "1st Period", start: "08:50", end: "09:43" },
        { name: "2nd Period", start: "09:47", end: "10:31" },
        { name: "3rd Period", start: "10:35", end: "11:19" },
        { name: "4th Period", start: "11:23", end: "12:07" },
        { name: "Lunch 4", start: "11:23", end: "11:53" },
        { name: "5th Period", start: "11:57", end: "12:41" },
        { name: "Lunch 5", start: "12:11", end: "12:41" },
        { name: "6th Period", start: "12:45", end: "13:29" },
        { name: "7th Period", start: "13:33", end: "14:17" },
        { name: "8th Period", start: "14:21", end: "15:05" }
    ],
    "Tuesday": [
        { name: "A Period", start: "07:56", end: "08:46" },
        { name: "1st Period", start: "08:50", end: "09:30" },
        { name: "2nd Period", start: "09:34", end: "10:14" },
        { name: "3rd Period", start: "10:18", end: "10:58" },
        { name: "Access", start: "11:02", end: "11:35" },
        { name: "4th Period", start: "11:39", end: "12:19" },
        { name: "Lunch 4", start: "11:39", end: "12:09" },
        { name: "5th Period", start: "12:13", end: "12:53" },
        { name: "Lunch 5", start: "12:23", end: "12:53" },
        { name: "6th Period", start: "12:57", end: "13:37" },
        { name: "7th Period", start: "13:41", end: "14:21" },
        { name: "8th Period", start: "14:25", end: "15:05" }
    ],
    "Wednesday": [
        { name: "1st Period", start: "09:41", end: "10:19" },
        { name: "2nd Period", start: "10:23", end: "11:01" },
        { name: "3rd Period", start: "11:05", end: "11:43" },
        { name: "4th Period", start: "11:47", end: "12:25" },
        { name: "Lunch 4", start: "11:47", end: "12:17" },
        { name: "5th Period", start: "12:21", end: "12:59" },
        { name: "Lunch 5", start: "12:29", end: "12:59" },
        { name: "6th Period", start: "13:03", end: "13:41" },
        { name: "7th Period", start: "13:45", end: "14:23" },
        { name: "8th Period", start: "14:27", end: "15:05" }
    ],
    "Thursday": [
        { name: "A Period", start: "07:56", end: "08:46" },
        { name: "1st Period", start: "08:50", end: "09:30" },
        { name: "2nd Period", start: "09:34", end: "10:14" },
        { name: "3rd Period", start: "10:18", end: "10:58" },
        { name: "Access", start: "11:02", end: "11:35" },
        { name: "4th Period", start: "11:39", end: "12:19" },
        { name: "Lunch 4", start: "11:39", end: "12:09" },
        { name: "5th Period", start: "12:13", end: "12:53" },
        { name: "Lunch 5", start: "12:23", end: "12:53" },
        { name: "6th Period", start: "12:57", end: "13:37" },
        { name: "7th Period", start: "13:41", end: "14:21" },
        { name: "8th Period", start: "14:25", end: "15:05" }
    ],
    "Friday": [
        { name: "A Period", start: "07:56", end: "08:46" },
        { name: "1st Period", start: "08:50", end: "09:43" },
        { name: "2nd Period", start: "09:47", end: "10:31" },
        { name: "3rd Period", start: "10:35", end: "11:19" },
        { name: "4th Period", start: "11:23", end: "12:07" },
        { name: "Lunch 4", start: "11:23", end: "11:53" },
        { name: "5th Period", start: "11:57", end: "12:41" },
        { name: "Lunch 5", start: "12:11", end: "12:41" },
        { name: "6th Period", start: "12:45", end: "13:29" },
        { name: "7th Period", start: "13:33", end: "14:17" },
        { name: "8th Period", start: "14:21", end: "15:05" }
    ],
};

const daysOfWeekend = ["Saturday", "Sunday"];


// Elements
periodTimeElement = document.getElementById("period-time");
periodMessageElement = document.getElementById("period-message");
timeElement = document.getElementById("time");

function getPeriodInfo(day, time) {
    // Schedule data

    if (daysOfWeekend.includes(day)) {
        return { period: "None", timeLeft: 0 };
    }

    const daySchedule = schedule[day];
    if (!daySchedule) {
        return "No period found.";
    }

    // Convert time string to comparable value
    const toMinutes = t => {
        const [h, m] = t.split(":").map(Number);
        return h * 60 + m;
    };

    const currentTime = toMinutes(time);

    for (let period of daySchedule) {
        const periodStart = toMinutes(period.start);
        const periodEnd = toMinutes(period.end);

        if (currentTime >= periodStart && currentTime <= periodEnd) {
            const minutesLeft = periodEnd - currentTime;
            return { period: period.name, timeLeft: minutesLeft };
        }
    }

    return { period: "None", timeLeft: 0 };
}

const now = new Date();
const day = now.toLocaleDateString("en-US", { weekday: "long" });
const time = now.toLocaleTimeString("en-US", { hour12: false }).slice(0, 5);

clock = new Date();
nd = clock.getHours() < 12 ? "AM" : "PM";
h = clock.getHours() % 12;
h = h ? h : 12;
m = clock.getMinutes();
m = m < 10 ? "0" + m : m;
timeElement.textContent = h + ":" + m + " " + nd;

const { period, timeLeft } = getPeriodInfo(day, time);

if (period === "None") {
    periodTimeElement.textContent = "No Period";
} else {
    periodTimeElement.textContent = period + " Ends In";
}

const hours = Math.floor(timeLeft / 60);
const minutes = timeLeft % 60;
periodMessageElement.textContent = period + " Ends In"
periodTimeElement.textContent = `${minutes} Minutes`;

setInterval(() => {
    const now = new Date();
    const day = now.toLocaleDateString("en-US", { weekday: "long" });
    const time = now.toLocaleTimeString("en-US", { hour12: false }).slice(0, 5);

    clock = new Date();
    nd = clock.getHours() < 12 ? "AM" : "PM";
    h = clock.getHours() % 12;
    h = h ? h : 12;
    m = clock.getMinutes();
    m = m < 10 ? "0" + m : m;
    timeElement.textContent = h + ":" + m + " " + nd;


    const { period, timeLeft } = getPeriodInfo(day, time);
    console.log(period, timeLeft);
    if (period === "None") {
        console.log("No Period");
        periodMessageElement.textContent = "";
        periodTimeElement.textContent = "";
    } else {
        periodTimeElement.textContent = period + " Ends In";

        const hours = Math.floor(timeLeft / 60);
        const minutes = timeLeft % 60;
        // periodTimeElement.textContent = period + " Ends In";
        periodTimeElement.textContent = `${minutes} Minutes`;
    }

}, 1000);



const special = document.getElementById('special');

let messages = ['should study', 'forgot about that assignment', 'are cooked for the test', 'owe me $5']
cycleMessages(special, messages);