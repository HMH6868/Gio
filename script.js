function formatTime(date, locale, timeZone, hour12 = false) {
    const timeOptions = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: hour12, // Sử dụng định dạng 12 giờ (AM/PM) nếu hour12 = true
        timeZone: timeZone
    };

    return date.toLocaleTimeString(locale, timeOptions);
}

function updateClock(analogClockId, date) {
    const hourHand = document.querySelector(`#${analogClockId} .hour-hand`);
    const minuteHand = document.querySelector(`#${analogClockId} .minute-hand`);
    const secondHand = document.querySelector(`#${analogClockId} .second-hand`);

    const hours = date.getHours() % 12;
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const hourDeg = (hours * 30) + (minutes * 0.5);
    const minuteDeg = (minutes * 6) + (seconds * 0.1);
    const secondDeg = seconds * 6;

    hourHand.style.transform = `rotate(${hourDeg}deg)`;
    minuteHand.style.transform = `rotate(${minuteDeg}deg)`;
    secondHand.style.transform = `rotate(${secondDeg}deg)`;
}

function calculateTimeDifference(date1, date2) {
    const diffInMilliseconds = Math.abs(date1 - date2);
    const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
    const diffInMinutes = Math.floor((diffInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
    return `${diffInHours} giờ ${diffInMinutes} phút`;
}

function updateTime() {
    const now = new Date();

    // Giờ Việt Nam (UTC+7)
    const vietnamTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" }));
    document.getElementById('vietnam-time').textContent = formatTime(vietnamTime, 'vi-VN', 'Asia/Ho_Chi_Minh');
    updateClock('vietnam-analog', vietnamTime);

    // Giờ Lancaster, Mỹ (America/New_York)
    const lancasterTime = new Date(now.toLocaleString("en-US", { timeZone: "America/New_York" }));
    document.getElementById('lancaster-time').textContent = formatTime(lancasterTime, 'en-US', 'America/New_York', true); // Sử dụng AM/PM
    updateClock('lancaster-analog', lancasterTime);

    // Tính khoảng cách thời gian
    const timeDifference = calculateTimeDifference(vietnamTime, lancasterTime);
    document.getElementById('time-difference-text').textContent = `Khoảng cách thời gian: ${timeDifference}`;
}

// Cập nhật thời gian mỗi giây
setInterval(updateTime, 1000);

// Cập nhật thời gian ngay khi trang được tải
updateTime();