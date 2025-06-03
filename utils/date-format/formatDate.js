export const formatDateToDefalut = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleString('sv-SE', { timeZone: 'Asia/Kolkata' }).slice(0, 16);
};

export const formatDateToDatabase = (date) => {
    if (!date) return "";
    return new Date(date).toISOString();
};

export const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
    });
};


export const formatDateToYYMMDD = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const yy = String(d.getFullYear()).slice(-2); // Get last two digits of the year
    const mm = String(d.getMonth() + 1).padStart(2, "0"); // Ensure two digits for month
    const dd = String(d.getDate()).padStart(2, "0"); // Ensure two digits for day
    return `${yy},${mm},${dd}`;
};