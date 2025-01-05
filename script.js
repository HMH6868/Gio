function formatDateTime(date, locale, timeZone) {
    // Định dạng ngày: "ngày tháng năm"
    const dateOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: timeZone
    };

    // Định dạng giờ: "HH:MM:SS AM/PM"
    const timeOptions = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true, // Sử dụng định dạng 12 giờ (AM/PM)
        timeZone: timeZone
    };

    // Kết hợp ngày và giờ
    const formattedDate = date.toLocaleDateString(locale, dateOptions);
    const formattedTime = date.toLocaleTimeString(locale, timeOptions);

    return `${formattedDate}, ${formattedTime}`;
}

function updateTime() {
    const now = new Date();

    // Giờ Việt Nam (UTC+7)
    const vietnamTime = formatDateTime(now, 'vi-VN', 'Asia/Ho_Chi_Minh');
    document.getElementById('vietnam-time').textContent = vietnamTime;

    // Giờ Lancaster, Mỹ (America/New_York)
    const lancasterTime = formatDateTime(now, 'en-US', 'America/New_York');
    document.getElementById('lancaster-time').textContent = lancasterTime;
}

// Cập nhật thời gian mỗi giây
setInterval(updateTime, 1000);

// Cập nhật thời gian ngay khi trang được tải
updateTime();