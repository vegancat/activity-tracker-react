const setIngColor = len => {
    let color;
    if (len == 0) {
        color = "#ccc";
    } else if (len <= 5) {
        color = "#f1c40f";
    } else if (len <= 13) {
        color = "#2ecc71";
    } else if (len <= 28) {
        color = "#9b59b6";
    } else {
        color = "#e74c3c";
    }

    return color;
};

export default setIngColor;
