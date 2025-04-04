function updateMilliseconds(val) {
    if (!val) return;

    if (val > 1e22) {
        document.getElementById("tb_output").value = "A long, long time";
        return;
    }

    const isShort = document.getElementById("cb_short").checked;
    const result = formatDuration(val, isShort);
    document.getElementById("tb_output").value = result;
}

function formatDuration(ms, shorthand = false) {
    const units = [
        { label: ["Years", "Yrs"], seconds: 31536000 },
        { label: ["Months", "Mths"], seconds: 2628288 },
        { label: ["Weeks", "Wks"], seconds: 604800 },
        { label: ["Days", "D"], seconds: 86400 },
        { label: ["Hours", "H"], seconds: 3600 },
        { label: ["Minutes", "Min"], seconds: 60 },
        { label: ["Seconds", "s"], seconds: 1 }
    ];

    let remaining = Math.floor(ms / 1000);
    let output = "";

    for (const { label, seconds } of units) {
        const value = Math.floor(remaining / seconds);
        if (value > 0) {
            output += `${value} ${shorthand ? label[1] : label[0]} `;
            remaining -= value * seconds;
        }
    }

    if (output.trim().length === 0) {
        return `${ms} ${shorthand ? 'ms' : 'Milliseconds (not enough for seconds!)'}`;
    }

    return output.trim();
}
