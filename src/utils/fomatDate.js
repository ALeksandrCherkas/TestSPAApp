export const formatDate = (dateString) => {
    if (!dateString) return '';

    const date = new Date(dateString);


    const day = String(date.getDate()).padStart(2, '0');
    const month = date.getMonth();
    const year = date.getFullYear();

    return `${day} / ${month} / ${year}`;
}